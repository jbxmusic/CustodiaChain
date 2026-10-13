import type { Metadata } from "next";
import "./globals.css";
import { LedgerProvider } from "@/components/LedgerProvider";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "CustodiaChain",
  description: "Cadena de custodia verificable de evidencia digital (prototipo de interfaz)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <LedgerProvider>
          <Nav />
          <main className="contenedor">{children}</main>
          <footer className="pie">
            Prototipo de interfaz (semana 3). Los datos son simulados y viven solo en este navegador;
            la conexión con Stellar testnet se implementa en la semana 4.
          </footer>
        </LedgerProvider>
      </body>
    </html>
  );
}
