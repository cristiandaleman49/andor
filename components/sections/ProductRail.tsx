import Rail from "@/components/sections/Rail";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/lib/types";

/* -----------------------------------------------------------------------------
   Fila horizontal de productos
   -----------------------------------------------------------------------------
   Piezas de un universo recorridas en horizontal. Misma mecánica que
   ContentRail porque ambas delegan en Rail: aquí solo se decide que cada
   elemento se representa con ProductCard.
   -------------------------------------------------------------------------- */

export type ProductRailProps = {
  /** Ancla real de la sección */
  id: string;
  /** Etiqueta superior */
  eyebrow: string;
  /** Titular de la fila */
  title: string;
  /** Línea de contexto opcional */
  description?: string;
  /** Piezas de la colección, en orden editorial */
  items: Product[];
};

export default function ProductRail({
  id,
  eyebrow,
  title,
  description,
  items,
}: ProductRailProps) {
  return (
    <Rail
      id={id}
      eyebrow={eyebrow}
      title={title}
      description={description}
      items={items.map((product) => ({
        key: product.slug,
        content: <ProductCard product={product} />,
      }))}
    />
  );
}