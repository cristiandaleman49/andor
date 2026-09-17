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
    statement: "Hecho para marcar rumbo.",
    description:
      "Arnés de perfil modular con acabado reflectante para paseos después de horizonte.",
    story:
      "Dentro de Sci-Fi, Galactic Paw es la pieza de mando: una silueta que ordena el paseo como una ruta trazada. Pensada para salidas nocturnas donde la ciudad parece otra.",
    price: 58,
    collection: "sci-fi",
    category: "Arnés",
    design: "Perfil modular",
    visualVariant: "beam",
  },
  {
    slug: "astro-rover",
    name: "Astro Rover",
    statement: "Tensión precisa, paso firme.",
    description:
      "Correa de costura reforzada y mosquetón de precisión, lista para órbitas urbanas.",
    story:
      "Astro Rover traduce el lenguaje técnico de la colección a pieza diaria: trazo recto, anclaje exacto y una lectura casi de panel de control.",
    price: 36,
    collection: "sci-fi",
    category: "Correa",
    design: "Línea de instrumento",
    visualVariant: "orbit",
  },
  {
    slug: "cosmic-explorer",
    name: "Cosmic Explorer",
    statement: "Identidad, grabada.",
    description:
      "Collar de silueta limpia con placa identificativa grabada al detalle.",
    story:
      "El punto de entrada al universo: un collar que entiende la identificación como diseño y no como etiqueta. Todo Sci-Fi empieza aquí.",
    price: 28,
    collection: "sci-fi",
    category: "Collar",
    design: "Grabado al detalle",
    visualVariant: "halo",
  },

  /* GAMING — Digital / Arcade / Play */
  {
    slug: "pixel-runner",
    name: "Pixel Runner",
    statement: "El marcador se lleva puesto.",
    description:
      "Sudadera de punto grueso con gráfico geométrico que cuenta marcadores imaginarios.",
    story:
      "Pixel Runner toma el pulso arcade de la colección y lo vuelve textura: bloques, ritmo y un gráfico que solo se entiende en movimiento.",
    price: 46,
    collection: "gaming",
    category: "Sudadera",
    design: "Gráfico en bloques",
    visualVariant: "grid",
  },
  {
    slug: "arcade-paw",
    name: "Arcade Paw",
    statement: "Un nivel cada tarde.",
    description:
      "Juguete de tela con capas de sonido suave: un nivel nuevo cada tarde.",
    story:
      "La pieza de juego del universo: capas suaves de sonido y una resistencia pensada para la repetición, que es como se aprende cualquier arcade.",
    price: 24,
    collection: "gaming",
    category: "Juguete",
    design: "Capas de sonido",
    visualVariant: "beam",
  },
  {
    slug: "level-up",
    name: "Level Up",
    statement: "Otro tono, otra partida.",
    description:
      "Bandana de doble cara para subir el inventario de estilo sin más esfuerzo.",
    story:
      "El guiño de la colección: dos lecturas en una sola pieza, para el día en que el paseo pide cambiar de personaje.",
    price: 19,
    collection: "gaming",
    category: "Bandana",
    design: "Dos caras",
    visualVariant: "halo",
  },

  /* RETRO — Analog / Vintage / Classic */
  {
    slug: "classic-club",
    name: "Classic Club",
    statement: "El clásico sigue activo.",
    description:
      "Collar de cuero curtido con hebilla de latón: el archivo que sigue activo.",
    story:
      "Classic Club es el archivo de Retro: cuero curtido y herrajes que no necesitan presentación. La pieza que sostiene al resto de la colección.",
    price: 32,
    collection: "retro",
    category: "Collar",
    design: "Corte de archivo",
    visualVariant: "duotone",
  },
  {
    slug: "analog-paw",
    name: "Analog Paw",
    statement: "Envejece bien.",
    description:
      "Correa de lona con remates metálicos y la textura de una cámara bien llevada.",
    story:
      "Analog Paw copia la ergonomía de las máquinas que uno nunca tira: lona que gana carácter con los años y detalles que se sienten al tacto.",
    price: 34,
    collection: "retro",
    category: "Correa",
    design: "Grano analógico",
    visualVariant: "halo",
  },
  {
    slug: "vintage-runner",
    name: "Vintage Runner",
    statement: "Temporada pasada, mejor.",
    description:
      "Cazadora cortavientos de corte recto en paleta de temporada pasada.",
    story:
      "La prenda que ancla Retro en el armario: paleta de archivo y un corte que cruza décadas sin disfrazarse.",
    price: 78,
    collection: "retro",
    category: "Cazadora",
    design: "Corte recto",
    visualVariant: "grid",
  },

  /* EXTREME — Adventure / Action / Ride */
  {
    slug: "trail-rider",
    name: "Trail Rider",
    statement: "Carga repartida, terreno cualquiera.",
    description:
      "Arnés de carga repartida con anclaje doble para terrenos que no perdonan.",
    story:
      "Trail Rider es la pieza de mando de Extreme: reparte el esfuerzo, aguanta el tirón y convierte cualquier ruta en terreno conocido.",
    price: 64,
    collection: "extreme",
    category: "Arnés",
    design: "Doble anclaje",
    visualVariant: "beam",
  },
  {
    slug: "mountain-paw",
    name: "Mountain Paw",
    statement: "Contra el viento lateral.",
    description:
      "Cazadora térmica de tres capas para cimas, charcos y viento lateral.",
    story:
      "El techo de la colección: capas para el charco, el viento y la última subida, cuando el paisaje ya no perdona.",
    price: 82,
    collection: "extreme",
    category: "Cazadora",
    design: "Capas térmicas",
    visualVariant: "orbit",
  },
  {
    slug: "adventure-mode",
    name: "Adventure Mode",
    statement: "Aguanta el asalto entero.",
    description:
      "Juguete de tela técnica con costuras selladas: aguantará el asalto entero.",
    story:
      "La pieza ruidosa de Extreme: resistencia a la vista y un juego que dura más que la tarde.",
    price: 26,
    collection: "extreme",
    category: "Juguete",
    design: "Sellado reforzado",
    visualVariant: "grid",
  },

  /* COMICS — Illustration / Graphic / Pop */
  {
    slug: "graphic-paw",
    name: "Graphic Paw",
    statement: "Una viñeta que camina.",
    description:
      "Sudadera con trama de puntos y entintado generoso: una viñeta andante.",
    story:
      "Graphic Paw lleva la tinta de la colección a la calle: trama de puntos, entintado generoso y un personaje que ya tiene silueta propia.",
    price: 48,
    collection: "comics",
    category: "Sudadera",
    design: "Trama de imprenta",
    visualVariant: "duotone",
  },
  {
    slug: "ink-runner",
    name: "Ink Runner",
    statement: "Se lee desde una manzana.",
    description:
      "Correa de trazo grueso y contraste alto: se lee desde una manzana.",
    story:
      "La línea del universo: trazo grueso, contraste alto y la seguridad de quien dibuja sin plantilla.",
    price: 34,
    collection: "comics",
    category: "Correa",
    design: "Trazo grueso",
    visualVariant: "grid",
  },
  {
    slug: "pop-character",
    name: "Pop Character",
    statement: "Relieve con nombre propio.",
    description:
      "Placa identificativa con relieve tipográfico y acabado brillante.",
    story:
      "El detalle que cierra Comics: tipografía en relieve y acabado brillante, como una firma al pie de la viñeta.",
    price: 26,
    collection: "comics",
    category: "Placa",
    design: "Tipografía en relieve",
    visualVariant: "halo",
  },

  /* OUTDOOR — Nature / Trail / Adventure */
  {
    slug: "wild-trail",
    name: "Wild Trail",
    statement: "Para el paso largo.",
    description:
      "Correa de trail con cuerda dinámica y mosquetón forjado para el paso largo.",
    story:
      "Wild Trail abre Outdoor con el gesto más sencillo: una cuerda que cede justo lo necesario y un anclaje que no discute.",
    price: 38,
    collection: "outdoor",
    category: "Correa",
    design: "Cuerda dinámica",
    visualVariant: "beam",
  },
  {
    slug: "forest-explorer",
    name: "Forest Explorer",
    statement: "Verdes bajo dosel.",
    description:
      "Bandana de franela en verdes profundos para rutas bajo dosel.",
    story:
      "La pieza de bosque: franela en verdes profundos, pensada para rutas donde la luz llega filtrada.",
    price: 21,
    collection: "outdoor",
    category: "Bandana",
    design: "Franela de dos tintas",
    visualVariant: "duotone",
  },
  {
    slug: "summit-paw",
    name: "Summit Paw",
    statement: "Ligero hasta la cima.",
    description:
      "Arnés ultraligero con malla ventilada pensado para la subida final.",
    story:
      "El final de ruta del universo Outdoor: el menor peso posible y la calma de quien ya hizo la cima antes.",
    price: 72,
    collection: "outdoor",
    category: "Arnés",
    design: "Malla ventilada",
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