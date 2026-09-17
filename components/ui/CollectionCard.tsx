import Link from "next/link";

import type { Collection, CollectionVisualVariant } from "@/lib/types";

/* -----------------------------------------------------------------------------
   Portada de colección
   -----------------------------------------------------------------------------
   Una colección se presenta como una portada editorial, no como una tarjeta de
   producto: el arte ocupa toda la pieza y el texto es una etiqueta apoyada
   abajo. Sin precios, sin botones, sin badges.

   El arte es CSS puro: degradados, geometría y luz. Ningún asset externo y
   ninguna referencia a franquicias. Las medidas van en cqw (container queries)
   sobre la propia card, así que cada composición escala con su portada —que en
   la rejilla de escritorio varía al doble— en lugar de quedarse pequeña en las
   cards anchas. Cuando exista fotografía real, sustituye a CollectionArt sin
   tocar el resto de la card.
   -------------------------------------------------------------------------- */

/* Firma de cada universo. Todas parten del mismo material (la base de tinta, más
   abajo) y cada una añade su composición: qué acento manda y qué forma lo
   representa. */
function VariantArt({ variant }: { variant: CollectionVisualVariant }) {
  switch (variant) {
    /* Azul dominante: luz fría y anillos de apuntado descentrados */
    case "sci-fi":
      return (
        <>
          <span className="absolute -top-[12%] -right-[10%] size-[46cqw] rounded-full bg-[radial-gradient(circle,var(--secondary)_0%,transparent_70%)] opacity-25 blur-3xl" />
          <span className="absolute top-[36%] left-[62%] size-[30cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border-secondary" />
          <span className="absolute top-[36%] left-[62%] size-[18cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border" />
          <span className="absolute top-[36%] left-[62%] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary" />
          <span className="absolute inset-x-0 top-0 h-[44%] bg-[repeating-linear-gradient(to_bottom,var(--border)_0_1px,transparent_1px_7px)]" />
        </>
      );

    /* Azul dominante, otra lectura: ritmo de niveles con contraluz desde abajo.
       Los niveles viven en la mitad superior: en móvil la etiqueta ocupa más de
       la mitad inferior de la portada. */
    case "gaming":
      return (
        <>
          <span className="absolute -bottom-[16%] left-1/2 size-[54cqw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--secondary)_0%,transparent_68%)] opacity-25 blur-3xl" />
          <span className="absolute inset-x-0 top-0 h-px bg-border-secondary" />
          <span className="absolute top-[12%] left-[8%] flex w-[52cqw] flex-col items-start gap-[2.4cqw]">
            <span className="h-[2.2cqw] w-[34%] rounded-[2px] bg-[var(--andor-ink-600)]" />
            <span className="h-[2.2cqw] w-[67%] rounded-[2px] bg-[var(--andor-ink-600)]" />
            <span className="flex h-[2.2cqw] w-full items-center gap-[2cqw]">
              <span className="h-full w-[62%] rounded-[2px] bg-[var(--andor-ink-500)]" />
              <span className="h-full w-[12%] rounded-[2px] bg-secondary opacity-70" />
            </span>
          </span>
        </>
      );

    /* Rojo dominante en clave cálida: sol bajo y bandas analógicas. El sol se
       ancla arriba (fuera de la zona de etiqueta) sobre su propia línea de
       horizonte; las bandas suben desde abajo como textura de archivo. */
    case "retro":
      return (
        <>
          <span className="absolute inset-x-0 bottom-0 h-[64%] bg-[linear-gradient(0deg,var(--accent-deep)_0%,transparent_100%)] opacity-30" />
          <span className="absolute inset-x-0 bottom-0 h-[64%] bg-[repeating-linear-gradient(to_bottom,var(--border)_0_1px,transparent_1px_9px)]" />
          <span className="absolute top-[18%] left-[64%] size-[34cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--accent-tint-16)_0%,transparent_72%)] blur-xl" />
          <span className="absolute top-[18%] left-[64%] size-[30cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border-accent" />
          <span className="absolute inset-x-0 top-[18%] h-px bg-border" />
        </>
      );

    /* Rojo dominante y angular: cuña y diagonales de velocidad */
    case "extreme":
      return (
        <>
          <span className="absolute -bottom-[20%] -left-[14%] size-[56cqw] rounded-full bg-[radial-gradient(circle,var(--accent-tint-16)_0%,transparent_70%)] blur-3xl" />
          <span className="absolute top-0 right-0 h-full w-[62%] bg-[linear-gradient(200deg,var(--andor-ink-600)_0%,transparent_62%)] [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
          <span className="absolute inset-x-[-12%] top-[38%] h-px rotate-[-11deg] bg-border-accent" />
          <span className="absolute inset-x-[-12%] top-[47%] h-px rotate-[-11deg] bg-border" />
        </>
      );

    /* Neutro dominante: papel, trama de imprenta y viñeta desplazada. La viñeta
       flota en la mitad superior, lejos de la etiqueta. */
    case "comics":
      return (
        <>
          <span className="absolute top-0 right-0 size-[46cqw] bg-[radial-gradient(var(--border-strong)_1px,transparent_1px)] bg-[size:14px_14px] opacity-60 [mask-image:radial-gradient(120%_120%_at_100%_0%,#000_0%,transparent_72%)]" />
          <span className="absolute top-[14%] left-[8%] h-[30%] w-[46%] rounded-[4px] bg-foreground/6" />
          <span className="absolute top-[14%] left-[8%] h-[30%] w-[46%] translate-x-[3px] translate-y-[3px] rounded-[4px] border border-border-accent" />
          <span className="absolute top-[14%] left-[8%] h-[30%] w-[46%] -translate-x-[3px] -translate-y-[3px] rounded-[4px] border border-border-secondary" />
        </>
      );

    /* Neutro dominante: capas de paisaje con un dato de cielo en azul */
    case "outdoor":
      return (
        <>
          <span className="absolute top-[34%] left-[70%] size-2 rounded-full bg-secondary opacity-50" />
          <span className="absolute inset-x-0 top-[36%] h-px bg-border-secondary" />
          <span className="absolute inset-x-[-8%] bottom-[28%] h-[26%] rounded-[50%_50%_0_0] bg-[var(--andor-ink-600)]" />
          <span className="absolute inset-x-[-8%] bottom-[13%] h-[22%] rounded-[50%_50%_0_0] bg-[var(--andor-ink-700)]" />
          <span className="absolute inset-x-[-8%] bottom-0 h-[16%] rounded-[50%_50%_0_0] bg-[var(--andor-ink-900)]" />
        </>
      );
  }
}

function CollectionArt({ variant }: { variant: CollectionVisualVariant }) {
  return (
    <div
      aria-hidden="true"
      className="ease-[var(--ease-brand)] absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
    >
      {/* Base común: la tinta. Ninguna portada usa un color fuera del sistema */}
      <span className="absolute inset-0 bg-[linear-gradient(163deg,var(--andor-ink-700)_0%,var(--andor-ink-900)_54%,var(--andor-black)_100%)]" />
      <VariantArt variant={variant} />
    </div>
  );
}
export type CollectionCardProps = {
  collection: Collection;
  /** Composición dentro de la rejilla (ancho y proporción). La decide quien
      coloca la card, no la card: mismo reparto que en ContentRail, donde el
      contenedor fija el tamaño y la card no opina sobre él. */
  className?: string;
};

export default function CollectionCard({
  collection,
  className = "",
}: CollectionCardProps) {
  const { slug, name, description, category, visualVariant } = collection;

  return (
    <Link
      href={`/colecciones/${slug}`}
      /* Hover y foco: borde algo más marcado, zoom mínimo del arte, velo un
         poco más denso y la etiqueta gana contraste. Nada se desplaza de sitio
         y nada desborda la portada. */
      className={`group @container border-border bg-surface-gradient shadow-card ease-[var(--ease-brand)] hover:border-border-strong focus-visible:border-border-strong relative isolate flex h-full flex-col justify-end overflow-hidden rounded-panel border transition-colors duration-500 ${className}`}
    >
      <CollectionArt variant={visualVariant} />

      {/* Velo inferior: sostiene el texto sobre cualquier arte, también cuando
          el arte sea fotografía o video */}
      <span
        aria-hidden="true"
        className="from-background via-background/72 absolute inset-x-0 bottom-0 h-[80%] bg-linear-to-t to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Indicador: un apunte de dirección, nunca un botón dentro del enlace */}
      <span
        aria-hidden="true"
        className="border-border bg-background/40 group-hover:border-border-accent group-hover:bg-background/70 absolute top-5 right-5 flex size-10 items-center justify-center rounded-full border backdrop-blur-sm transition-colors duration-500"
      >
        <svg
          viewBox="0 0 16 16"
          className="ease-[var(--ease-brand)] size-4 -rotate-45 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <path
            d="M1 8h13M9.5 3.5 14 8l-4.5 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Etiqueta editorial: territorio del universo, nombre y una línea */}
      <div className="relative flex flex-col gap-3 p-6 lg:p-7">
        <span className="text-eyebrow text-secondary uppercase">
          {category}
        </span>

        <h3 className="font-display text-[clamp(1.5rem,3.2cqw,2.5rem)] leading-[1.02] font-bold uppercase">
          {name}
        </h3>

        <p className="text-muted group-hover:text-foreground max-w-[34ch] text-sm/relaxed transition-colors duration-500">
          {description}
        </p>
      </div>
    </Link>
  );
}