"use client";

import { useEffect, useState } from "react";
import { cadenaIntegra, custodioActual, eventosDe } from "@/lib/ledger";
import { useLedger } from "@/components/LedgerProvider";

export default function Historial() {
  const { estado } = useLedger();
  const [sel, setSel] = useState("");
  const [integra, setIntegra] = useState<boolean | null>(null);

  const id = sel || estado.evidencias[0]?.id || "";
  const evidencia = estado.evidencias.find((e) => e.id === id);
  const eventos = id ? eventosDe(estado, id) : [];

  useEffect(() => {
    let vivo = true;
    setIntegra(null);
    if (eventos.length) cadenaIntegra(eventos).then((r) => vivo && setIntegra(r));
    return () => {
      vivo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, estado]);

  return (
    <>
      <h1>Historial de custodia</h1>
      <p className="sub">
        Paso 3 del flujo. Cada evento guarda el hash del anterior; si alguien cambia uno, la cadena
        deja de coincidir.
      </p>
      {!evidencia ? (
        <div className="tarjeta vacio">
          No hay evidencias. Registra una o carga los datos de ejemplo desde Inicio.
        </div>
      ) : (
        <>
          <div className="tarjeta">
            <label className="campo">
              Evidencia
              <select value={id} onChange={(e) => setSel(e.target.value)}>
                {estado.evidencias.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.id} — {ev.nombre}
                  </option>
                ))}
              </select>
            </label>
            <div>
              <strong>{evidencia.nombre}</strong> · {evidencia.archivo} · {evidencia.tamano} bytes
            </div>
            <div className="hash">SHA-256: {evidencia.hash}</div>
            <p>
              Custodio actual: <strong>{custodioActual(estado, id)}</strong>
            </p>
            {integra === null ? null : integra ? (
              <div className="aviso ok">Cadena íntegra: todos los eventos coinciden con su hash.</div>
            ) : (
              <div className="aviso mal">¡Cadena alterada! Algún evento no coincide con su hash.</div>
            )}
          </div>
          <div className="tarjeta">
            <ol className="linea">
              {eventos.map((e) => (
                <li key={e.id}>
                  <span className="etiqueta">{e.tipo === "REGISTRO" ? "Registro" : "Transferencia"}</span>
                  {e.de ? `${e.de} → ${e.a}` : e.a}
                  <div>{e.nota}</div>
                  <div className="vacio">{new Date(e.fecha).toLocaleString("es-CO")}</div>
                  <div className="hash">hash: {e.hash}</div>
                  <div className="hash">anterior: {e.prevHash}</div>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </>
  );
}
