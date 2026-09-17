import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import AddToBagButton from "@/components/cart/AddToBagButton";
import ProductRail from "@/components/sections/ProductRail";
import { ArtVisual } from "@/components/ui/ArtVisual";
import { getCollection } from "@/lib/data/collections";
import {
  getProduct,
  getProductsByCollection,
  products,
} from "@/lib/data/products";
import { formatPrice } from "@/lib/format";

/* -----------------------------------------------------------------------------
   Detalle de producto
   -----------------------------------------------------------------------------
   La ficha editorial de una pieza: visual de campaña protagonista, jerarquía
   nombre → statement → descripción → precio → CTA, metadatos compactos y una
   sección que explica por qué la pieza pertenece a su universo. Cierra con un
   riel "More from this world" reutilizando Rail/ProductRail.

   El CTA "Add to bag" es una isla client que alimenta la bag; la página sigue
   siendo un Server Component. Los slugs mock se prerenderizan en el build; uno
   desconocido responde 404.
   -------------------------------------------------------------------------- */

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const product = getProduct((await params).slug);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/productos/[slug]">) {
  const product = getProduct((await params).slug);

  if (!product) {
    notFound();
  }

  const collection = getCollection(product.collection);
  const related = getProductsByCollection(product.collection).filter(
    (piece) => piece.slug !== product.slug,
  );

  return (
    <>
      <Header />

      <main className="bg-cinema flex flex-1 flex-col">
        {/* ------------------------------ HERO ------------------------------ */}
        <section className="px-6 pt-6 pb-16 sm:px-10 sm:pt-8 lg:px-14 lg:pb-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            {/* Visual de campaña. Mismo lenguaje CSS que las cards (ArtVisual)
                dentro de un marco editorial: atmósfera, viñeta y tipografía
                fantasma del universo. Sustituir ArtVisual por fotografía real
                no toca nada más de la página. */}
            <figure className="border-border bg-surface-gradient shadow-card @container relative aspect-[4/5] w-full overflow-hidden rounded-panel border lg:col-span-7 lg:aspect-auto lg:h-[78vh] lg:max-h-[52rem]">
              {/* Atmósfera: glow de marca y viñeta para el marco */}
              <span
                aria-hidden="true"
                className="bg-[radial-gradient(55%_45%_at_72%_18%,var(--accent-tint-08)_0%,transparent_70%)] absolute inset-0"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 shadow-[inset_0_0_9rem_rgba(0,0,0,0.55)]"
              />

              {/* La pieza */}
              <div aria-hidden="true" className="absolute inset-0">
                <ArtVisual variant={product.visualVariant} />
              </div>

              {/* Tipografía fantasma: el universo detrás de la pieza */}
              {collection ? (
                <span
                  aria-hidden="true"
                  className="font-display text-foreground/6 absolute -bottom-[1.5cqw] left-[5cqw] text-[13cqw] leading-none font-bold tracking-tight whitespace-nowrap uppercase select-none"
                >
                  {collection.name}
                </span>
              ) : null}

              {/* Gesto de marca: tick rojo + tipo de pieza */}
              <span
                aria-hidden="true"
                className="bg-accent absolute top-6 left-6 h-px w-10 sm:top-8 sm:left-8"
              />
              <span className="text-eyebrow text-secondary absolute top-11 left-6 uppercase sm:top-14 sm:left-8">
                {product.category}
              </span>

              <figcaption className="sr-only">
                {product.name}, pieza del universo {collection?.name}.
              </figcaption>
            </figure>

            {/* Información de la pieza */}
            <div className="flex flex-col lg:col-span-5 lg:pt-10">
              {collection ? (
                <>
                  <p className="text-eyebrow text-accent uppercase">
                    Part of the collection
                  </p>
                  <Link
                    href={`/colecciones/${collection.slug}`}
                    className="text-foreground group mt-3 inline-flex w-fit items-center gap-2 text-lg font-medium transition-colors duration-300 hover:text-accent"
                  >
                    <span className="border-border-secondary group-hover:border-accent border-b pb-0.5">
                      {collection.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className="ease-[var(--ease-brand)] transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </>
              ) : null}

              <h1 className="font-display mt-8 text-5xl leading-[0.98] font-bold uppercase sm:text-6xl lg:text-[4.4rem]">
                {product.name}
              </h1>

              <p className="text-foreground/90 mt-5 text-xl leading-snug font-medium">
                {product.statement}
              </p>

              <p className="text-muted mt-5 max-w-md text-base/relaxed">
                {product.description}
              </p>

              {/* Precio claro sin protagonismo; el CTA es la isla client que
                  alimenta la bag */}
              <p className="text-foreground mt-9 text-2xl font-semibold tabular-nums">
                {formatPrice(product.price)}
              </p>

              <div className="mt-5">
                <AddToBagButton slug={product.slug} />
              </div>

              {/* Metadatos compactos: solo lo que existe en el modelo */}
              <dl className="border-border mt-12 grid grid-cols-1 gap-5 border-t pt-6 sm:grid-cols-3">
                {collection ? (
                  <div>
                    <dt className="text-eyebrow text-secondary uppercase">
                      Collection
                    </dt>
                    <dd className="mt-2 text-sm">
                      <Link
                        href={`/colecciones/${collection.slug}`}
                        className="text-foreground hover:text-accent border-border-secondary hover:border-accent border-b pb-0.5 transition-colors duration-300"
                      >
                        {collection.name}
                      </Link>
                    </dd>
                  </div>
                ) : null}

                <div>
                  <dt className="text-eyebrow text-secondary uppercase">
                    Category
                  </dt>
                  <dd className="text-foreground mt-2 text-sm">
                    {product.category}
                  </dd>
                </div>

                <div>
                  <dt className="text-eyebrow text-secondary uppercase">
                    Design
                  </dt>
                  <dd className="text-foreground mt-2 text-sm">
                    {product.design}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* STORY / CONTEXTO DE COLECCÓN                                       */}
        {/* ------------------------------------------------------------------ */}
        <section
          className="px-6 pb-18 sm:px-10 lg:px-14"
          aria-labelledby="story-title"
        >
          <div className="max-w-2xl">
            <p className="text-eyebrow text-accent flex items-center gap-3 uppercase">
              <span aria-hidden="true" className="bg-accent h-px w-10" />
              From the collection
            </p>

            <h2
              id="story-title"
              className="font-display mt-5 text-3xl uppercase sm:text-4xl"
            >
              {collection ? `From ${collection.name}` : "From the collection"}
            </h2>

            <p className="text-muted mt-5 max-w-2xl text-base/relaxed leading-relaxed">
              {product.story}
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* RELACIONADOS                                                        */}
        {/* ------------------------------------------------------------------ */}
        {related.length > 0 ? (
          <ProductRail
            id="more-from-this-world"
            eyebrow={collection ? collection.name : "ANDORPETS"}
            title="More from this world"
            description={collection
              ? `Más piezas del mismo universo. El mundo de ${collection.name} sigue creciendo con cada drop.`
              : "Más piezas de este universo."}
            items={related}
          />
        ) : null}
      </main>
    </>
  );
}

