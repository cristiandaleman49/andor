import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import ContentRail from "@/components/sections/ContentRail";
import CollectionGrid from "@/components/sections/CollectionGrid";
import type { ContentCardProps } from "@/components/ui/ContentCard";

/* Home de ANDORPETS. Fase 3: header + hero + una fila de descubrimiento +
   la biblioteca de colecciones.
   Las siguientes secciones (originals, para ti) llegarán después sobre este
   mismo patrón.

   Datos mock mínimos e intencionadamente planos: el objetivo de la fase es
   validar el lenguaje visual y el patrón de navegación, no la capa de datos.
   Los enlaces apuntan a anclas de la home porque las secciones reales aún no
   existen: así nunca se enlaza a una ruta que devuelva 404. */
const trending: ContentCardProps[] = [
  {
    title: "Night Walks",
    category: "Colección",
    meta: "12 piezas · Otoño 2026",
    art: "halo",
    href: "/#collections",
  },
  {
    title: "Prisma Harness",
    category: "Drop",
    meta: "Estreno · edición limitada",
    art: "beam",
    href: "/#collections",
  },
  {
    title: "Pets Have Culture",
    category: "Editorial",
    meta: "Lectura de 4 min",
    art: "duotone",
    href: "/#trending",
  },
  {
    title: "Reflective Series",
    category: "Producto",
    meta: "Nuevo · detalle técnico",
    art: "grid",
    href: "/#collections",
  },
  {
    title: "City Pack",
    category: "Colección",
    meta: "8 piezas · paseo urbano",
    art: "orbit",
    href: "/#collections",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex flex-1 flex-col">
        <Hero />

        <ContentRail
          id="trending"
          eyebrow="Tendencias"
          title="Trending now"
          description="Lo que la comunidad está descubriendo esta semana."
          items={trending}
        />

        {/* Ancla usada por el header y por el CTA del hero */}
        <CollectionGrid
          id="collections"
          eyebrow="Pet culture"
          title="Explore AndorPets"
          description="Seis universos para elegir el que representa a tu mascota. No son categorías de producto: son formas de entender el paseo."
        />
      </main>
    </>
  );
}
