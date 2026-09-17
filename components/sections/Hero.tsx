import Link from "next/link";

/* Marcas de encuadre dentro del marco reservado a la fotografía.
   Azul secundario: detalle técnico, nunca protagonista. */
const frameMarks = [
  "top-4 left-4 border-t border-l",
  "top-4 right-4 border-t border-r",
  "bottom-4 left-4 border-b border-l",
  "bottom-4 right-4 border-b border-r",
] as const;

export default function Hero() {
  return (
    <section className="bg-cinema relative isolate flex min-h-[calc(100svh_-_5rem)] items-center px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
      <div className="grid w-full items-center gap-14 sm:gap-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        {/* Bloque editorial */}
        <div className="max-w-xl">
          <p className="animate-rise text-eyebrow text-accent flex items-center gap-3 uppercase">
            <span aria-hidden="true" className="bg-accent h-px w-10" />
            AndorPets
          </p>

          {/* Escala de tokens de marca: display en móvil, display-lg cuando el
              titular tiene el ancho completo y display en la composición a dos
              columnas (así nunca desborda la columna) */}
          <h1 className="animate-rise font-display text-display sm:text-display-lg mt-7 uppercase [animation-delay:120ms] lg:text-display">
            <span className="block">Pets have</span>
            <span className="block">culture.</span>
          </h1>

          <p className="animate-rise text-muted mt-7 max-w-md text-lg/relaxed [animation-delay:240ms]">
            Discover your dog&apos;s universe.
          </p>

          <div className="animate-rise mt-10 [animation-delay:360ms]">
            {/* CTA: bloque de rojo marca con tinta oscura (4.76:1 sobre el
                fondo rojo). Al pasar el ratón sube a rojo intenso + halo */}
            <Link
              href="/#collections"
              className="bg-accent text-background hover:bg-accent-strong hover:shadow-glow ease-[var(--ease-brand)] group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-medium tracking-[0.18em] uppercase transition duration-300 sm:px-8"
            >
              Explore collections
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="ease-[var(--ease-brand)] size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M1 8h13M9.5 3.5 14 8l-4.5 4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Protagonista visual: marco reservado para la fotografía
            principal del Border Collie. Todavía sin imagen: la composición
            funciona con luz, silueta abstracta, rejilla y marcas técnicas. */}
        <figure className="border-border bg-surface-gradient shadow-elevated relative isolate aspect-[4/5] w-full overflow-hidden rounded-panel border sm:aspect-[16/10] lg:aspect-auto lg:-mr-14 lg:h-[min(38rem,62svh)] lg:rounded-r-none">
          {/* Rejilla técnica apenas visible: se apaga hacia los bordes */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[repeating-linear-gradient(to_right,var(--border)_0_1px,transparent_1px_72px),repeating-linear-gradient(to_bottom,var(--border)_0_1px,transparent_1px_72px)] [mask-image:radial-gradient(120%_95%_at_50%_10%,#000_0%,transparent_78%)]"
          />

          {/* Marca de agua editorial. "ANDORPETS" tiene más glifos que la
              marca anterior, así que la escala se ajustó al ancho del marco
              para que se lea completa, sin recortes, en todos los breakpoints */}
          <span
            aria-hidden="true"
            className="font-display text-foreground/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[11vw] leading-none font-bold uppercase lg:text-[4.9vw]"
          >
            AndorPets
          </span>

          {/* Luz de estudio: rojo de marca, muy contenido */}
          <span
            aria-hidden="true"
            className="bg-[radial-gradient(circle,var(--accent-tint-16)_0%,transparent_68%)] absolute -top-24 -left-24 size-[26rem] rounded-full blur-3xl"
          />

          {/* Silueta del sujeto: masa oscura con luz de contra */}
          <span
            aria-hidden="true"
            className="bg-[linear-gradient(165deg,var(--andor-ink-700)_0%,var(--andor-ink-900)_46%,var(--andor-black)_100%)] absolute bottom-[-18%] left-1/2 h-[74%] w-[76%] -translate-x-1/2 rounded-[48%_52%_44%_56%]"
          />
          <span
            aria-hidden="true"
            className="bg-[radial-gradient(circle,var(--accent-tint-16)_0%,transparent_70%)] absolute bottom-[42%] left-[16%] size-40 rounded-full blur-2xl"
          />

          {/* Encuadre técnico en azul secundario */}
          <span
            aria-hidden="true"
            className="bg-border-secondary absolute inset-x-0 top-0 h-px"
          />
          {frameMarks.map((position) => (
            <span
              key={position}
              aria-hidden="true"
              className={`border-border-secondary absolute size-3 ${position}`}
            />
          ))}

          <figcaption className="absolute bottom-6 left-6 max-w-[24ch] sm:bottom-7 sm:left-8">
            <p className="text-eyebrow text-secondary uppercase">Border collie</p>
            <p className="text-muted mt-2 text-xs/relaxed">
              Fotografía principal · próximamente
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
