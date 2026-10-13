"use client";

import Link from "next/link";
import { custodioActual } from "@/lib/ledger";
import { useLedger } from "@/components/LedgerProvider";

export default function Inicio() {
  const { estado, cargarEjemplo, reiniciar, listo } = useLedger();
  const transferencias = estado.eventos.filter((e) => e.tipo === "TRANSFERENCIA").length;

  return (
    <>
      <h1>CustodiaChain</h1>
      <p className="sub">
        Cadena de custodia verificable de evidencia digital: demuestra que el archivo que se presenta
        es el mismo que se recolectó.
      </p>

      <div className="rejilla" style={{ marginBottom: 16 }}>
        <div className="tarjeta">
          <div className="cifra">{listo ? estado.evidencias.length : "–"}</div>
          Evidencias registradas
        </div>
        <div className="tarjeta">
          <div className="cifra">{listo ? transferencias : "–"}</div>
          Transferencias de custodia
        </div>
        <div className="tarjeta">
          <div className="cifra">{listo ? estado.eventos.length : "–"}</div>
          Eventos en el historial
        </div>
      </div>

      <div className="tarjeta">
        <strong>Flujo principal del MVP</strong>
        <ol>
          <li><Link href="/registrar">Registrar evidencia</Link>: el perito sube el archivo y se guarda su huella (hash).</li>
          <li><Link href="/transferir">Transferir custodia</Link>: solo el custodio actual puede pasarla a otro responsable.</li>
          <li><Link href="/historial">Consultar el historial</Link>: fiscalía ve cada traspaso encadenado.</li>
          <li><Link href="/verificar">Verificar integridad</Link>: un tercero comprueba que el archivo no cambió.</li>
        </ol>
        <p className="vacio">
          Usa el selector «Actuando como» (arriba a la derecha) para simular a cada participante.
        </p>
        <div className="acciones">
          <button onClick={cargarEjemplo}>Cargar datos de ejemplo</button>
          <button className="sec" onClick={reiniciar}>Borrar todos los datos</button>
        </div>
      </div>

      {estado.evidencias.length > 0 && (
        <div className="tarjeta">
          <strong>Evidencias</strong>
          <ul>
            {estado.evidencias.map((e) => (
              <li key={e.id}>
                {e.nombre} <span className="etiqueta">{e.id}</span> — custodio actual:{" "}
                <strong>{custodioActual(estado, e.id)}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
