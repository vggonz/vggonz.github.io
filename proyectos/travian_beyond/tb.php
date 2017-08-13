<?php

$noticias[] = array("2009-04-03", "Esta versión hace mucho que no funciona. Por favor, dirígete a <a href='http://www.userscripts.org'>userscripts.org</a> para buscar actualizaciones / This versiones does NOT work for a long time. Please, go to <a href='http://www.userscripts.org'>userscripts.org</a> to look for updates.");
$noticias[] = array("2007-07-13", "POR FAVOR, ayudad a la <a href='http://www.denibol.com/foro/viewtopic.php?t=168'>lista de compatibilidad del script</a> para mejorarla / PLEASE, help editing the <a href='http://www.denibol.com/foro/viewtopic.php?t=168'>script compatibility list</a> to improve it");
$noticias[] = array("2007-06-14", "Puedes descargar la antigua versión 2.5 desde <a href='travian3_25.user.js'>aquí</a> si tu servidor de juego aún no ha sido actualizado");
$noticias[] = array("2007-06-13", "La versión 2.6 es incompatible con las versiones antiguas del juego y con versiones antiguas del script. Por favor, desinstala todas las versiones del script que tengas antes de actualizar. <span style='font-weight: bold; color:#FF0000'>NO ACTUALIZAR</span> a la versión 2.6 si la anterior versión aún te funciona / <span style='font-weight: bold; color:#FF0000'>DON'T UPGRADE</span> to version 2.6 if prior version is still working for you!");
$noticias[] = array("2007-04-14", "Si tienes problemas con el script en Firefox, prueba a desactivar las extensiones <a href='https://addons.mozilla.org/es-ES/firefox/addon/1843'>Firebug</a> y <a href='https://addons.mozilla.org/en-US/firefox/addon/1865'>AdBlock Plus</a> con las que se han detectado algunas incompatibilidades severas");
$noticias[] = array("2006-12-20", "He instalado publicidad de Google Adsense en la página oficial del script y en la de instalación. Por favor, apoyad al desarrollador haciendo click en ella de vez en cuando. Muchas gracias ;)");
$noticias[] = array("2006-11-24", "For non-Spanish readers, you can see the automatic translated page to English by <a href='http://google.com/translate?u=http%3A%2F%2Fwww.denibol.com%2Fproyectos%2Ftravian_beyond%2F&langpair=es%7Cen&hl=en&ie=UTF8'>Google</a> or <a href='http://babelfish.altavista.com/babelfish/trurl_pagecontent?lp=es_en&url=http%3A%2F%2Fwww.denibol.com%2Fproyectos%2Ftravian_beyond%2F'>Babelfish</a>");
$noticias[] = array("2006-11-01", "<b>POR FAVOR</b>, no enlacéis directamente a los ficheros de descarga, en su lugar poned el enlace a esta página. Muchas gracias / <b>PLEASE</b>, do not direct link to the scripts, link instead to this page. Thank you");
$noticias[] = array("2006-10-11", "No se proporcionará más soporte o actualizaciones a la rama 1.x del script o a Travian 2");
$noticias[] = array("2006-10-01", "Me uno al boicot al servidor 4 hispano y su nuevo sistema de Plus mediante 'monedas de oro'. No daré soporte a aquellos servidores que lo tengan (lo cual no significa que no funcione el script, simplemente no me preocuparé de hacerlo compatible con él) y no tendrán servicio de Travian World. Tambien dejaré de dar soporte a Travian2 cuando ocurra el reinicio del servidor 1 hispano. Para más información visitad <a href='/foro/viewtopic.php?t=37'>este</a> hilo del foro.");
$noticias[] = array("2006-07-12", "A partir de la versión 1.8e, ambas versiones pueden convivir y cada una actuará únicamente sobre el tipo de servidor para el que ha sido diseñado");
$noticias[] = array("2006-05-15", "La utilización de cualquier tipo de script (incluyendo éste) está prohibida por la normativa del juego. Si se detecta que un usuario los utiliza, puede ser objeto de sanción.");
$noticias[] = array("2006-04-17", "Si no sabes como ponerlo, he creado una mini-guía con los pasos de instalación: <a href='instalar.html'>CÓMO Instalar Travian Beyond</a>");

$versiones["2.6c MunLightDoll"] = array("2007-08-06", array(
	"Traducción a danés gracias a coocsnake",
	"Traducción al croata gracias a Croat",
	"Traducción al búlgaro gracias a IYI-Aryan",
	"Arreglado fallo del refresco automático con producción negativa (gracias a organiq)",
	"Arreglado para el nuevo cambio en la interfaz del juego (gracias a Pyronhell y todos los que ayudaron en el foro)",
	"Actualizada la traducción al alemán (gracias a Blabla Blubb)",
	"Actualizada la traducción al sueco (gracias a Gummit-the-killer)",
	"Actualizada la traducción al francés (gracias a Prom)",
	"Costes del almacén y granero grandes",
	"Actualizados los costes de la maravilla"));

$versiones["2.6b MunLightDoll"] = array("2007-06-15", array(
	"Corregido orden de las materias en la vista resumen de aldeas",
	"Corregida la obtención del tipo de casilla en los tooltip del mapa (sólo algunos servidores)",
	"Corregidos los enlaces rápidos del menú izquierdo"));

$versiones["2.6a MunLightDoll"] = array("2007-06-14", array(
	"Corregido orden de los recursos y temporizadores de los almacenes",
	"Corregido el desplazamiento en el mapa para una sola casilla",
	"Corregida la imagen de la muralla en el resumen de edificios"));

$versiones["2.6 MunLightDoll"] = array("2007-06-13", array(
	"Nuevos idiomas: checo (gracias a nofak y Darius), finlandés (gracias a Pasi Pekkala), sueco (gracias a Paul Nilsson) y chino (gracias a MagicKnight)",
	"Ampliada la traducción al alemán (gracias a Blabla Blubb)",
	"Adaptado al nuevo formato HTML + CSS del juego",
	"Añadido otra vez el enlace para enviar IGM al lado de los nombres (despiste mío)",
	"Corregida la ordenación de las columnas en la vista resumen del mapa",
	"Eliminado s3.travian.net del servicio Travian World (no más estadísticas o mapa extendido)",
	"Confirmación de cancelación para cualquier elemento cancelable",
	"Optimización del menú de enlaces rápidos usando DOM (gracias a Empeka)",
	"Refresco automático de una aldea en la vista resumen cuando un temporizador de construcción o ataque termina",
	"Corregidos diveros fallos menores por todo el código",
	"Incompatible con cualquier otra versión del script u otras versiones del juego"));

$versiones["2.5"] = array("2007-04-23", array(
	"Arreglado fallo al mostrar la última version disponible",
	"Arreglado fallo con la información de los recursos de las aldeas desde el mapa",
	"Arreglado fallo al colocar la imagen con el número de nivel en las minas",
	"Arreglada la detección de idioma del juego",
	"Arreglada la ordenación de columnas en la vista resumida del mapa",
	"Arreglado el refresco de la producción de materiales cuando la producción es superior a 3600",
	"Arreglado fallo en el histórico de ventas si no se pertenece a ninguna alianza",
	"Eliminada la sustitución de texto para complementar la traducción por el grave impacto en el rendimiento",
	"Comprobación de nueva versión bajo demanda",
	"Nueva vista resumen de todas las aldeas",
	"Mensaje de borrado de cuenta desplazado para no interferir con el menú",
	"Nuevos idiomas: polaco (gracias a Nidhog y Matrixik), turco (gracias a Tarik) y rumano (gracias a Dan Aslau)",
	"Actualizada la traducción al italiano gracias a Daniele",
	"Costes hasta nivel 19 de las minas (gracias a DarkChew, Oleg y Surgat)",
	"Muestra opción oculta de estadísticas en la alianza",
	"Archivo histórico de mensajes e informes (aprovecha un bug del juego y es probable que no dure)",
	"Arreglados diversos fallos menores a lo largo del código"));

$versiones["2.4"] = array("2006-11-14", array(
	"Coste del nivel 14 de la mina de madera y 15 de hierro (gracias a Weahl)",
	"Coste del nivel 13 de la granja (gracias a Lord Kroak)",
	"Coste de los niveles del 11 al 20 de la plaza de reuniones (gracias a surgat)",
	"Actualizada la traducción al italiano (gracias a rosfe)",
	"Corregido fallo al mostrar los marcadores teniendo sólo una aldea",
	"Corregido el soporte para murallas cuando no hay plaza de reuniones",
	"Ahora se tiene en cuenta el numero de marcadores y enlaces de Plus para el desplazamiento de las tablas resumen",
	"Nuevos filtros para las ofertas del mercado: 1:1 - 1:>1 - 1:<1 - 1:x",
	"Sistema de corrección de texto del juego, pensado para arreglar la mala traducción",
	"Sistema de comprobación de nuevas versiones del script (desde la página de vales de Plus)",
	"Filtros de tiempos en el mercado (max 1h, 2h, 3h y mas)",
	"Histórico de ventas en el mercado para volver a crearlas rápidamente",
	"Cambiada la codificación del fichero a UTF-8 para los idiomas multi-byte como el ruso (creo)",
	"Nueva página principal para el script (gracias a Mausedar)",
	"Probado con Firefox 2.0"));

$versiones["2.3a"] = array("2006-10-25", array(
	"Corregido fallo con los enlaces en el menú",
	"Eliminado el enlace al mapa por ser una herramienta minoritaria",
	"Corregida la duración de las cookies de configuración en Opera",
	"Traducción al ruso (gracias a Vladimir Yu Belov)",
	"Otros cambios menores"));

$versiones["2.3"] = array("2006-10-23", array(
	"Actualizada y corregida la traducción al portugués (gracias a João Frade)",
	"Nivel 15 de las minas de barro y madera (gracias a Weahl)",
	"Corregido el enlace rápido para atacar aldeas después de la última actualización de T3",
	"Corregida la fórmula de cálculo de puntos de cultura y su presentación",
	"Notas y marcadores diferentes para cada servidor",
	"Nuevo enlace rápido al generador de mapas multilenguaje"));

$versiones["2.2"] = array("2006-10-14", array(
	"Actualizada la traducción del holandés",
	"Costes de los niveles 12 y 13 de las granjas (gracias a Weahl)",
	"Cálculo de tiempo de ejecución del script",
	"Información sobre las características de una aldea desde la ventana de mapa (al dejar el ratón sobre una casilla durante al menos 1 segundo)",
	"Información sobre las estadísticas de un jugador o alianza sólo manteniendo el ratón encima del enlace (sólo para los servidores con Travian World)",
	"Actualización de comentarios en el codigo"));

$versiones["2.1e"] = array("2006-10-11", array(
	"Costes del niveles 14 de las mina de hierro y barro (gracias a Weahl)",
	"Corregido fallo en los enlaces rapidos de cantidades del mercado"));

$versiones["1.10e"] = array("2006-10-11", array(
	"Corregido el coste del nivel 94 de la maravilla",
	"Corregido fallo en los enlaces rapidos de cantidades del mercado"));

$versiones["2.1d"] = array("2006-10-02", array(
	"Costes de los niveles 12 y 13 de los recursos (gracias a Weahl)",
	"Arreglado fallo para marcar apoyo por defecto sobre una aldea propia",
	"Los enlaces rapidos de las cantidades para enviar en el mercado comprueban si hay comerciantes disponibles suficientes (gracias a Rizome)"));

$versiones["1.10d"] = array("2006-10-02", array(
	"Arreglado fallo para marcar apoyo por defecto sobre una aldea propia",
	"Eliminado el calculo sobre los almacenes de la vista detallada porque no son datos actuales",
	"Los enlaces rapidos de las cantidades para enviar en el mercado comprueban si hay comerciantes disponibles suficientes (gracias a Rizome)"));

$versiones["2.1c"] = array("2006-09-24", array(
	"Corregido el enlace para enviar materias primas a las aldeas propias"));

$versiones["1.10c"] = array("2006-09-24", array(
	"Calculo de llenado y vaciado de almacenes en la vista general detallada de las aldeas (solo Plus)"));

$versiones["2.1b"] = array("2006-09-11", array(
	"Enlaces rapidos en las aldeas propias para apoyar y enviar recursos",
	"Costes de todos los niveles de todos los edificios nuevos a excepcion de las minas a partir del nivel 10",
	"Modificado el momento de aplicacion del script. Ahora deberia ser mas rapido y sin ningun tipo de 'salto'",
	"Cambiado el formato del tiempo de llenado / vaciado de almacenes"));

$versiones["1.10b"] = array("2006-09-11", array(
	"Todos los costes de la maravilla",
	"Mismos cambios que la version 2.1b"));

$versiones["2.1a"] = array("2006-09-09", array(
	"Mismos cambios que la version 1.10a",
	"Corregido fallo con minas de mas de nivel 10",
	"Mas costes de mas edificios"));

$versiones["1.10a"] = array("2006-09-09", array(
	"Actualizacion de la traduccion al frances (gracias a Prometeus)"));

$versiones["2.1"] = array("2006-09-08", array(
	"En Firefox ahora utiliza las funciones GM_SetValue y GM_GetValue en lugar de las cookies (<b>IMPORTANTE</b>: Los usuarios de Firefox perderan el contenido del bloc de notas)",
	"Marcadores o favoritos personalizados",
	"Soporte para murallas en la lista de construcciones"));

$versiones["1.10"] = array("2006-09-08", array(
	"Mismos cambios que la version 2.1",
	"Costes de los primeros niveles de la maravilla"));

$versiones["2.0a"] = array("2006-09-07", array(
	"Coste de los niveles 6 y 10 del Hogar del Heroe",
	"Coste del nivel 8 del Trampero",
	"Soporte para packs graficos en ruta local"));

$versiones["2.0"] = array("2006-08-28", array(
	"Mismos cambios que la version 1.9a",
	"Adaptacion a Travian 3: Coordenadas de las aldeas propias",
	"Posicion de las tablas resumen ahora tiene en cuenta el numero de construcciones activas",
	"Costes de los niveles 10 y 14 del trampero"));

$versiones["1.9a"] = array("2006-08-28", array(
	"Ajustado el desplazamiento de la barra superior para eliminar el efecto de salto",
	"Modificado a atraco como opcion por defecto al enviar tropas",
	"Deteccion automatica del identificador de usuario para el mapa de Travian World (solo para servidores hispanos)"));

$versiones["2.0 Beta 6"] = array("2006-08-21", array(
	"Mismos cambios que la version 1.9",
	"Costes para los niveles 11 de Leñador, Barrera y Mina de Hierro",
	"Costes de los primeros niveles del Trampero y el Hogar del Heroe",
	"Soporte de calculo de recursos para construir trampas",
	"Enlace rapido a la pagina de login",
	"Traduccion al portugues (gracias a MikeP)",
	"Adaptacion a Travian 3: Desplazamiento de mas de una casilla en el mapa extendido de Plus"));

$versiones["1.9"] = array("2006-08-21", array(
	"Corregido costes del nivel 12 de la armeria",
	"Añadido coste del nivel 16 del Cuartel Grande",
	"Tabla resumen del mapa es ahora ordenable seleccionando la columna adecuada (gracias a Cesco)",
	"Cambiado el enlace al nuevo sistema de graficas de Travian World (solo disponible para servidores hispanos)"));

$versiones["2.0 Beta 5"] = array("2006-08-09", array(
	"Mismos cambios que la version 1.8i",
	"Arreglado fallo con las imagenes aparecido por cambio en el juego"));

$versiones["1.8i"] = array("2006-08-09", array(
	"Corregidos enlaces vacios",
	"Mejorada la deteccion de servicios de Travian World"));

$versiones["2.0 Beta 4"] = array("2006-07-31", array(
	"Adaptacion a Travian 3 (fase 3): Informes",
	"Mismos cambios que la version 1.8h"));

$versiones["1.8h"] = array("2006-07-31", array(
	"Corregidos costes de varios niveles del escondite",
	"Corregidos los enlaces sobre los que funciona el script",
	"Calculo de recurso y tiempo necesarios para entrenar unidades (introduciendo un valor en la casilla)",
	"Calculo de recurso y tiempo necesarios para explorar un nuevo tipo de unidad",
	"Deteccion de almacen lleno para el calculo de tiempo restante"));

$versiones["2.0 Beta 3"] = array("2006-07-28", array(
	"Mismos cambios que la version 1.8g",
	"Activadas estadisticas de Travian World (solo para servidores hispanos)",
	"Activado mapa extendido de Travian World (solo para servidores hispanos)",
	"Arreglado fallo en la ocultacion de publicidad con Plus"));

$versiones["1.8g"] = array("2006-07-28", array(
	"Arreglado coste del nivel 9 del almacen",
	"Coste del nivel 13 del cuartel grande",
	"Arreglado fallo en la vista global de aldeas si no se tiene Plus",
	"Arreglado fallo al mostrar enlaces para enviar IGM o mostrar estadisticas a usuarios con ID 0",
	"Nuevo filtro en el mercado para ocultar aquellas ofertas para las que no se tienen recursos o comerciantes suficientes",
	"Eliminado el enlace a la calculadora por no ser multilenguaje"));

$versiones["2.0 Beta 2"] = array("2006-07-17", array(
	"Adaptacion a Travian 3 (fase 2): Mercado",
	"Mismos cambios que 1.8f"));

$versiones["1.8f"] = array("2006-07-17", array(
	"Coste del nivel 11 del Cuartel grande (gracias a rub3n)"));

$versiones["2.0 Beta 1"] = array("2006-07-12", array(
	"Adaptacion a Travian v3 (fase 1)",
	"Funcionalidad parcial"));

$versiones["1.8e"] = array("2006-07-12", array(
	"Deshabilitado para Travian v3",
	"Traduccion al holandes (gracias a un autor anonimo)"));

$versiones["1.8d"] = array("2006-07-11", array(
	"Ampliada y corregida la traduccion al frances (gracias a Prometeus)",
	"Modificado el enlace a las estadisticas",
	"Integracion con el mapa extendido de Travian World (solo disponible para servidores hispanos)"));

$versiones["1.8c"] = array("2006-06-29", array(
	"Corregido fallo en la suma de las perdidas de un informe de ataque",
	"Costes del nivel 18 al 20 del Corral Grande (gracias a Rub3n)",
	"Muestra una opcion oculta en la vista resumen de aldeas del Plus"));

$versiones["1.8b"] = array("2006-06-26", array(
	"Coste del nivel 17 del Corral Grande (gracias a rub3n)",
	"Arreglado fallo de bucle infinito en la pagina del perfil de un jugador",
	"Filtros en las ofertas del mercado"));

$versiones["1.8a"] = array("2006-06-24", array(
	"Costes de los niveles 18 y 19 del Cuartel Grande (gracias a Rub3n)",
	"Traduccion al frances (gracias a Ferran)",
	"Traduccion completa y corregida de aleman (gracias al autor anonimo)",
	"Suma total del botin en los informes de ataque (gracias a Kranen)",
	"Desplazamiento de mas de una casilla tambien en el mapa grande del Plus",
	"Integracion con estadisticas de Travian World (solo disponible para los servidores hispanos)"));

$versiones["1.8"] = array("2006-06-13", array(
	"100% codigo comentado en castellano (sin demasiado detalle)",
	"Arreglado fallo al mostrar las nuevas cantidades de envio en el mercado",
	"Arreglado fallo en la transparencia de la imagen del mercado",
	"Enlaces rapidos a aldeas propias al enviar apoyos militares (igual que el mercado)",
	"Calculo de puntos de cultura necesarios",
	"Añadido el atributo 'title' a todas las imagenes nuevas (Gracias a Ulises2k)",
	"Añadida la cantidad maxima transportable por un comerciante en las cantidades de envio (gracias a Walenzack)",
	"Nuevos enlaces rapidos para enviar tropas y al compactador de batallas",
	"Traduccion en ingles, italiano y aleman disponibles (Gracias a Andres_age, IcEye y autor anonimo respectivamente)"));

$versiones["1.7"] = array("2006-05-28", array(
	"Arreglado fallo con la ocultacion de la publicidad",
	"Arreglado fallo al mostrar los recursos restantes",
	"Arreglados algunos costes",
	"Nuevas cantidades para sumar al enviar recursos desde el mercado",
	"Muestra la alianza de un jugador en las ofertas del mercado",
	"Soporte para internacionalizacion",
	"Eficiencia de un ataque en los informes. Calculo entre lo que pueden cargar las tropas supervivientes y lo que realmente se ha capturado"));

$versiones["1.6"] = array("2006-05-16", array(
	"Desplazamiento de mas de una casilla en el mapa",
	"Bloc de notas en la pantalla de mensajes",
	"Arreglados diversos fallos",
	"Eliminado el lazo de espera"));

$versiones["1.5"] = array("2006-05-10", array(
	"Lazo de espera",
	"La informacion sobre granjas y edificios ahora se desplaza proporcionalmente a la lista de aldeas, enlaces y construcciones pendientes",
	"Boton para marcar todos en los informes y mensajes arreglado",
	"Nuevas imagenes para el mercado y edificios militares",
	"Arreglado fallo cuando la produccion es 0 o negativa",
	"Soporte para nuevos edificios: Cuartel grande, Corral grande, oficina de comercio, tesoro y plaza de torneos",
	"70% del codigo comentado",
	"Corregidos diversos fallos"));

$versiones["1.4a"] = array("2006-04-28", array(
	"Corregido fallo en las tablas de costes de la Plaza de Reuniones (agradeceria si alguien me comprobara el resto)",
	"Añadida mas informacion en el resumen del mapa",
	"Corregido fallo al mostrar el calculo de tiempo al elegir edificio nuevo"));

$versiones["1.4"] = array("2006-04-27", array(
	"Añadido vista resumen al mapa",
	"Calculo de rentabilidad del atacante en los informes de ataques",
	"Soporte para packs graficos",
	"Ligeros cambios en la colocacion de elementos",
	"Corregidos varios fallos (no recuerdo todos)"));

$versiones["1.3"] = array("2006-04-26", array(
	"Corregido fallo en las casillas de mensajes (mi perdicion)",
	"Cambio en los enlaces a aldeas en el mercado, ahora son las propias coordenadas",
	"Informe de perdidas materiales en los ataques (gracias a Bafox)",
	"Resumen de construcciones actualizables en las paginas principales",
	"Los recursos que faltan ahora tambien se decrementan con el tiempo",
	"La pagina se refresca automaticamente cuando algun contador o recurso llega a 0",
	"Nuevo enlace rapido al simulador de batallas",
	"Limpieza de codigo"));

$versiones["1.2a"] = array("2006-04-24", array(
	"Los enlaces rapidos a las propias aldeas en el mercado son ahora los circulos de la lista existente",
	"Corregido fallo en las casillas de mensajes (a ver si ahora lo consigo)"));

$versiones["1.2"] = array("2006-04-23", array(
	"Enlaces rapidos a las aldeas propias en el mercado (gracias a Bafox)",
	"Corregido fallo en las casillas de mensajes (otra vez)"));

$versiones["1.1d"] = array("2006-04-21", array(
	"Corregido fallo en las casillas de mensajes"));

$versiones["1.1c"] = array("2006-04-20", array(
	"Arreglado un fallo de calculo en el tiempo restante",
	"Nueva casilla para marcar todos los mensajes tanto en informes como en IGMs (igual que en Plus)"));

$versiones["1.1b"] = array("2006-04-20", array(
	"Añadidos nuevos enlaces rapidos: Calculadora y Pagina principal del script",
	"Cambiado el texto mostrado en el calculo de tiempo, ahora muestra 'hoy', 'mañana' y 'pasado mañana'",
	"Calculo de tiempo para vaciado del granero si la produccion es negativa"));

$versiones["1.1a"] = array("2006-04-18", array(
	"Corregido fallo en la presentacion del calculo para llenar el almacen",
	"Corregido fallo en los relojes"));

$versiones["1.1"] = array("2006-04-18", array(
	"Cambio de DOM a XPath (deberia ser mas estable)",
	"Añadidos los enlaces a los edificios mas frecuentes",
	"Añadidos enlaces de IGM y Ataque desde cualquier sitio",
	"Corregido fallo en el calculo del tiempo de recursos restantes",
	"Corregido fallo en la cancelacion de edificios"));

$versiones["1.0"] = array("2006-04-17", array(
	"Primera version"));

$features[] = "Funciona tanto en Opera (&gt;= 9.0) como en Firefox junto con la extensión <a href='http://greasemonkey.mozdev.org'>GreaseMonkey</a>";
$features[] = "Compatible con la version gratuita y la versión de pago <b>Plus</b>";
$features[] = "Enlaces directos para accesos faciles: Alianza, perfil, enviar tropas y simulador de batallas";
$features[] = "Enlaces directos a los edificios más frecuentes: Mercado, Plaza de reuniones, Cuartel, Corral y Taller";
$features[] = "Enlaces rápidos a las coordenadas de las aldeas propias al enviar recursos o apoyos";
$features[] = "Cálculo del tiempo hasta el llenado o vaciado de los almacenes y graneros";
$features[] = "Cálculo del tiempo y recursos restantes hasta poder construir una estructura, entrenar unidades o explorar nuevas";
$features[] = "Confirmación en la cancelación de las construcciones";
$features[] = "Ocultación de la publicidad";
$features[] = "Envío rápido de IGM (In Game Messages) desde cualquier sitio donde se mencione un jugador";
$features[] = "Lanza ataques desde cualquier sitio donde se mencione una aldea";
$features[] = "Vista resumen de granjas y edificios de la aldea";
$features[] = "Botón para marcar todos los informes o mensajes";
$features[] = "Movimientos en el mapa de más de 1 casilla";
$features[] = "Nuevas cantidades para sumar al enviar recursos desde el mercado (100, 250, 500 y 1000)";
$features[] = "Muestra la alianza de un jugador en las ofertas del mercado";
$features[] = "Filtros en el mercado";
$features[] = "Cálculo de rentabilidad y eficiencia del atacante en los informes de ataques";
$features[] = "Cálculo de puntos de cultura necesarios";
$features[] = "Bloc de notas";
$features[] = "Soporte para internacionalización";
$features[] = "Compatible con los packs gráficos";
$features[] = "<i>Y más...</i>";

?>
