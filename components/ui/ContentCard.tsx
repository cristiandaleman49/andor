import Link from "next/link";

/* -----------------------------------------------------------------------------
   Card de contenido de ANDORPETS
   -----------------------------------------------------------------------------
   Pieza reutilizable del lenguaje de descubrimiento. En esta fase la misma
   card representa indistintamente una colección, un producto, un drop o una
   pieza editorial: por eso los campos van sueltos y opcionales y no existe
   todavía un sistema de tipos por entidad.

   Reglas de esta fase:
     · El arte visual es el protagonista; el texto es una etiqueta breve.
     · Sin botones, sin precios, sin badges comerciales.
     · Todo el arte es CSS (formas, luz y rejilla): ningún asset externo.
     · Server Component: no necesita estado ni interacción.
   -------------------------------------------------------------------------- */

/* Variantes del arte de relleno. Cada una parte del mismo lienzo oscuro y
   añade una intención distinta: masa con luz de estudio, rejilla técnica,
   haz de luz, geometría de detalle o duotono. Se sustituirán por fotografía
   o video real sin tocar el resto de la card. */
export type ContentCardArt = "halo" | "grid" | "beam" | "orbit" | "duotone";

export type ContentCardProps = {
  /** Título de contenido: colección, producto, drop o pieza editorial */
  title: string;
  /** Destino. En esta fase apunta a anclas de la home: las secciones reales
      (colecciones, drops, editorial) llegan más adelante, así que nunca se
      enlaza a una ruta que devuelva 404. */
  href: string;
  /** Etiqueta corta de familia de contenido: "Colección", "Drop", ... */
  category?: string;
  /** Dato secundario breve: número de piezas, duración, estado */
  meta?: string;
  /** Arte de relleno mientras no exista el asset definitivo */
  art?: ContentCardArt;
};

function ArtPlaceholder({ art }: { art: ContentCardArt }) {
  switch (art) {
    /* Masa oscura con luz de estudio roja: el mismo lenguaje del Hero */
    case "halo":
      return (
        <>
          <span className="bg-[radial-gradient(circle,var(--accent-tint-16)_0%,transparent_70%)] absolute -top-16 -left-12 size-48 rounded-full blur-2xl" />
          <span className="bg-[linear-gradient(160deg,var(--andor-ink-700)_0%,var(--andor-black)_78%)] absolute bottom-[-22%] left-1/2 h-[58%] w-[76%] -translate-x-1/2 rounded-[48%_52%_44%_56%]" />
        </>
      );

    /* Rejilla técnica en azul secundario: detalle, no protagonista */
    case "grid":
      return (
        <>
          <span className="bg-[repeating-linear-gradient(to_right,var(--border)_0_1px,transparent_1px_40px),repeating-linear-gradient(to_bottom,var(--border)_0_1px,transparent_1px_40px)] absolute inset-0 [mask-image:radial-gradient(110%_90%_at_50%_6%,#000_0%,transparent_80%)]" />
          <span className="border-border-secondary absolute inset-5 border" />
        </>
      );

    /* Haz de luz diagonal con línea de horizonte */
    case "beam":
      return (
        <>
          <span className="bg-[linear-gradient(118deg,transparent_34%,var(--accent-tint-08)_46%,transparent_60%)] absolute inset-0" />
          <span className="bg-border absolute inset-x-0 top-[34%] h-px" />
        </>
      );

    /* Geometría concéntrica: el detalle preciso, casi científico.
       Se sitúa por encima del velo para que no la coma el degradado */
    case "orbit":
      return (
        <>
          <span className="bg-[radial-gradient(circle,var(--accent-tint-16)_0%,transparent_70%)] absolute top-[38%] left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl" />
          <span className="border-border-accent absolute top-[38%] left-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border" />
          <span className="border-border-secondary absolute top-[38%] left-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border" />
          <span className="bg-accent absolute top-[38%] left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        </>
      );

    /* Duotono contenido: rojo de marca arriba, azul de detalle abajo */
    case "duotone":
      return (
        <>
          <span className="bg-[linear-gradient(150deg,var(--accent-tint-16)_0%,transparent_44%,var(--andor-ink-900)_100%)] absolute inset-0" />
          <span className="bg-[linear-gradient(330deg,var(--secondary-deep)_0%,transparent_50%)] absolute inset-0 opacity-25" />
        </>
      );
  }
}

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
        <ArtPlaceholder art={art} />
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