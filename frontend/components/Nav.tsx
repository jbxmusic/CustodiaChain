"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ACTORES, Actor } from "@/lib/ledger";
import { useLedger } from "./LedgerProvider";

const LINKS = [
  { href: "/", texto: "Inicio" },
  { href: "/registrar", texto: "Registrar evidencia" },
  { href: "/transferir", texto: "Transferir custodia" },
  { href: "/historial", texto: "Historial" },
  { href: "/verificar", texto: "Verificar integridad" },
];

export default function Nav() {
  const ruta = usePathname();
  const { actor, setActor } = useLedger();
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="marca">
          CustodiaChain
        </Link>
        <nav aria-label="Principal">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={ruta === l.href ? "activo" : undefined}
            >
              {l.texto}
            </Link>
          ))}
        </nav>
        <label className="actor">
          <span>Actuando como</span>
          <select value={actor} onChange={(e) => setActor(e.target.value as Actor)}>
            {ACTORES.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
      </div>
    </header>
  );
}
