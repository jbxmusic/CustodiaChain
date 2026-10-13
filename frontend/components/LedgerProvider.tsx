"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  ACTORES,
  Actor,
  Estado,
  ESTADO_VACIO,
  Evento,
  Evidencia,
  cargar,
  custodioActual,
  guardar,
  hashEvento,
  nuevoId,
  sha256Texto,
} from "@/lib/ledger";

type Resultado = { ok: true; id: string } | { ok: false; error: string };

type Ctx = {
  listo: boolean;
  estado: Estado;
  actor: Actor;
  setActor: (a: Actor) => void;
  registrar: (d: {
    nombre: string;
    descripcion: string;
    archivo: string;
    tamano: number;
    hash: string;
  }) => Promise<Resultado>;
  transferir: (evidenciaId: string, a: Actor, nota: string) => Promise<Resultado>;
  cargarEjemplo: () => Promise<void>;
  reiniciar: () => void;
};

const LedgerContext = createContext<Ctx | null>(null);

export function useLedger(): Ctx {
  const c = useContext(LedgerContext);
  if (!c) throw new Error("useLedger debe usarse dentro de LedgerProvider");
  return c;
}

export function LedgerProvider({ children }: { children: React.ReactNode }) {
  const [estado, setEstado] = useState<Estado>(ESTADO_VACIO);
  const [actor, setActorState] = useState<Actor>(ACTORES[0]);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    setEstado(cargar());
    try {
      const a = localStorage.getItem("custodiachain.actor") as Actor | null;
      if (a && (ACTORES as readonly string[]).includes(a)) setActorState(a);
    } catch {}
    setListo(true);
  }, []);

  const aplicar = useCallback((nuevo: Estado) => {
    setEstado(nuevo);
    guardar(nuevo);
  }, []);

  const setActor = (a: Actor) => {
    setActorState(a);
    try {
      localStorage.setItem("custodiachain.actor", a);
    } catch {}
  };

  const registrar: Ctx["registrar"] = async (d) => {
    if (estado.evidencias.some((e) => e.hash === d.hash)) {
      return { ok: false, error: "Ya existe una evidencia registrada con ese mismo archivo (mismo hash)." };
    }
    const fecha = new Date().toISOString();
    const evidencia: Evidencia = {
      id: nuevoId("EV"),
      nombre: d.nombre,
      descripcion: d.descripcion,
      archivo: d.archivo,
      tamano: d.tamano,
      hash: d.hash,
      registradaPor: actor,
      fecha,
    };
    const base: Omit<Evento, "hash"> = {
      id: nuevoId("EVT"),
      evidenciaId: evidencia.id,
      tipo: "REGISTRO",
      de: null,
      a: actor,
      nota: `Recolección y registro del archivo ${d.archivo}`,
      fecha,
      prevHash: "GENESIS",
    };
    const evento: Evento = { ...base, hash: await hashEvento(base) };
    aplicar({
      evidencias: [...estado.evidencias, evidencia],
      eventos: [...estado.eventos, evento],
    });
    return { ok: true, id: evidencia.id };
  };

  const transferir: Ctx["transferir"] = async (evidenciaId, a, nota) => {
    const actual = custodioActual(estado, evidenciaId);
    if (!actual) return { ok: false, error: "La evidencia no existe." };
    // Regla del Blueprint: solo el custodio actual puede transferir.
    if (actual !== actor) {
      return {
        ok: false,
        error: `Solo el custodio actual (${actual}) puede transferirla. Estás actuando como: ${actor}.`,
      };
    }
    if (a === actual) return { ok: false, error: "El destino debe ser distinto del custodio actual." };
    const previos = estado.eventos.filter((e) => e.evidenciaId === evidenciaId);
    const base: Omit<Evento, "hash"> = {
      id: nuevoId("EVT"),
      evidenciaId,
      tipo: "TRANSFERENCIA",
      de: actual,
      a,
      nota: nota || "Traspaso de custodia",
      fecha: new Date().toISOString(),
      prevHash: previos[previos.length - 1].hash,
    };
    const evento: Evento = { ...base, hash: await hashEvento(base) };
    aplicar({ ...estado, eventos: [...estado.eventos, evento] });
    return { ok: true, id: evento.id };
  };

  const cargarEjemplo = async () => {
    const contenido = "contenido-de-ejemplo-disco-001";
    const hash = await sha256Texto(contenido);
    const fecha0 = new Date(Date.now() - 3 * 3600_000).toISOString();
    const ev: Evidencia = {
      id: "EV-DEMO01",
      nombre: "Imagen forense disco 001 (ejemplo)",
      descripcion: "Registro de ejemplo para la demostración.",
      archivo: "disco001.img",
      tamano: contenido.length,
      hash,
      registradaPor: "Perito recolector",
      fecha: fecha0,
    };
    const pasos: { de: Actor | null; a: Actor; tipo: Evento["tipo"]; nota: string; h: number }[] = [
      { de: null, a: "Perito recolector", tipo: "REGISTRO", nota: "Recolección en la escena", h: 3 },
      { de: "Perito recolector", a: "Custodio / almacén", tipo: "TRANSFERENCIA", nota: "Ingreso al almacén", h: 2 },
      { de: "Custodio / almacén", a: "Analista forense", tipo: "TRANSFERENCIA", nota: "Entrega para análisis", h: 1 },
    ];
    const eventos: Evento[] = [];
    let prev = "GENESIS";
    for (const p of pasos) {
      const base: Omit<Evento, "hash"> = {
        id: nuevoId("EVT"),
        evidenciaId: ev.id,
        tipo: p.tipo,
        de: p.de,
        a: p.a,
        nota: p.nota,
        fecha: new Date(Date.now() - p.h * 3600_000).toISOString(),
        prevHash: prev,
      };
      const e: Evento = { ...base, hash: await hashEvento(base) };
      eventos.push(e);
      prev = e.hash;
    }
    aplicar({ evidencias: [ev], eventos });
  };

  const reiniciar = () => aplicar(ESTADO_VACIO);

  return (
    <LedgerContext.Provider
      value={{ listo, estado, actor, setActor, registrar, transferir, cargarEjemplo, reiniciar }}
    >
      {children}
    </LedgerContext.Provider>
  );
}
