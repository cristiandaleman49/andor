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