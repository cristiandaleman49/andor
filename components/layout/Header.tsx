import Link from "next/link";

/* Navegación principal de ANDORPETS.
   Server Component: hoy no necesita estado ni interacción.
   Los enlaces apuntan a anclas de la home porque las secciones reales
   (explore, collections, about) llegarán en fases posteriores: así no se
   crean rutas inexistentes ni enlaces que devuelvan 404. */
const navigation = [
  { label: "Explore", href: "/#explore" },
  { label: "Collections", href: "/#collections" },
  { label: "About", href: "/#about" },
] as const;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-3 px-6 sm:gap-6 sm:px-10 lg:px-14">
        {/* Logotipo tipográfico. El único rojo del logo es el punto de marca */}
        <Link
          href="/"
          aria-label="ANDORPETS — Inicio"
          className="group -my-2 inline-flex items-baseline gap-1.5 py-2"
        >
          {/* El nombre completo es más largo que "ANDOR": en móvil el
              logotipo baja a text-lg para que quepa junto a MENU y CART */}
          <span className="font-display text-lg leading-none font-bold tracking-[-0.01em] uppercase sm:text-2xl">
            AndorPets
          </span>
          <span
            aria-hidden="true"
            className="bg-accent size-1.5 rounded-[1px] transition-transform duration-300 ease-[var(--ease-brand)] group-hover:scale-125"
          />
        </Link>

        {/* Navegación de escritorio */}
        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex items-center gap-9 lg:gap-12">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-eyebrow text-muted hover:text-foreground group relative inline-flex py-3 uppercase transition-colors duration-300"
                >
                  {item.label}
                  {/* Indicador rojo: aparece al pasar el ratón o al enfocar */}
                  <span
                    aria-hidden="true"
                    className="bg-accent absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Acciones. El menú desplegable móvil llega en una fase posterior */}
        <div className="flex items-center gap-4 sm:gap-8">
          <button
            type="button"
            aria-label="Abrir menú de navegación"
            className="text-eyebrow text-muted hover:text-foreground py-3.5 uppercase transition-colors duration-300 md:hidden"
          >
            Menu
          </button>

          <button
            type="button"
            aria-label="Ver carrito"
            className="text-eyebrow text-foreground border-border hover:border-border-strong hover:bg-surface inline-flex items-center rounded-full border px-3.5 py-2.5 uppercase transition-colors duration-300 sm:px-5"
          >
            Cart
          </button>
        </div>
      </div>
    </header>
  );
}
