"use client";

import { useEffect, useRef, useState } from "react";

import { useBag } from "@/components/cart/CartProvider";

/* -----------------------------------------------------------------------------
   ADD TO BAG
   -----------------------------------------------------------------------------
   Isla client del detalle de producto: la página sigue siendo un Server
   Component. Añade la pieza (el provider la abre y, si ya estaba, incrementa)
   y abre la bag.

   Anti doble agregado: tras el clic el botón se desactiva ~1,2 s con el
   mensaje "Added": los clics repetidos de un usuario impaciente no suman
   unidades extra.
   -------------------------------------------------------------------------- */

export default function AddToBagButton({ slug }: { slug: string }) {
  const { addItem } = useBag();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleAdd = () => {
    addItem(slug);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1200);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={added}
      className="bg-accent focus-visible:outline-foreground w-full rounded-card px-10 py-4 text-sm font-semibold tracking-[0.18em] text-white uppercase transition-all duration-300 ease-[var(--ease-brand)] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default disabled:opacity-80 sm:w-auto sm:self-start"
    >
      {added ? "Added ✓" : "Add to bag"}
    </button>
  );
}