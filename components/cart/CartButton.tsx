"use client";

import { useBag } from "@/components/cart/CartProvider";

/* -----------------------------------------------------------------------------
   Botón CART del header
   -----------------------------------------------------------------------------
   Isla client mínima: el header sigue siendo un Server Component y solo este
   botón consume el contexto de la bag. Muestra CART y, cuando hay piezas,
   CART (n). Hasta que localStorage se carga (tras el mount) muestra CART
   exactamente igual que el servidor: cero hydration mismatch.
   -------------------------------------------------------------------------- */

export default function CartButton() {
  const { count, openBag } = useBag();

  return (
    <button
      type="button"
      onClick={openBag}
      aria-label={count > 0 ? `Abrir bag, ${count} unidades` : "Abrir bag"}
      className="text-eyebrow text-foreground border-border hover:border-border-strong hover:bg-surface inline-flex items-center rounded-full border px-3.5 py-2.5 uppercase transition-colors duration-300 sm:px-5"
    >
      Cart{count > 0 ? <span className="tabular-nums"> ({count})</span> : null}
    </button>
  );
}