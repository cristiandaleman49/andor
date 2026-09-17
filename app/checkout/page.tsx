import Link from "next/link";
import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import OpenBagButton from "@/components/cart/OpenBagButton";

/* -----------------------------------------------------------------------------
   Checkout
   -----------------------------------------------------------------------------
   Placeholder explícito: todavía no hay pagos, formularios ni backend. Solo
   el mensaje "Checkout coming soon." y la vuelta a la bag, que se abre desde
   cualquier ruta porque el provider vive en el layout raíz.
   -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <>
      <Header />

      <main className="bg-cinema flex flex-1 flex-col justify-center px-6 py-20 sm:px-10 lg:px-14">
        <div className="max-w-2xl">
          <p className="text-eyebrow text-accent flex items-center gap-3 uppercase">
            <span aria-hidden="true" className="bg-accent h-px w-10" />
            Bag
          </p>

          <h1 className="font-display text-display mt-7 uppercase">
            Checkout
          </h1>

          <p className="text-muted mt-7 max-w-md text-lg/relaxed">
            Checkout coming soon.
          </p>

          <p className="text-muted max-w-md text-sm/relaxed">
            Todavía no hay pagos ni formularios: tu selección queda guardada en
            la bag mientras exploras los universos.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
            <OpenBagButton />

            <Link
              href="/#collections"
              className="text-muted hover:text-foreground group relative inline-flex items-center gap-3 py-2 text-sm font-medium tracking-[0.18em] uppercase transition-colors duration-300"
            >
              Explorar colecciones
              <span
                aria-hidden="true"
                className="bg-border absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}