# Historias de usuario individuales

**Nombre:** Jonathan de Jesús Agudelo Bedoya

**Usuario de GitHub:** jbxmusic

---

## Mis historias de usuario

> Entre 5 y 7 historias en formato "como [rol] quiero [acción] para [beneficio]", pensadas desde distintos roles o necesidades del producto que el equipo está diseñando. Si escribes menos de 7, borra las líneas que no uses (mínimo 5).

1. Como **perito recolector**, quiero conectar mi billetera Freighter a la aplicación para firmar la creación de un nuevo caso de evidencia digital con mi clave privada y autenticar legalmente mi identidad en la blockchain.
2. Como **supervisor legal**, quiero autorizar mediante multifirma (Soroban) el cierre definitivo de la cadena de custodia de un caso para asegurar que la evidencia está validada y lista para ser presentada en juicio.
3. Como **analista forense**, quiero intentar registrar un evento de traspaso únicamente si el hash del archivo recibido coincide con el último evento registrado, de modo que el contrato inteligente impida registrar transferencias fuera de secuencia o con datos corruptos.
4. Como **auditor externo**, quiero un enlace directo a Stellar Expert para cada transacción de la cadena de custodia, con el fin de examinar visualmente los metadatos on-chain (hash SHA-256, timestamps e identificadores) en el explorador público.
5. Como **custodio de almacén**, quiero visualizar una línea de tiempo interactiva dentro de la aplicación que muestre cronológicamente cada cambio de manos del archivo con sus respectivos responsables, para entender el estado actual de la custodia de forma rápida e intuitiva.
6. Como **fiscal**, quiero filtrar y buscar casos específicos por su número de expediente o identificador de activo en Stellar, para acceder rápidamente al historial completo de evidencias de un proceso judicial.
7. Como **perito recolector**, quiero recibir una alerta o mensaje claro de error en la interfaz cuando el hash del archivo que intento subir no coincida con la cadena registrada, para detectar e investigar inmediatamente cualquier intento de alteración o archivo corrupto antes de procesar el traspaso.

## La más importante y por qué

> Organiza las historias de mayor a menor importancia: en la primera fila va la más importante. En cada fila indica el número de la historia y por qué la ubicaste en esa posición. Si usaste menos de 7 historias, borra las filas que sobren.

| Orden de importancia | Historia # | Por qué |
| :---: | :---: | --- |
| 1 (la más importante) | 3 | Es la más importante porque representa el núcleo de la propuesta de valor y la ventaja diferencial de usar Blockchain (Soroban en Stellar). Si la lógica del contrato inteligente no fuerza el orden estricto e impide la inserción de hashes incongruentes en la red, la solución no sería superior a una base de datos tradicional. Garantizar que las reglas de negocio se impongan a nivel de protocolo es lo que asegura la inmutabilidad y la fiabilidad técnica del sistema. |
| 2 | 1 | Ocupa el segundo lugar porque la no-repudiación y la identidad digital son pilares en un proceso judicial. Si no se exige que cada acción sea firmada individualmente con la clave privada del usuario vía Freighter, pierde sentido el registro on-chain, ya que no se podría demostrar legalmente quién creó o modificó el evento. |
| 3 | 2 | Es la tercera en prioridad porque añade una capa clave de gobernanza y control de calidad legal. Permite que el proceso no dependa de una sola persona, sino que requiera la validación conjunta (perito + supervisor) antes de dar por finalizada la custodia previa al juicio, evitando cierres prematuros o no autorizados. |
| 4 | 5 | Se ubica en la mitad de la tabla porque transforma datos técnicos complejos en información accesible e intuitiva para los usuarios del día a día (custodios, fiscales, jueces). Sin un componente visual claro, la adopción del sistema por parte de personal no técnico se vería gravemente afectada. |
| 5 | 4 | Es fundamental para la transparencia e independencia de la prueba, permitiendo a terceros (como jueces o auditores) verificar la información directamente en la red pública sin confiar ciegamente en la interfaz de la aplicación. Ocupa la quinta posición porque depende de que los datos ya se hayan registrado correctamente en los pasos previos. |
| 6 | 7 | Aunque el contrato inteligente (Historia 1) bloquea la transacción a nivel técnico, esta historia es clave para la experiencia de usuario (UX). Permite notificar inmediatamente al operador humano de forma comprensible que la evidencia fue alterada o sufrió corrupción de datos antes de intentar procesarla. |
| 7 (la menos importante) | 6 | Ocupa el último lugar de prioridad dentro del MVP porque es una funcionalidad de usabilidad y conveniencia funcional. Facilita la navegación cuando el volumen de casos crece, pero no afecta directamente la integridad, seguridad o validez legal de la cadena de custodia ni la prueba de concepto inicial. |
