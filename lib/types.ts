/* -----------------------------------------------------------------------------
   Tipos de dominio de ANDORPETS
   -----------------------------------------------------------------------------
   Estructura mínima de la fase de colecciones: lo justo para renderizar una
   colección. Todavía no hay modelo de producto, API ni CMS, así que aquí no
   aparece nada que no se esté usando ya en pantalla.
   -------------------------------------------------------------------------- */

/* Firma visual de la portada. No son seis paletas distintas: son seis
   composiciones dentro del mismo sistema de marca. Cada variante decide qué
   acento manda en su arte (azul secundario, rojo de marca o tintas neutras) y
   qué forma lo representa. */
export type CollectionVisualVariant =
  | "sci-fi"
  | "gaming"
  | "retro"
  | "extreme"
  | "comics"
  | "outdoor";

/* Lenguaje visual compartido por todas las cards de contenido (colección,
   producto, drop, editorial): cinco composiciones CSS que se sustituirán por
   fotografía o video real sin tocar ninguna card. */
export type ArtVariant = "halo" | "grid" | "beam" | "orbit" | "duotone";

/* Un universo de cultura, no una categoría de producto. */
export type Collection = {
  /** Identificador de URL: /colecciones/[slug] */
  slug: string;
  /** Nombre del universo */
  name: string;
  /** Una línea sobre lo que se descubre dentro */
  description: string;
  /** Territorio conceptual del universo: "Future / Space / Technology" */
  category: string;
  /** Firma visual de la portada mientras no exista el asset real */
  visualVariant: CollectionVisualVariant;
};

/* Una pieza dentro de un universo. La colección se referencia por slug: es el
   único dato que la card y el detalle necesitan para resolver nombre y ruta.
   Sin stock, SKU ni variantes: todavía no hay ecommerce. */
export type Product = {
  /** Identificador de URL: /productos/[slug] */
  slug: string;
  /** Nombre de la pieza */
  name: string;
  /** Frase corta de campaña, bajo el nombre */
  statement: string;
  /** Una línea editorial sobre la pieza */
  description: string;
  /** Contexto cultural: por qué la pieza pertenece a su universo */
  story: string;
  /** Precio en euros, sin céntimos en esta fase */
  price: number;
  /** Slug de la colección a la que pertenece */
  collection: string;
  /** Tipo de pieza: "Arnés", "Correa", "Sudadera"... */
  category: string;
  /** Nota de diseño: el gesto visual de la pieza, sin specs de fabricación */
  design: string;
  /** Firma visual mientras no exista fotografía del producto */
  visualVariant: ArtVariant;
};