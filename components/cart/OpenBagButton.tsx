"use client";

import { useBag } from "@/components/cart/CartProvider";

/* -----------------------------------------------------------------------------
   Volver a la bag
   -----------------------------------------------------------------------------
   Isla client usada en la página de checkout: reabre el drawer desde
   cualquier ruta, porque el provider vive en el layout raíz.
   -------------------------------------------------------------------------- */

export default function OpenBagButton() {
  const { openBag, count } = useBag();

  return (
    <button
      type="button"
      onClick={openBag}
      aria-label={count > 0 ? `Volver a la bag, ${count} unidades` : "Volver a la bag"}
      className="text-foreground group relative inline-flex items-center gap-3 py-2 text-sm font-medium tracking-[0.18em] uppercase"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="ease-[var(--ease-brand)] size-3.5 transition-transform duration-300 group-hover:-translate-x-1"
      >
        <path
          d="M15 8H2M6.5 3.5 2 8l4.5 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Volver a la bag
      <span
        aria-hidden="true"
        className="bg-accent absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </button>
  );
}