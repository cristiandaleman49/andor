import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import ProductRail from "@/components/sections/ProductRail";
import { collections, getCollection } from "@/lib/data/collections";
import { getProductsByCollection } from "@/lib/data/products";

/* -----------------------------------------------------------------------------
   Detalle de colección
   -----------------------------------------------------------------------------
   La portada de un universo: cabecera editorial (qué es este universo) y, a
   continuación, sus piezas en una fila de descubrimiento. No es una ficha de
   tienda: sin filtros, sin compra, sin rejilla de catálogo.

   Server Component. Los seis slugs se prerenderizan en el build; un slug
   desconocido responde 404 en lugar de generar una página vacía.
   -------------------------------------------------------------------------- */

export function generateStaticParams() {
  return collections.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const collection = getCollection((await params).slug);

  if (!collection) {
    return { title: "Colección no encontrada" };
  }

  return {
    title: collection.name,
    description: collection.description,
  };
}

export default async function CollectionPage({
  params,
}: PageProps<"/colecciones/[slug]">) {
  const collection = getCollection((await params).slug);

  if (!collection) {
    notFound();
  }

  const pieces = getProductsByCollection(collection.slug);

  return (
    <>
      <Header />

      <main className="bg-cinema flex flex-1 flex-col">
        {/* Cabecera editorial del universo */}
        <section className="px-6 pt-14 pb-4 sm:px-10 lg:px-14 lg:pt-20">
          <div className="max-w-2xl">
            <p className="text-eyebrow text-accent flex items-center gap-3 uppercase">
              <span aria-hidden="true" className="bg-accent h-px w-10" />
              Pet culture
            </p>

            <h1 className="font-display text-display mt-7 uppercase">
              {collection.name}
            </h1>

            {/* Terreno del universo. El azul marca el dato, no el mensaje */}
            <p className="text-eyebrow text-secondary mt-7 uppercase">
              {collection.category}
            </p>

            <p className="text-muted mt-7 max-w-md text-lg/relaxed">
              {collection.description}
            </p>
          </div>
        </section>

        {/* Las piezas del universo. Una fila basta en esta fase. */}
        {pieces.length > 0 ? (
          <ProductRail
            id={`featured-${collection.slug}`}
            eyebrow="El universo"
            title={`Featured in ${collection.name}`}
            description={`${pieces.length} piezas en esta primera selección. El universo crece con cada drop.`}
            items={pieces}
          />
        ) : (
          <section className="px-6 pt-10 pb-16 sm:px-10 lg:px-14">
            <p className="text-muted border-border border-t pt-6 text-sm/relaxed">
              Este universo aún no tiene piezas a la vista. Vuelve pronto.
            </p>
          </section>
        )}

        {/* Cierre: vuelta atrás, con el mismo gesto editorial de la home */}
        <section className="px-6 pt-2 pb-20 sm:px-10 sm:pb-24 lg:px-14 lg:pb-28">
          <Link
            href="/#collections"
            className="text-foreground group relative inline-flex items-center gap-3 py-2 text-sm font-medium tracking-[0.18em] uppercase"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="ease-[var(--ease-brand)] size-3.5 transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path
                d="M15 8H2M6.5 3.5 2 8l4.5 4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Volver a colecciones
            <span
              aria-hidden="true"
              className="bg-accent absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
          </Link>
        </section>
      </main>
    </>
  );
}