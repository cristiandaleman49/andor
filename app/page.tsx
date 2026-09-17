import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";

/* Home de ANDORPETS. Fase 2: navegación + hero.
   Las siguientes secciones (colecciones, drops, editorial) llegan después. */
export default function Home() {
  return (
    <>
      <Header />

      <main className="flex flex-1 flex-col">
        <Hero />
      </main>
    </>
  );
}
