# Historias de Usuario — Cadena de Custodia de Evidencia Forense Digital

Proyecto: cadena de custodia de evidencia digital forense (Stellar)

Ordenadas de mayor a menor prioridad.

---

## 1. Registro inicial de evidencia

**Como** perito forense,
**quiero** registrar la evidencia digital en el sistema en el momento de la recolección,
**para** dejar constancia inalterable de su origen y estado inicial.

> **Por qué esta prioridad:** Es la base de todo el sistema — sin este registro inicial no existe nada que verificar después. Es el punto de partida obligatorio.

---

## 2. Registro de transferencias de custodia

**Como** perito forense,
**quiero** que cada transferencia de custodia quede registrada automáticamente (quién entrega, quién recibe, cuándo),
**para** poder demostrar la cadena completa sin depender de registros en papel.

> **Por qué esta prioridad:** Es el núcleo del problema que resuelve el proyecto: sin esto, no hay "cadena" de custodia, solo un registro aislado.

---

## 3. Verificación independiente de integridad

**Como** auditor externo,
**quiero** verificar de forma independiente que el historial de custodia no ha sido alterado,
**para** validar la integridad del proceso sin depender de la palabra de los involucrados.

> **Por qué esta prioridad:** Es la razón de ser del proyecto frente al usuario: la verificación independiente es lo que diferencia esta solución de un registro tradicional.

---

## 4. Consulta del historial completo

**Como** fiscalía / área legal,
**quiero** consultar el historial completo de una evidencia específica,
**para** presentarlo como prueba verificable ante un juez.

> **Por qué esta prioridad:** Es el caso de uso que justifica el valor del proyecto ante el usuario final no técnico; sin consulta, el registro no sirve en juicio.

---

## 5. Gestión de permisos de acceso

**Como** administrador del sistema,
**quiero** gestionar quién tiene permiso para registrar o transferir evidencia,
**para** evitar que personas no autorizadas manipulen el registro.

> **Por qué esta prioridad:** Importante para la seguridad del sistema, pero depende de que ya existan las historias 1 y 2 funcionando.

---

## 6. Exportación de reportes

**Como** auditor externo,
**quiero** generar un reporte exportable del historial de una evidencia,
**para** adjuntarlo como anexo documental en un proceso judicial.

> **Por qué esta prioridad:** Valor agregado sobre la consulta (historia 4); mejora la experiencia pero no es indispensable para el MVP.

---

## 7. Alertas de manipulación

**Como** perito forense,
**quiero** recibir una alerta si se intenta registrar una transferencia fuera del protocolo esperado,
**para** detectar intentos de manipulación a tiempo.

> **Por qué esta prioridad:** Es una mejora de seguridad proactiva, útil pero no crítica para demostrar el funcionamiento central en un entregable académico.

---

## Lógica general del orden

1. **Historias 1-2:** lo que hace *existir* el registro.
2. **Historias 3-4:** lo que lo hace *confiable y útil* frente a los usuarios reales.
3. **Historias 5-7:** lo que lo hace *más robusto o cómodo* de operar.

Así, si el tiempo se acorta, las primeras 4 historias ya cubren un MVP defendible.
