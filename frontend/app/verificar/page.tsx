"use client";

import { useState } from "react";
import { sha256Archivo } from "@/lib/ledger";
import { useLedger } from "@/components/LedgerProvider";

type Resultado =
  | { tipo: "ok"; texto: string }
  | { tipo: "mal"; texto: string };

export default function Verificar() {
  const { estado } = useLedger();
  const [hash, setHash] = useState("");
  const [nombre, setNombre] = useState("");
  const [res, setRes] = useState<Resultado | null>(null);

  async function alElegir(f: File | null) {
    setRes(null);
    setHash("");
    if (!f) return;
    const h = await sha256Archivo(f);
    setHash(h);
    setNombre(f.name);
    const coincide = estado.evidencias.find((e) => e.hash === h);
    if (coincide) {
      setRes({
        tipo: "ok",
        texto: `El archivo coincide con la evidencia ${coincide.id} («${coincide.nombre}»). No fue alterado desde su registro.`,
      });
    } else {
      setRes({
        tipo: "mal",
        texto:
          "El archivo NO coincide con ninguna evidencia registrada. Es otro archivo o fue modificado (basta cambiar un byte).",
      });
    }
  }

  return (
    <>
      <h1>Verificar integridad</h1>
      <p className="sub">
        Paso 4 del flujo. Cualquier tercero (auditor, defensa, juez) sube el archivo y se compara su
        hash con el registrado.
      </p>
      <div className="tarjeta">
        <label className="campo">
          Archivo a verificar
          <input type="file" onChange={(e) => alElegir(e.target.files?.[0] ?? null)} />
        </label>
        {hash && (
          <div className="aviso info">
            {nombre} — hash SHA-256:
            <div className="hash">{hash}</div>
          </div>
        )}
        {res && <div className={`aviso ${res.tipo}`}>{res.texto}</div>}
        {estado.evidencias.length === 0 && (
          <p className="vacio">Aún no hay evidencias registradas contra las cuales comparar.</p>
        )}
      </div>
    </>
  );
}
