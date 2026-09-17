import Link from "next/link";

import { ArtVisual } from "@/components/ui/ArtVisual";
import type { ArtVariant } from "@/lib/types";

/* -----------------------------------------------------------------------------
   Card de contenido de ANDORPETS
   -----------------------------------------------------------------------------
   Pieza reutilizable del lenguaje de descubrimiento. Representa un drop, una
   pieza editorial o un contenido destacado de la home; los productos usan
   ProductCard y las colecciones CollectionCard, que comparten este mismo
   lenguaje visual (mismo arte, mismo velo, mismo hover).

   Reglas:
     · El arte visual es el protagonista; el texto es una etiqueta breve.
     · Sin botones, sin precios, sin badges comerciales.
     · El arte es CSS compartido (components/ui/ArtVisual.tsx): cuando existan
       assets reales se sustituye ahí, sin tocar esta card.
     · Server Component: no necesita estado ni interacción.
   -------------------------------------------------------------------------- */

export type ContentCardProps = {
  /** Título de contenido: drop, pieza editorial o contenido destacado */
  title: string;
  /** Destino. En esta fase apunta a anclas de la home: las secciones reales
      (drops, editorial) llegan más adelante, así que nunca se enlaza a una
      ruta que devuelva 404. */
  href: string;
  /** Etiqueta corta de familia de contenido: "Drop", "Editorial", ... */
  category?: string;
  /** Dato secundario breve: número de piezas, duración, estado */
  meta?: string;
  /** Arte de relleno mientras no exista el asset definitivo */
  art?: ArtVariant;
};

export default function ContentCard({
  title,
  href,
  category,
  meta,
  art = "halo",
}: ContentCardProps) {
  return (
    <Link
      href={href}
      /* Hover y foco: cambio de borde, zoom mínimo del arte y un velo algo
         más denso. Nada se desplaza y nada desborda la card. */
      className="group border-border bg-surface-gradient shadow-card ease-[var(--ease-brand)] hover:border-border-strong focus-visible:border-border-strong relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-card border transition-colors duration-500"
    >
      {/* Arte de relleno. Va dentro del recorte de la card para que el zoom
          sutil al pasar el ratón no toque el layout ni recorte el borde. */}
      <div
        aria-hidden="true"
        className="ease-[var(--ease-brand)] absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
      >
        <ArtVisual variant={art} />
      </div>

      {/* Velo inferior: asegura el contraste del texto sobre cualquier arte
          futuro (fotografía o video) */}
      <div
        aria-hidden="true"
        className="from-background via-background/72 absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t to-transparent transition-opacity duration-500 group-hover:opacity-85"
      />

      {/* Etiqueta editorial: familia de contenido + título + dato breve */}
      <div className="relative flex flex-col gap-2 p-5">
        {category ? (
          <span className="text-eyebrow text-secondary uppercase">
            {category}
          </span>
        ) : null}

        <h3 className="font-display text-lg leading-[1.08] font-bold uppercase sm:text-xl">
          {title}
        </h3>

        {meta ? <span className="text-muted text-xs/relaxed">{meta}</span> : null}
      </div>
    </Link>
  );
}