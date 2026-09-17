"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import CartDrawer from "@/components/cart/CartDrawer";
import { getProduct } from "@/lib/data/products";
import type { Product } from "@/lib/types";

/* -----------------------------------------------------------------------------
   Bag de ANDORPETS
   -----------------------------------------------------------------------------
   Estado único del carrito, en cliente. El carrito guarda lo mínimo ({ slug,
   quantity }) y resuelve nombre y precio contra lib/data/products.ts: nunca
   duplica datos de producto.

   Persistencia: localStorage es un store externo y se lee con
   useSyncExternalStore. No hay efectos de carga ni de escritura: el servidor
   renderiza con la instantánea vacía (getServerSnapshot), la hidratación
   coincide y el navegador adopta lo guardado justo después — sin mismatch y
   sin render doble. La suscripción al evento `storage` sincroniza además las
   pestañas abiertas.
   -------------------------------------------------------------------------- */

export type BagLine = { product: Product; quantity: number };

type BagEntry = { slug: string; quantity: number };

type CartContextValue = {
  /** Líneas resueltas con el producto completo y su cantidad */
  lines: BagLine[];
  /** Unidades totales (para el contador del header) */
  count: number;
  /** Importe total, calculado siempre desde el precio mock */
  total: number;
  isOpen: boolean;
  /** Añade una unidad y abre la bag (si ya estaba, incrementa) */
  addItem: (slug: string) => void;
  increase: (slug: string) => void;
  /** Resta una unidad sin bajar nunca de 1: para eliminar, remove() */
  decrease: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  openBag: () => void;
  closeBag: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "andorpets.bag.v1";
const EMPTY: BagEntry[] = [];

export function useBag() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useBag debe usarse dentro de CartProvider");
  }
  return ctx;
}

/* ------------------------------ store externo ------------------------------ */

let cachedRaw: string | null = null;
let cachedEntries: BagEntry[] = EMPTY;
const listeners = new Set<() => void>();

function parseEntries(raw: string | null): BagEntry[] {
  if (!raw) return EMPTY;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed.filter(
      (entry): entry is BagEntry =>
        typeof entry?.slug === "string" &&
        Number.isInteger(entry?.quantity) &&
        (entry?.quantity ?? 0) > 0,
    );
  } catch {
    /* Datos corruptos o storage bloqueado: bag vacía */
    return EMPTY;
  }
}

/** Instantánea del store para el cliente, con caché por contenido crudo:
    getSnapshot debe devolver la misma referencia si nada cambió. */
function getClientSnapshot(): BagEntry[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cachedRaw) return cachedEntries;
  cachedRaw = raw;
  cachedEntries = parseEntries(raw);
  return cachedEntries;
}

/** Instantánea del servidor y de la hidratación: bag vacía */
function getServerSnapshot(): BagEntry[] {
  return EMPTY;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    /* Otra pestaña movió la bag: invalidar caché y avisar */
    if (event.key === null || event.key === STORAGE_KEY) {
      cachedRaw = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener("storage", onStorage);
    listeners.delete(listener);
  };
}

function writeEntries(next: BagEntry[]) {
  cachedEntries = next;
  try {
    const raw = JSON.stringify(next);
    cachedRaw = raw;
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    /* Storage no disponible: la bag sigue funcionando en memoria */
  }
  for (const listener of listeners) listener();
}

function updateEntries(transition: (prev: BagEntry[]) => BagEntry[]) {
  writeEntries(transition(getClientSnapshot()));
}

/* -------------------------------- provider -------------------------------- */

export default function CartProvider({ children }: { children: ReactNode }) {
  const entries = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((slug: string) => {
    updateEntries((prev) => {
      const existing = prev.find((entry) => entry.slug === slug);
      return existing
        ? prev.map((entry) =>
            entry.slug === slug
              ? { ...entry, quantity: entry.quantity + 1 }
              : entry,
          )
        : [...prev, { slug, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const increase = useCallback((slug: string) => {
    updateEntries((prev) =>
      prev.map((entry) =>
        entry.slug === slug
          ? { ...entry, quantity: entry.quantity + 1 }
          : entry,
      ),
    );
  }, []);

  const decrease = useCallback((slug: string) => {
    updateEntries((prev) =>
      prev.map((entry) =>
        entry.slug === slug && entry.quantity > 1
          ? { ...entry, quantity: entry.quantity - 1 }
          : entry,
      ),
    );
  }, []);

  const remove = useCallback((slug: string) => {
    updateEntries((prev) => prev.filter((entry) => entry.slug !== slug));
  }, []);

  const clear = useCallback(() => {
    updateEntries(() => EMPTY);
  }, []);
  const openBag = useCallback(() => setIsOpen(true), []);
  const closeBag = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = entries
      .map((entry): BagLine | null => {
        const product = getProduct(entry.slug);
        return product ? { product, quantity: entry.quantity } : null;
      })
      .filter((line): line is BagLine => line !== null);

    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      total: lines.reduce(
        (sum, line) => sum + line.product.price * line.quantity,
        0,
      ),
      isOpen,
      addItem,
      increase,
      decrease,
      remove,
      clear,
      openBag,
      closeBag,
    };
  }, [entries, isOpen, addItem, increase, decrease, remove, clear, openBag, closeBag]);

  return (
    <CartContext.Provider value={value}>
      {children}
      {/* El drawer vive aquí: montado una sola vez para toda la app */}
      <CartDrawer />
    </CartContext.Provider>
  );
}
