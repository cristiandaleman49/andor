import ContentCard, {
  type ContentCardProps,
} from "@/components/ui/ContentCard";
import Rail from "@/components/sections/Rail";

/* -----------------------------------------------------------------------------
   Fila horizontal de contenido editorial
   -----------------------------------------------------------------------------
   El patrón de descubrimiento de ANDORPETS: un título y contenido que se
   recorre en horizontal. Toda la mecánica de scroll, snap y anchos vive en
   Rail; aquí solo se decide qué card representa cada elemento.
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
  return (
    <Rail
      id={id}
      eyebrow={eyebrow}
      title={title}
      description={description}
      items={items.map((item, index) => ({
        key: `${item.href}-${index}`,
        content: <ContentCard {...item} />,
      }))}
    />
  );
}
