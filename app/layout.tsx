import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";

import "./globals.css";

/* Tipografía de marca: Syne (display editorial) + Inter (lectura y UI) */
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ANDORPETS — Pets Have Culture.",
    template: "%s — ANDORPETS",
  },
  description:
    "ANDORPETS diseña accesorios para perros con identidad propia: dirección editorial, cultura pop y detalles precisos para perros con carácter.",
  applicationName: "ANDORPETS",
  keywords: [
    "ANDORPETS",
    "accesorios para perros",
    "pet lifestyle",
    "cultura pop",
    "diseño",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "ANDORPETS",
    title: "ANDORPETS — Pets Have Culture.",
    description:
      "Accesorios para perros con identidad propia: dirección editorial, cultura pop y detalles precisos.",
  },
};

export const viewport: Viewport = {
  themeColor: "#070709",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
