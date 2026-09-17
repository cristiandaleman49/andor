import type { ArtVariant } from "@/lib/types";

/* -----------------------------------------------------------------------------
   Arte de las cards
   -----------------------------------------------------------------------------
   El lenguaje visual compartido de ANDORPETS: cinco composiciones hechas solo
   con CSS (formas, luz y rejilla) sobre el lienzo oscuro de la card. Vive aquí
   para que ContentCard, ProductCard y las vistas de detalle usen exactamente el
   mismo sistema; cuando existan assets reales se sustituye este componente sin
   tocar ninguna card.
   -------------------------------------------------------------------------- */

export function ArtVisual({ variant }: { variant: ArtVariant }) {
  switch (variant) {
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