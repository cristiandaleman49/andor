import CollectionCard from "@/components/ui/CollectionCard";
import { collections } from "@/lib/data/collections";

/* -----------------------------------------------------------------------------
   Explorar AndorPets — la biblioteca de universos
   -----------------------------------------------------------------------------
   No es una rejilla de categorías de producto: es la portada de una biblioteca.
   Bloques grandes con arte protagonista y una composición editorial en la que
   cada fila tiene su propio ritmo.

   Decisiones de layout:
     · Móvil: una columna. Tableta: dos. Escritorio: rejilla de 6 columnas.
     · En escritorio cada colección ocupa un ancho distinto (4+2, 2+4, 3+3) y
       una proporción calculada para que las dos cards de cada fila acaben con
       la misma altura (ver desktopLayout). Sin masonry ni cálculos en JS.
     · Las cards se estiran a la altura de su fila (align-self: stretch por
       defecto en grid), así que la fila queda a ras.
     · La sección no genera scroll horizontal: el ancho lo fija la rejilla.
     · Server Component: no hay estado ni interacción propia.
   -------------------------------------------------------------------------- */

/* Composición editorial de la biblioteca: ancho de cada portada y altura de su
   fila. La composición se mide en cqw sobre el contenedor que envuelve la
   rejilla, así que es idéntica en cualquier ancho de escritorio.

   Aritmética con g = 1,5cqw (el gap) y u = ancho de columna:
     u = (100 − 5g) / 6 = 15,417cqw
     filas 1 y 2: 4 columnas → 4u + 3g = 66,167cqw de ancho a 16/10 → 41,354cqw
                  2 columnas → 2u +  g = 32,333cqw de ancho a la misma altura
     fila 3:      3 columnas → 3u + 2g = 49,250cqw de ancho a 5/4   → 39,4cqw
   Al fijar la altura de la fila (y no la proporción de cada card) las dos
   portadas de una fila terminan exactamente a la misma altura: es una rejilla,
   no un mosaico. Una colección nueva que no esté en el mapa hereda el ritmo por
   defecto. */
const desktopLayout: Record<string, string> = {
  "sci-fi": "lg:col-span-4 lg:h-[41.354cqw]",
  gaming: "lg:col-span-2 lg:h-[41.354cqw]",
  retro: "lg:col-span-2 lg:h-[41.354cqw]",
  extreme: "lg:col-span-4 lg:h-[41.354cqw]",
  comics: "lg:col-span-3 lg:h-[39.4cqw]",
  outdoor: "lg:col-span-3 lg:h-[39.4cqw]",
};

const defaultLayout = "lg:col-span-3 lg:h-[39.4cqw]";

export type CollectionGridProps = {
  /** Ancla real de la sección (la usan la navegación y el hero) */
  id: string;
  /** Etiqueta superior: la familia de contenido */
  eyebrow: string;
  /** Titular de la sección */
  title: string;
  /** Línea de contexto opcional */
  description?: string;
};

export default function CollectionGrid({
  id,
  eyebrow,
  title,
  description,
}: CollectionGridProps) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      /* scroll-mt compensa el header fijo al saltar a esta ancla */
      className="scroll-mt-20 px-6 pt-8 pb-24 sm:px-10 sm:pt-10 lg:px-14 lg:pt-12 lg:pb-32"
    >
      {/* Cabecera de sección. Repite la estructura del rail porque todavía no
          existe un componente compartido: en cuanto haya una tercera sección
          con el mismo encabezado, esa pieza común sale sola. */}
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

      {/* El contenedor de la rejilla existe para que las alturas de fila se
          midan sobre el ancho real de la biblioteca (cqw), no sobre el viewport:
          así la composición de escritorio es idéntica a cualquier ancho */}
      <div className="@container">
        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-[1.5cqw]">
          {collections.map((collection) => (
            <li
              key={collection.slug}
              /* Proporción base (móvil y tableta) y composición de escritorio:
                 ancho de columna + altura de fila. En escritorio la altura es
                 un valor definido, así que manda sobre aspect-ratio. */
              className={`aspect-[4/5] lg:aspect-auto ${
                desktopLayout[collection.slug] ?? defaultLayout
              }`}
            >
              <CollectionCard collection={collection} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}