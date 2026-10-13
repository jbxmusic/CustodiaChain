# Blueprint del Proyecto — Cadena de Custodia de Evidencia Forense Digital (CIECT Chain)

Proyecto académico de blockchain sobre Stellar. Caso de uso: cadena de custodia de evidencia digital forense, dirigido a peritos forenses, fiscalía/área legal y auditores externos.

---

## 1. Priorización de historias

De las 7 historias propuestas por el equipo, estas 5 pasan al backlog por cubrir el flujo mínimo que hace al sistema funcional y verificable de principio a fin:

1. Registro inicial de evidencia (perito forense)
2. Registro de transferencias de custodia (perito forense)
3. Verificación independiente de integridad (auditor externo)
4. Consulta del historial completo (fiscalía/área legal)
5. Gestión de permisos de acceso (administrador del sistema)

**Criterio de priorización:** se ordenaron según dependencia funcional, no solo importancia percibida. Las historias 1 y 2 son prerrequisito técnico de todas las demás —sin registro no hay nada que verificar ni consultar—. Las historias 3 y 4 son las que entregan el valor diferencial frente a un registro tradicional (verificación independiente, no basada en confianza). La historia 5 se incluyó porque sin control de acceso el registro pierde credibilidad legal, aunque es menos urgente que las anteriores. Quedan fuera del backlog —por ser mejoras sobre el MVP, no requisitos para demostrarlo— la exportación de reportes y las alertas de manipulación.

---

## 2. Propuesta de valor

Un perito forense, un fiscal o un auditor externo que manejan evidencia digital hoy dependen de registros en papel o bases de datos internas que cualquiera con acceso administrativo podría alterar sin dejar rastro. Cuando la defensa cuestiona la integridad de una prueba en juicio, la única respuesta disponible es la palabra de quien manipuló la evidencia —no hay manera de que un tercero lo verifique de forma independiente.

CIECT Chain resuelve esto registrando cada paso de la cadena de custodia (recolección, transferencias entre responsables, acceso) en una red donde ningún participante, ni siquiera el propio sistema que lo opera, puede reescribir el historial sin que quede evidencia de la alteración. El resultado para el usuario es poder demostrar, ante un juez o un auditor, que la evidencia presentada es exactamente la misma que se recolectó, sin tener que pedirle a nadie que "confíe" en el proceso interno.

La diferencia frente a cómo se resuelve hoy —hojas de control firmadas a mano, bases de datos relacionales con permisos de administrador, software de gestión documental genérico— es que ninguna de esas alternativas resiste la pregunta "¿y quién garantiza que esto no se modificó después?". CIECT Chain responde esa pregunta con una prueba técnica verificable por cualquier parte interesada, sin depender de la reputación o la buena fe de quien custodia la evidencia. Esto conecta directamente con el problema identificado en el Problem Brief: la falta de un mecanismo de verificación independiente es lo que pone en riesgo la validez de la prueba en un proceso judicial.

---

## 3. Flujo de usuario

1. **Recolección:** el perito forense recolecta la evidencia digital en la escena y la registra en el sistema (hash del archivo, metadatos, fecha/hora, responsable).
2. **Registro en Stellar:** el sistema crea una transacción en la red de Stellar que ancla esa información de forma inmutable, asociada a una cuenta que representa al perito.
3. **Transferencia de custodia:** cuando la evidencia pasa a otro responsable (laboratorio, otro perito, fiscalía), ambas partes firman una transacción de transferencia que queda enlazada a la anterior.
4. **Consulta (fiscalía/área legal):** en cualquier momento, el fiscal consulta el historial completo de una evidencia a través de la interfaz, que lee directamente de la red.
5. **Verificación (auditor externo):** el auditor, sin necesidad de pedir permiso a nadie del equipo forense, consulta la misma red de forma independiente y confirma que el historial no fue alterado.
6. **Presentación en juicio:** el fiscal presenta el historial verificado como respaldo de la validez de la prueba.

```
Perito forense → [registra evidencia] → Stellar (testnet)
                 → [transfiere custodia] → Stellar (testnet)
Fiscalía/Legal  → [consulta historial] → Interfaz → Stellar (lectura)
Auditor externo → [verifica integridad] → Interfaz/Explorador → Stellar (lectura)
```

Los puntos de interacción con la tecnología (firma de transacciones, verificación de hashes) quedan ocultos detrás de la interfaz: el usuario nunca necesita entender Stellar para operar el sistema.

---

## 4. Alcance del MVP

**Dentro del MVP (funcionalidad central):**
- Registro de evidencia en testnet (historia 1)
- Registro de transferencias de custodia (historia 2)
- Consulta del historial completo por evidencia (historia 4)
- Verificación de integridad accesible para un tercero (historia 3)

**Fuera del MVP (deseable, no crítico):**
- Gestión granular de permisos por rol (historia 5) — se simplifica a una lista fija de cuentas autorizadas conocidas de antemano, en vez de un panel de administración completo.
- Exportación de reportes en PDF/documento legal (historia 6)
- Alertas automáticas de intentos de manipulación (historia 7)

**Justificación del recorte:** el valor central del proyecto —demostrar que una evidencia no fue alterada entre quien la recolectó y quien la presenta en juicio— se entrega completamente con el registro, la transferencia y la verificación. Un panel de administración de permisos sofisticado, reportes exportables o alertas automáticas mejoran la experiencia de operación, pero no cambian la prueba de concepto: que el historial es verificable de forma independiente. Recortar estas funciones permite concentrar el tiempo de desarrollo en que el flujo central funcione de forma sólida en testnet antes de la fecha de entrega.

---

## 5. Lean Canvas

> Completar y adjuntar como imagen o enlace (ej. Canva, Miro, Google Slides) en el entregable final. Borrador de contenido por bloque:

| Bloque | Contenido |
|---|---|
| **Problema** | No hay forma de verificar de manera independiente que una evidencia digital forense no fue alterada entre su recolección y su presentación en juicio. |
| **Segmento de usuarios** | Peritos forenses, fiscalía/área legal, auditores externos de procesos judiciales. |
| **Propuesta de valor única** | Verificación de integridad de la cadena de custodia sin depender de la confianza en quien la custodia. |
| **Solución** | Registro de recolección y transferencias de evidencia en una red Stellar (testnet), con interfaz de consulta y verificación. |
| **Canales** | Integración directa con el flujo de trabajo del laboratorio forense / fiscalía; capacitación a peritos. |
| **Métricas clave** | N° de evidencias registradas, N° de transferencias registradas, N° de verificaciones realizadas por auditores. |
| **Ventaja diferencial** | Inmutabilidad verificable por terceros sin depender de un administrador de confianza. |
| **Estructura de costos e ingresos** | Costos: desarrollo, infraestructura de nodos/testnet, mantenimiento. Ingresos (modelo futuro): licenciamiento a entidades judiciales o laboratorios forenses por suscripción. |

---

## 6. Backlog priorizado (Kanban)

> Pendiente: crear el tablero en GitHub Projects con las 5 historias priorizadas, organizadas en columnas (ej. Por hacer / En progreso / Hecho) y criterios de aceptación por tarjeta.
>
> **Enlace al tablero:** _[pegar aquí el enlace una vez creado]_

---

## 7. Arquitectura inicial

El sistema se compone de tres capas:

1. **Interfaz de usuario:** aplicación web donde el perito registra evidencia y transferencias, y donde fiscalía/auditores consultan el historial. No expone términos técnicos de blockchain al usuario final.
2. **Lógica de aplicación:** capa intermedia (backend) que traduce las acciones del usuario (registrar, transferir, consultar) en transacciones hacia la red de Stellar, usando el SDK de Stellar y, opcionalmente, contratos Soroban para reglas más complejas de validación.
3. **Red Stellar (testnet):** punto donde la información queda anclada de forma inmutable. Cada registro y transferencia se traduce en una transacción firmada por la cuenta correspondiente (perito, laboratorio, etc.), y cualquier tercero puede consultar el historial directamente desde la red o un explorador (ej. StellarExpert) sin pasar por el backend de la aplicación.

```
[Interfaz web] → [Backend / lógica de negocio] → [Stellar SDK / Soroban] → [Red Stellar - Testnet]
                                                                                   ↑
                                                                  [Auditor externo consulta directo]
```

La red entra en juego en el momento exacto en que se confirma un registro o una transferencia: es ahí donde el dato deja de depender del backend de la aplicación y pasa a ser verificable de forma independiente.

---

## 8. Uso de Stellar y justificación

- **Cuentas Stellar:** cada actor relevante (perito, laboratorio, responsable de custodia) se representa como una cuenta en la red. Esto permite identificar sin ambigüedad quién realizó cada acción, requisito central del criterio de pertinencia del Problem Brief: la trazabilidad de responsables es el núcleo del problema de cadena de custodia.
- **Transacciones y firmas:** cada registro de evidencia o transferencia de custodia se implementa como una transacción firmada por la cuenta del responsable. La firma criptográfica reemplaza la firma manual en papel, pero con la ventaja de ser verificable matemáticamente por cualquier tercero.
- **Soroban (contratos inteligentes):** se usa para codificar reglas de negocio —por ejemplo, que una transferencia de custodia solo sea válida si la cuenta que transfiere es efectivamente quien tiene la custodia actual registrada—. Esto evita que un error humano o una manipulación directa de la base de datos rompa la cadena, algo que una base de datos tradicional no puede garantizar por sí sola.
- **Red pública / testnet:** se eligió Stellar (sobre una alternativa privada o de consorcio) porque el valor del proyecto depende de que la verificación sea posible por un tercero completamente externo al sistema —el auditor no necesita permiso del laboratorio forense para consultar la red—, lo cual solo es posible en una red pública verificable, no en una base de datos cerrada.

Cada uno de estos componentes se eligió porque responde directamente a la pregunta que motiva el proyecto: ¿cómo se demuestra, sin depender de la confianza en una sola parte, que una evidencia no fue alterada? Stellar aporta la cuenta como identidad verificable, la transacción firmada como prueba de acción, y Soroban como la capa de reglas que automatiza la validez de cada paso.
