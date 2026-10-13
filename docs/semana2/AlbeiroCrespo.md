# Propuesta individual

**Nombre:** Albeiro Crespo Gutierrez

**Usuario de GitHub:** galbeiroc

---

## Mis historias de usuario

> Entre 5 y 7 historias en formato "como [rol] quiero [acción] para [beneficio]", pensadas desde distintos roles o necesidades del producto que el equipo está diseñando. Si escribes menos de 7, borra las líneas que no uses (mínimo 5).

1. _Como perito recolector, quiero registrar el hash del archivo apenas lo recolecto, para dejar una prueba inicial e inalterable del estado original de la evidencia._

* **Por qué es la #1**: Es el punto de partida de toda la cadena. Si el "origen" no queda registrado de forma confiable desde el primer segundo, no hay nada contra qué comparar después — todas las demás historias dependen de que esta exista primero.

2. _Como **custodio/almacén**, quiero validar y firmar digitalmente cada entrega y recepción de evidencia, para eliminar el papeleo manual y el riesgo de registros incompletos o inconsistentes._

* **Por qué es la #2**: El custodio fue identificado como el "mayor punto único de fallo". Resolver su fricción es la oportunidad priorizada por el equipo, así que es la funcionalidad núcleo del proyecto.

3. _Como **fiscal**, quiero verificar en minutos que el archivo recibido coincide con el hash original, para presentar la evidencia sin que la defensa pueda impugnar su integridad por dudas razonables._

* **Por qué es la #3**: Es el "momento de la verdad" del problema: la escena donde hoy se pierden o impugnan casos por falta de trazabilidad. Es el beneficio final que justifica todo lo anterior.

4. _Como **analista forense**, quiero dejar constancia de cada acceso o manipulación que hago sobre la evidencia, para que mi trabajo sea auditable sin depender únicamente de mi palabra._

* **Por qué es la #4**: El analista es un eslabón intermedio con alto riesgo de manipulación (intencional o accidental); sin su registro, la cadena de custodia tiene un hueco entre la recolección y el juicio.

5. _Como **juez**, quiero consultar el historial completo e inalterable de la cadena de custodia de una prueba, para tomar decisiones informadas sobre su admisibilidad sin depender del testimonio de una sola institución._

* **Por qué es la #5**: Es el usuario final del registro compartido, pero su necesidad se resuelve automáticamente si las historias 1-4 funcionan bien; por eso va después, no antes.

6. _Como **fiscal**, quiero generar un reporte o certificado exportable (PDF) de la verificación de integridad y la línea de tiempo de custodia, para poder anexarlo al expediente físico/legal, ya que el sistema judicial colombiano aún no opera completamente de forma digital._

* **Por qué es la #6**: Depende por completo de que las historias 1, 2 y 3 ya existan y funcionen (no hay nada que exportar si todavía no se puede verificar la integridad).

7. _Como administrador del sistema, quiero gestionar las claves/identidades de cada actor de forma segura, para garantizar que solo personas autorizadas puedan registrar eventos en la cadena de custodia._

* **Por qué es la #7**: Es un requisito de soporte transversal (seguridad y control de acceso), necesario para que todo lo anterior sea confiable, pero no es una historia "de negocio" en sí misma — por eso cierra la lista.
