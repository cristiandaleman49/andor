import Link from "next/link";

import { ArtVisual } from "@/components/ui/ArtVisual";
import { formatPrice } from "@/lib/format";
import { getCollection } from "@/lib/data/collections";
import type { Product } from "@/lib/types";

/* -----------------------------------------------------------------------------
   Card de producto
   -----------------------------------------------------------------------------
   Una pieza dentro de su universo. Mantiene el lenguaje de ContentCard —arte
   protagonista, etiqueta breve, hover sutil— con un único dato comercial: el
   precio, presente pero pequeño y en off-white, para que el visual siga
   mandando. Sin botones, sin badges, sin descuentos.

   La colección se resuelve desde los datos para mostrar su nombre; si un día
   el slug no existiera, la card sigue funcionando sin esa línea.
   -------------------------------------------------------------------------- */

export type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const collection = getCollection(product.collection);

  return (
    <Link
      href={`/productos/${product.slug}`}
      /* Hover y foco: cambio de borde, zoom mínimo del arte y velo algo más
         denso. Idéntico al resto de cards del sistema. */
      className="group border-border bg-surface-gradient shadow-card ease-[var(--ease-brand)] hover:border-border-strong focus-visible:border-border-strong relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-card border transition-colors duration-500"
    >
      {/* Arte. Dentro del recorte de la card para que el zoom al pasar el
          ratón no toque el layout ni recorte el borde. */}
      <div
        aria-hidden="true"
        className="ease-[var(--ease-brand)] absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
      >
        <ArtVisual variant={product.visualVariant} />
      </div>

      {/* Velo inferior: contraste del texto sobre cualquier arte futuro */}
      <div
        aria-hidden="true"
        className="from-background via-background/72 absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t to-transparent transition-opacity duration-500 group-hover:opacity-85"
      />

      {/* Etiqueta: tipo de pieza, nombre, colección y precio. El precio es un
          dato más de la etiqueta, nunca el protagonista. */}
      <div className="relative flex flex-col gap-2 p-5">
        <span className="text-eyebrow text-secondary uppercase">
          {product.category}
        </span>

        <h3 className="font-display text-lg leading-[1.08] font-bold uppercase sm:text-xl">
          {product.name}
        </h3>

        <span className="text-muted flex items-baseline justify-between gap-3 text-xs/relaxed">
          {collection ? collection.name : null}
          <span className="text-foreground font-medium tabular-nums">
            {formatPrice(product.price)}
          </span>
        </span>
      </div>
    </Link>
  );
}