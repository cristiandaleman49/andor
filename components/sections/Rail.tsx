import type { ReactNode } from "react";

/* -----------------------------------------------------------------------------
   Riel de descubrimiento
   -----------------------------------------------------------------------------
   La mecánica común de todas las filas horizontales de ANDORPETS: cabecera
   editorial + una pista que solo desborda en horizontal dentro de sí misma.

   Decisiones de layout:
     · El scroll vive SOLO aquí dentro (overflow-x-auto). La página nunca
       desborda en horizontal.
     · Los márgenes negativos anulan el padding de la sección, así que la
       fila ocupa el ancho exacto del viewport: la primera card alinea con
       el título y la última puede sangrar hasta el borde.
     · En móvil la card mide 68vw para que la siguiente asome y se entienda
       que hay más contenido.
     · scroll-snap + scroll-px alinean cada card con el padding de la
       sección. Sin librerías: solo CSS nativo.
     · Server Component: toda la interacción es del navegador.

   ContentRail y ProductRail lo usan; una fila nueva de otro tipo de contenido
   debería hacer lo mismo en lugar de copiar la mecánica.
   -------------------------------------------------------------------------- */

export type RailProps = {
  /** Ancla real de la sección (la usan la navegación y los enlaces) */
  id: string;
  /** Etiqueta superior: familia de contenido */
  eyebrow: string;
  /** Titular de la fila */
  title: string;
  /** Línea de contexto opcional */
  description?: string;
  /** Contenido de la fila: el ancho y el snap de cada card los decide el riel */
  items: { key: string; content: ReactNode }[];
};

export default function Rail({
  id,
  eyebrow,
  title,
  description,
  items,
}: RailProps) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      /* scroll-mt compensa el header fijo al saltar a esta ancla */
      className="scroll-mt-20 px-6 pt-16 pb-20 sm:px-10 sm:pt-20 lg:px-14 lg:pt-24 lg:pb-28"
    >
      <div className="max-w-2xl">
        <p className="text-eyebrow text-accent flex items-center gap-3 uppercase">
          <span aria-hidden="true" className="bg-accent h-px w-10" />
          {eyebrow}
        </p>

        <h2
          id={headingId}
          className="font-display mt-5 text-3xl uppercase sm:text-4xl"
        >
          {title}
        </h2>

        {description ? (
          <p className="text-muted mt-4 max-w-md text-sm/relaxed">
            {description}
          </p>
        ) : null}
      </div>

      {/* Pista: único punto de scroll horizontal de la página */}
      <ul className="scroll-px-6 -mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-6 pb-6 sm:-mx-10 sm:gap-5 sm:px-10 sm:scroll-px-10 lg:-mx-14 lg:px-14 lg:scroll-px-14">
        {items.map((item) => (
          <li
            key={item.key}
            className="w-[68vw] shrink-0 snap-start sm:w-[15rem] lg:w-[17rem]"
          >
            {item.content}
          </li>
        ))}
      </ul>
    </section>
  );
}