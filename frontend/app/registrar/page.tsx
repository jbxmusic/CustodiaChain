"use client";

import { useState } from "react";
import Link from "next/link";
import { sha256Archivo } from "@/lib/ledger";
import { useLedger } from "@/components/LedgerProvider";

export default function Registrar() {
  const { registrar, actor } = useLedger();
  const [archivo, setArchivo] = useState<File | null>(null);
  const [hash, setHash] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [msg, setMsg] = useState<{ tipo: "ok" | "mal"; texto: string } | null>(null);
  const [ocupado, setOcupado] = useState(false);

  async function alElegir(f: File | null) {
    setArchivo(f);
    setHash("");
    setMsg(null);
    if (f) {
      setHash(await sha256Archivo(f));
      if (!nombre) setNombre(f.name);
    }
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!archivo || !hash) return;
    setOcupado(true);
    const r = await registrar({
      nombre: nombre.trim() || archivo.name,
      descripcion: descripcion.trim(),
      archivo: archivo.name,
      tamano: archivo.size,
      hash,
    });
    setOcupado(false);
    if (r.ok) {
      setMsg({ tipo: "ok", texto: `Evidencia registrada con id ${r.id}. Custodio inicial: ${actor}.` });
      setArchivo(null);
      setHash("");
      setNombre("");
      setDescripcion("");
      const input = document.getElementById("archivo") as HTMLInputElement | null;
      if (input) input.value = "";
    } else {
      setMsg({ tipo: "mal", texto: r.error });
    }
  }

  return (
    <>
      <h1>Registrar evidencia</h1>
      <p className="sub">
        Paso 1 del flujo. Se calcula la huella (hash SHA-256) del archivo en tu navegador; el archivo
        no sale de tu equipo.
      </p>
      <form className="tarjeta" onSubmit={enviar}>
        <label className="campo">
          Archivo de evidencia
          <input id="archivo" type="file" onChange={(e) => alElegir(e.target.files?.[0] ?? null)} />
        </label>
        {hash && (
          <div className="aviso info">
            Hash SHA-256 calculado:
            <div className="hash">{hash}</div>
          </div>
        )}
        <label className="campo">
          Nombre de la evidencia
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <label className="campo">
          Descripción <small>Dónde y cómo se recolectó (opcional)</small>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </label>
        <p className="vacio">Se registrará como: <strong>{actor}</strong> (primer custodio).</p>
        <div className="acciones">
          <button type="submit" disabled={!archivo || !hash || ocupado}>
            {ocupado ? "Registrando…" : "Registrar evidencia"}
          </button>
        </div>
        {msg && (
          <div className={`aviso ${msg.tipo}`}>
            {msg.texto} {msg.tipo === "ok" && <Link href="/historial">Ver historial</Link>}
          </div>
        )}
      </form>
    </>
  );
}
