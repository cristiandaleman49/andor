import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import { ArtVisual } from "@/components/ui/ArtVisual";
import { getCollection } from "@/lib/data/collections";
import { getProduct, products } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";

/* -----------------------------------------------------------------------------
   Detalle de producto
   -----------------------------------------------------------------------------
   La ficha mínima de una pieza: visual grande a un lado, la información al
   otro. Suficientemente realista para validar la experiencia, sin ecommerce:
   el CTA "Add to bag" es un gesto visual que todavía no lleva a ningún sitio
   (sin carrito, sin checkout), y así se indica debajo del propio botón.

   Server Component. Los slugs mock se prerenderizan en el build; uno
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

  return (
    <>
      <Header />

      <main className="bg-cinema flex flex-1 flex-col px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Visual protagonista. Mismo lenguaje CSS que las cards: cuando
              exista fotografía del producto se sustituye en ArtVisual. */}
          <div className="border-border bg-surface-gradient shadow-card relative aspect-[4/5] w-full overflow-hidden rounded-panel border">
            <div aria-hidden="true" className="absolute inset-0">
              <ArtVisual variant={product.visualVariant} />
            </div>
          </div>

          {/* Información de la pieza */}
          <div className="flex flex-col">
            <p className="text-eyebrow text-secondary uppercase">
              {product.category}
            </p>

            <h1 className="font-display mt-5 text-4xl leading-[1.02] font-bold uppercase sm:text-5xl">
              {product.name}
            </h1>

            {/* La pieza vive en un universo: enlace real de vuelta */}
            {collection ? (
              <Link
                href={`/colecciones/${collection.slug}`}
                className="text-muted group mt-6 inline-flex w-fit items-center gap-2 text-sm/relaxed transition-colors duration-300 hover:text-foreground"
              >
                De la colección{" "}
                <span className="border-border-secondary group-hover:border-secondary border-b pb-0.5">
                  {collection.name}
                </span>
                <span
                  aria-hidden="true"
                  className="ease-[var(--ease-brand)] transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ) : null}

            <p className="text-muted mt-8 max-w-md text-lg/relaxed">
              {product.description}
            </p>

            {/* Precio claro y legible, sin protagonismo comercial */}
            <p className="text-foreground mt-10 text-2xl font-semibold tabular-nums">
              {formatPrice(product.price)}
            </p>

            {/* CTA visual de esta fase: sin carrito detrás todavía */}
            <button
              type="button"
              className="bg-foreground text-background hover:bg-accent focus-visible:outline-foreground mt-8 w-full rounded-card px-10 py-4 text-sm font-semibold tracking-[0.18em] uppercase transition-colors duration-300 ease-[var(--ease-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto sm:self-start"
            >
              Add to bag
            </button>
            <p className="text-subtle mt-4 text-xs/relaxed">
              El bag llega en la próxima fase: este gesto todavía no guarda nada.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}