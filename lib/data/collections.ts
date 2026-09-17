import type { Collection } from "@/lib/types";

/* -----------------------------------------------------------------------------
   Colecciones de ANDORPETS
   -----------------------------------------------------------------------------
   Datos locales de esta fase. El orden de la lista es el orden editorial de la
   biblioteca: CollectionGrid reparte la composición a partir de él.

   Todas las colecciones son conceptos originales. No se usan personajes,
   logotipos, nombres de franquicias, videojuegos, películas ni series.
   -------------------------------------------------------------------------- */

export const collections: Collection[] = [
  {
    slug: "sci-fi",
    name: "Sci-Fi",
    description:
      "Precisión y luz fría para mascotas que parecen venir de más adelante.",
    category: "Future / Space / Technology",
    visualVariant: "sci-fi",
  },
  {
    slug: "gaming",
    name: "Gaming",
    description:
      "Ritmo, repetición y luz de pantalla aplicados al juego de cada día.",
    category: "Digital / Arcade / Play",
    visualVariant: "gaming",
  },
  {
    slug: "retro",
    name: "Retro",
    description:
      "Formas analógicas y texturas de archivo que nunca dejan de funcionar.",
    category: "Analog / Vintage / Classic",
    visualVariant: "retro",
  },
  {
    slug: "extreme",
    name: "Extreme",
    description:
      "Resistencia a la vista: barro, velocidad y ruido sin perder el detalle.",
    category: "Adventure / Action / Ride",
    visualVariant: "extreme",
  },
  {
    slug: "comics",
    name: "Comics",
    description:
      "Tinta, trama y color plano: narrativa gráfica para el equipo de paseo.",
    category: "Illustration / Graphic / Pop",
    visualVariant: "comics",
  },
  {
    slug: "outdoor",
    name: "Outdoor",
    description:
      "Paisaje, materia y silencio para los que pasan el día fuera de casa.",
    category: "Nature / Trail / Adventure",
    visualVariant: "outdoor",
  },
];

/** Búsqueda por slug para la ruta /colecciones/[slug] */
export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}