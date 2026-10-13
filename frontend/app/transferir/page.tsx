"use client";

import { useState } from "react";
import { ACTORES, Actor, custodioActual } from "@/lib/ledger";
import { useLedger } from "@/components/LedgerProvider";

export default function Transferir() {
  const { estado, actor, transferir } = useLedger();
  const [evidenciaId, setEvidenciaId] = useState("");
  const [destino, setDestino] = useState<Actor>(ACTORES[1]);
  const [nota, setNota] = useState("");
  const [msg, setMsg] = useState<{ tipo: "ok" | "mal"; texto: string } | null>(null);

  const idSel = evidenciaId || estado.evidencias[0]?.id || "";
  const actual = idSel ? custodioActual(estado, idSel) : null;

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!idSel) return;
    const r = await transferir(idSel, destino, nota.trim());
    if (r.ok) {
      setMsg({ tipo: "ok", texto: `Custodia transferida a ${destino}.` });
      setNota("");
    } else {
      setMsg({ tipo: "mal", texto: r.error });
    }
  }

  return (
    <>
      <h1>Transferir custodia</h1>
      <p className="sub">
        Paso 2 del flujo. Solo el custodio actual puede pasar la evidencia a otro responsable. Cambia
        «Actuando como» para probar la regla.
      </p>
      {estado.evidencias.length === 0 ? (
        <div className="tarjeta vacio">
          No hay evidencias. Registra una o carga los datos de ejemplo desde Inicio.
        </div>
      ) : (
        <form className="tarjeta" onSubmit={enviar}>
          <label className="campo">
            Evidencia
            <select value={idSel} onChange={(e) => setEvidenciaId(e.target.value)}>
              {estado.evidencias.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.id} — {ev.nombre}
                </option>
              ))}
            </select>
          </label>
          <p>
            Custodio actual: <strong>{actual}</strong> · Estás actuando como: <strong>{actor}</strong>
          </p>
          <label className="campo">
            Transferir a
            <select value={destino} onChange={(e) => setDestino(e.target.value as Actor)}>
              {ACTORES.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>
          <label className="campo">
            Nota del traspaso <small>Motivo, sello o referencia (opcional)</small>
            <textarea value={nota} onChange={(e) => setNota(e.target.value)} />
          </label>
          <div className="acciones">
            <button type="submit">Transferir custodia</button>
          </div>
          {msg && <div className={`aviso ${msg.tipo}`}>{msg.texto}</div>}
        </form>
      )}
    </>
  );
}
