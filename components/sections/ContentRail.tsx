import ContentCard, {
  type ContentCardProps,
} from "@/components/ui/ContentCard";

/* -----------------------------------------------------------------------------
   Fila horizontal de contenido
   -----------------------------------------------------------------------------
   El patrón de descubrimiento de ANDORPETS: un título editorial y, debajo,
   contenido que se recorre en horizontal.

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
   -------------------------------------------------------------------------- */

export type ContentRailProps = {
  /** Ancla real de la sección (la usan la navegación y los enlaces) */
  id: string;
  /** Etiqueta superior: familia de contenido */
  eyebrow: string;
  /** Titular de la fila */
  title: string;
  /** Línea de contexto opcional */
  description?: string;
  items: ContentCardProps[];
};

export default function ContentRail({
  id,
  eyebrow,
  title,
  description,
  items,
}: ContentRailProps) {
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

      {/* Riel: único punto de scroll horizontal de la página */}
      <ul className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-6 pb-6 scroll-px-6 sm:-mx-10 sm:gap-5 sm:px-10 sm:scroll-px-10 lg:-mx-14 lg:px-14 lg:scroll-px-14">
        {items.map((item, index) => (
          /* Ancho de card: en móvil deja ver la siguiente; en escritorio
             muestra varias y mantiene el ritmo de la fila */
          <li
            key={`${item.href}-${index}`}
            className="w-[68vw] shrink-0 snap-start sm:w-[15rem] lg:w-[17rem]"
          >
            <ContentCard {...item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
