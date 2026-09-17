/* Página temporal de la Fase 1: sirve para verificar la identidad visual.
   Se reemplazará por la home real (descubrimiento, colecciones y drops). */

const foundations = [
  { label: "Paleta", value: "dark-first · verde ANDOR · rojo de contraste" },
  { label: "Tipografía", value: "Syne (display) + Inter (lectura y UI)" },
  { label: "Tokens", value: "Tailwind CSS v4 · @theme inline" },
];

export default function Home() {
  return (
    <main className="bg-cinema flex flex-1 items-center px-6 py-20 sm:px-10">
      <div className="mx-auto grid w-full max-w-5xl gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <section className="animate-rise">
          <p className="text-eyebrow text-accent uppercase">Andor</p>

          <h1 className="mt-6 font-display text-display-lg uppercase">
            Dogs have culture.
          </h1>

          <p className="mt-8 max-w-xl text-lg/relaxed text-muted">
            La base visual está lista: identidad dark-first, dirección editorial
            y tokens de marca preparados para construir descubrimiento,
            colecciones y drops.
          </p>
        </section>

        <section className="rounded-panel border border-border bg-surface/80 p-8 shadow-card">
          <p className="text-eyebrow text-subtle uppercase">Fundaciones</p>

          <dl className="mt-6 flex flex-col gap-5">
            {foundations.map((item) => (
              <div
                key={item.label}
                className="border-t border-border pt-5 first:border-t-0 first:pt-0"
              >
                <dt className="text-sm font-medium">{item.label}</dt>
                <dd className="mt-1 text-sm text-muted">{item.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 flex items-center gap-3 border-t border-border pt-6 text-xs text-subtle">
            <span className="size-3 rounded-full bg-accent" aria-hidden="true" />
            <span
              className="size-3 rounded-full bg-highlight"
              aria-hidden="true"
            />
            <span
              className="size-3 rounded-full bg-surface-raised ring-1 ring-border"
              aria-hidden="true"
            />
            <span>accent · highlight · surface</span>
          </p>
        </section>
      </div>
    </main>
  );
}