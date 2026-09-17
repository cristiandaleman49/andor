import type { Product } from "@/lib/types";

/* -----------------------------------------------------------------------------
   Productos de ANDORPETS
   -----------------------------------------------------------------------------
   Datos locales de esta fase: las piezas que habitan cada universo. Una pieza
   pertenece a una colección por slug; el nombre y la ruta se resuelven desde
   lib/data/collections.ts.

   Todos los nombres y conceptos son originales: sin personajes, logos,
   franquicias ni marcas registradas.
   -------------------------------------------------------------------------- */

export const products: Product[] = [
  /* SCI-FI — Future / Space / Technology */
  {
    slug: "galactic-paw",
    name: "Galactic Paw",
    description:
      "Arnés de perfil modular con acabado reflectante para paseos después de horizonte.",
    price: 58,
    collection: "sci-fi",
    category: "Arnés",
    visualVariant: "beam",
  },
  {
    slug: "astro-rover",
    name: "Astro Rover",
    description:
      "Correa de costura reforzada y mosquetón de precisión, lista para órbitas urbanas.",
    price: 36,
    collection: "sci-fi",
    category: "Correa",
    visualVariant: "orbit",
  },
  {
    slug: "cosmic-explorer",
    name: "Cosmic Explorer",
    description:
      "Collar de silueta limpia con placa identificativa grabada al detalle.",
    price: 28,
    collection: "sci-fi",
    category: "Collar",
    visualVariant: "halo",
  },

  /* GAMING — Digital / Arcade / Play */
  {
    slug: "pixel-runner",
    name: "Pixel Runner",
    description:
      "Sudadera de punto grueso con gráfico geométrico que cuenta marcadores imaginarios.",
    price: 46,
    collection: "gaming",
    category: "Sudadera",
    visualVariant: "grid",
  },
  {
    slug: "arcade-paw",
    name: "Arcade Paw",
    description:
      "Juguete de tela con capas de sonido suave: un nivel nuevo cada tarde.",
    price: 24,
    collection: "gaming",
    category: "Juguete",
    visualVariant: "beam",
  },
  {
    slug: "level-up",
    name: "Level Up",
    description:
      "Bandana de doble cara para subir el inventario de estilo sin más esfuerzo.",
    price: 19,
    collection: "gaming",
    category: "Bandana",
    visualVariant: "halo",
  },

  /* RETRO — Analog / Vintage / Classic */
  {
    slug: "classic-club",
    name: "Classic Club",
    description:
      "Collar de cuero curtido con hebilla de latón: el archivo que sigue activo.",
    price: 32,
    collection: "retro",
    category: "Collar",
    visualVariant: "duotone",
  },
  {
    slug: "analog-paw",
    name: "Analog Paw",
    description:
      "Correa de lona con remates metálicos y la textura de una cámara bien llevada.",
    price: 34,
    collection: "retro",
    category: "Correa",
    visualVariant: "halo",
  },
  {
    slug: "vintage-runner",
    name: "Vintage Runner",
    description:
      "Cazadora cortavientos de corte recto en paleta de temporada pasada.",
    price: 78,
    collection: "retro",
    category: "Cazadora",
    visualVariant: "grid",
  },

  /* EXTREME — Adventure / Action / Ride */
  {
    slug: "trail-rider",
    name: "Trail Rider",
    description:
      "Arnés de carga repartida con anclaje doble para terrenos que no perdonan.",
    price: 64,
    collection: "extreme",
    category: "Arnés",
    visualVariant: "beam",
  },
  {
    slug: "mountain-paw",
    name: "Mountain Paw",
    description:
      "Cazadora térmica de tres capas para cimas, charcos y viento lateral.",
    price: 82,
    collection: "extreme",
    category: "Cazadora",
    visualVariant: "orbit",
  },
  {
    slug: "adventure-mode",
    name: "Adventure Mode",
    description:
      "Juguete de tela técnica con costuras selladas: aguantará el asalto entero.",
    price: 26,
    collection: "extreme",
    category: "Juguete",
    visualVariant: "grid",
  },

  /* COMICS — Illustration / Graphic / Pop */
  {
    slug: "graphic-paw",
    name: "Graphic Paw",
    description:
      "Sudadera con trama de puntos y entintado generoso: una viñeta andante.",
    price: 48,
    collection: "comics",
    category: "Sudadera",
    visualVariant: "duotone",
  },
  {
    slug: "ink-runner",
    name: "Ink Runner",
    description:
      "Correa de trazo grueso y contraste alto: se lee desde una manzana.",
    price: 34,
    collection: "comics",
    category: "Correa",
    visualVariant: "grid",
  },
  {
    slug: "pop-character",
    name: "Pop Character",
    description:
      "Placa identificativa con relieve tipográfico y acabado brillante.",
    price: 26,
    collection: "comics",
    category: "Placa",
    visualVariant: "halo",
  },

  /* OUTDOOR — Nature / Trail / Adventure */
  {
    slug: "wild-trail",
    name: "Wild Trail",
    description:
      "Correa de trail con cuerda dinámica y mosquetón forjado para el paso largo.",
    price: 38,
    collection: "outdoor",
    category: "Correa",
    visualVariant: "beam",
  },
  {
    slug: "forest-explorer",
    name: "Forest Explorer",
    description:
      "Bandana de franela en verdes profundos para rutas bajo dosel.",
    price: 21,
    collection: "outdoor",
    category: "Bandana",
    visualVariant: "duotone",
  },
  {
    slug: "summit-paw",
    name: "Summit Paw",
    description:
      "Arnés ultraligero con malla ventilada pensado para la subida final.",
    price: 72,
    collection: "outdoor",
    category: "Arnés",
    visualVariant: "orbit",
  },
];

/** Búsqueda por slug para la ruta /productos/[slug] */
export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

/** Piezas de un universo, en el orden editorial de la lista */
export function getProductsByCollection(collectionSlug: string) {
  return products.filter(
    (product) => product.collection === collectionSlug,
  );
}