"use client";

import Link from "next/link";

import { useBag } from "@/components/cart/CartProvider";
import { ArtVisual } from "@/components/ui/ArtVisual";
import { formatPrice } from "@/lib/format";
import type { ArtVariant } from "@/lib/types";

/* -----------------------------------------------------------------------------
   Línea de la bag
   -----------------------------------------------------------------------------
   Una pieza, su cantidad y su precio. El arte en miniatura es decorativo: el
   enlace real es el nombre, que además cierra la bag al navegar.
   -------------------------------------------------------------------------- */

export default function CartItem({
  slug,
  name,
  category,
  collectionName,
  price,
  quantity,
  visualVariant,
}: {
  slug: string;
  name: string;
  category: string;
  collectionName: string;
  price: number;
  quantity: number;
  visualVariant: ArtVariant;
}) {
  const { increase, decrease, remove, closeBag } = useBag();

  return (
    <li className="border-border flex gap-4 border-b py-5">
      {/* Miniatura decorativa del arte de la pieza */}
      <span
        aria-hidden="true"
        className="bg-surface-gradient border-border relative size-20 shrink-0 overflow-hidden rounded-card border"
      >
        <ArtVisual variant={visualVariant} />
      </span>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-eyebrow text-secondary uppercase">
          {category} · {collectionName}
        </span>

        <Link
          href={`/productos/${slug}`}
          onClick={closeBag}
          className="font-display hover:text-accent mt-1 text-base leading-tight font-bold uppercase transition-colors duration-300"
        >
          {name}
        </Link>

        <span className="text-muted mt-1 text-sm tabular-nums">
          {formatPrice(price)}
        </span>

        <div className="mt-3 flex items-center justify-between gap-3">
          {/* Stepper de cantidad */}
          <div className="border-border flex items-center rounded-full border">
            <button
              type="button"
              onClick={() => decrease(slug)}
              disabled={quantity <= 1}
              aria-label={`Quitar una unidad de ${name}`}
              className="text-muted hover:text-foreground disabled:opacity-40 flex size-8 items-center justify-center rounded-full transition-colors duration-300"
            >
              <svg viewBox="0 0 12 12" aria-hidden="true" className="size-3">
                <path
                  d="M1 6h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <span
              className="text-foreground w-6 text-center text-sm font-medium tabular-nums"
              aria-label={`Cantidad de ${name}: ${quantity}`}
            >
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => increase(slug)}
              aria-label={`Añadir una unidad de ${name}`}
              className="text-muted hover:text-foreground flex size-8 items-center justify-center rounded-full transition-colors duration-300"
            >
              <svg viewBox="0 0 12 12" aria-hidden="true" className="size-3">
                <path
                  d="M1 6h10M6 1v10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Eliminar la línea */}
          <button
            type="button"
            onClick={() => remove(slug)}
            aria-label={`Eliminar ${name} de la bag`}
            className="text-eyebrow text-muted hover:text-accent py-1 uppercase transition-colors duration-300"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}