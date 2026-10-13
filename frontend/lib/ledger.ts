// Libro de custodia SIMULADO (semana 3).
// Guarda los datos en el navegador (localStorage). No usa Stellar todavía:
// la conexión con testnet y contratos se hace en la semana 4.

export const ACTORES = [
  "Perito recolector",
  "Custodio / almacén",
  "Analista forense",
  "Fiscalía",
  "Juez",
] as const;

export type Actor = (typeof ACTORES)[number];

export type Evidencia = {
  id: string;
  nombre: string;
  descripcion: string;
  archivo: string;
  tamano: number;
  hash: string; // SHA-256 del archivo
  registradaPor: Actor;
  fecha: string;
};

export type Evento = {
  id: string;
  evidenciaId: string;
  tipo: "REGISTRO" | "TRANSFERENCIA";
  de: Actor | null;
  a: Actor;
  nota: string;
  fecha: string;
  prevHash: string; // hash del evento anterior ("GENESIS" si es el primero)
  hash: string; // hash de este evento (encadena con prevHash)
};

export type Estado = {
  evidencias: Evidencia[];
  eventos: Evento[];
};

export const ESTADO_VACIO: Estado = { evidencias: [], eventos: [] };

const CLAVE = "custodiachain.v1";

export function cargar(): Estado {
  try {
    const raw = localStorage.getItem(CLAVE);
    if (!raw) return ESTADO_VACIO;
    return JSON.parse(raw) as Estado;
  } catch {
    return ESTADO_VACIO;
  }
}

export function guardar(estado: Estado) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
  } catch {
    /* sin almacenamiento: la app sigue funcionando en memoria */
  }
}

export async function sha256Texto(texto: string): Promise<string> {
  const datos = new TextEncoder().encode(texto);
  return aHex(await crypto.subtle.digest("SHA-256", datos));
}

export async function sha256Archivo(archivo: File): Promise<string> {
  return aHex(await crypto.subtle.digest("SHA-256", await archivo.arrayBuffer()));
}

function aHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function nuevoId(prefijo: string): string {
  return `${prefijo}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export async function hashEvento(
  e: Omit<Evento, "hash">
): Promise<string> {
  return sha256Texto(
    [e.id, e.evidenciaId, e.tipo, e.de ?? "", e.a, e.nota, e.fecha, e.prevHash].join("|")
  );
}

export function eventosDe(estado: Estado, evidenciaId: string): Evento[] {
  return estado.eventos.filter((e) => e.evidenciaId === evidenciaId);
}

export function custodioActual(estado: Estado, evidenciaId: string): Actor | null {
  const ev = eventosDe(estado, evidenciaId);
  return ev.length ? ev[ev.length - 1].a : null;
}

// Recalcula la cadena y dice si algún evento fue alterado.
export async function cadenaIntegra(eventos: Evento[]): Promise<boolean> {
  let previo = "GENESIS";
  for (const e of eventos) {
    if (e.prevHash !== previo) return false;
    const { hash, ...resto } = e;
    if ((await hashEvento(resto)) !== hash) return false;
    previo = e.hash;
  }
  return true;
}
