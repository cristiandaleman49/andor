import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import AddToBagButton from "@/components/cart/AddToBagButton";
import { ArtVisual } from "@/components/ui/ArtVisual";
import { getCollection } from "@/lib/data/collections";
import { getProduct, products } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";

/* -----------------------------------------------------------------------------
   Detalle de producto
   -----------------------------------------------------------------------------
   La ficha mínima de una pieza: visual grande a un lado, la información al
   otro. El CTA "Add to bag" es una isla client que alimenta la bag; la página
   sigue siendo un Server Component.

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

            {/* CTA: isla client. Añade a la bag y abre el drawer; el botón se
                desactiva un instante para evitar dobles agregados */}
            <AddToBagButton slug={product.slug} />
          </div>
        </div>
      </main>
    </>
  );
}