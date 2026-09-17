"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import CartItem from "@/components/cart/CartItem";
import { useBag } from "@/components/cart/CartProvider";
import { getCollection } from "@/lib/data/collections";
import { formatPrice } from "@/lib/format";

/* -----------------------------------------------------------------------------
   Bag lateral
   -----------------------------------------------------------------------------
   El drawer del carrito. Escritorio: panel a la derecha. Móvil: ocupa todo el
   viewport.

   Accesibilidad:
     · role="dialog" + aria-modal + aria-label.
     · Escape cierra; el botón de cierre está etiquetado.
     · Al abrir, el foco entra en el panel; cerrado, el wrapper es inert para
       que ni clic ni Tab alcancen su contenido.
     · Bloqueo del scroll de fondo mientras está abierta.

   Siempre montado: la transición de entrada/salida es CSS puro y con
   prefers-reduced-motion se desactiva.
   -------------------------------------------------------------------------- */

export default function CartDrawer() {
  const { lines, count, total, isOpen, closeBag } = useBag();
  const panelRef = useRef<HTMLDivElement>(null);
  /* Momento de apertura: evita que el clic accidental que suele seguir a
     "Add to bag" caiga sobre el velo mientras el panel aún se desliza y
     cierre la bag nada más abrirla */
  const openedAt = useRef(0);

  /* Momento de apertura */
  useEffect(() => {
    if (isOpen) openedAt.current = Date.now();
  }, [isOpen]);

  /* Escape cierra */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeBag();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeBag]);

  /* El foco entra en el panel al abrir */
  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  /* Bloqueo del scroll de fondo */
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  return (
    <div inert={!isOpen}>
      {/* Velo. Un clic sobre él cierra la bag, salvo en el instante posterior
          a la apertura, cuando un doble clic sobre "Add to bag" sigue
          aterrizando aquí */}
      <div
        aria-hidden="true"
        onClick={() => {
          if (Date.now() - openedAt.current > 500) closeBag();
        }}
        className={`ease-[var(--ease-brand)] motion-reduce:transition-none fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Bag"
        tabIndex={-1}
        className={`bg-background border-border ease-[var(--ease-brand)] motion-reduce:transition-none fixed inset-y-0 right-0 z-[70] flex w-full max-w-[26rem] flex-col border-l shadow-card outline-none transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cabecera */}
        <div className="border-border flex items-center justify-between border-b px-6 py-5">
          <p className="font-display text-xl font-bold uppercase">
            Bag
            {count > 0 ? (
              <span className="text-muted tabular-nums"> ({count})</span>
            ) : null}
          </p>

          <button
            type="button"
            onClick={closeBag}
            aria-label="Cerrar bag"
            className="text-muted hover:text-foreground focus-visible:outline-foreground flex size-9 items-center justify-center rounded-full border border-transparent transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
              <path
                d="m3 3 10 10M13 3 3 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {lines.length === 0 ? (
          /* Bag vacía */
          <div className="flex flex-1 flex-col items-start justify-center gap-5 px-6">
            <p className="text-muted text-lg/relaxed">Your bag is empty.</p>
            <p className="text-muted max-w-[30ch] text-sm/relaxed">
              Explora los universos y encuentra la pieza que representa a tu
              mascota.
            </p>
            <Link
              href="/#collections"
              onClick={closeBag}
              className="text-eyebrow text-foreground border-border hover:border-border-strong inline-flex rounded-full border px-5 py-2.5 uppercase transition-colors duration-300"
            >
              Explore collections
            </Link>
          </div>
        ) : (
          <>
            {/* Piezas */}
            <ul className="flex-1 overflow-y-auto px-6 pt-1 pb-4">
              {lines.map((line) => (
                <CartItem
                  key={line.product.slug}
                  slug={line.product.slug}
                  name={line.product.name}
                  category={line.product.category}
                  collectionName={
                    getCollection(line.product.collection)?.name ?? ""
                  }
                  price={line.product.price}
                  quantity={line.quantity}
                  visualVariant={line.product.visualVariant}
                />
              ))}
            </ul>

            {/* Total + checkout */}
            <div className="border-border border-t px-6 pt-5 pb-6">
              <div className="flex items-baseline justify-between">
                <span className="text-eyebrow text-muted uppercase">
                  Total
                </span>
                <span className="text-foreground text-xl font-semibold tabular-nums">
                  {formatPrice(total)}
                </span>
              </div>

              <Link
                href="/checkout"
                onClick={closeBag}
                className="bg-accent focus-visible:outline-foreground mt-5 flex w-full items-center justify-center rounded-card px-8 py-4 text-sm font-semibold tracking-[0.18em] text-white uppercase transition-opacity duration-300 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Checkout
              </Link>

              <p className="text-subtle mt-3 text-center text-xs/relaxed">
                Envío e impuestos se calcularán en el checkout.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}