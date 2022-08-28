# Compresor de archivos - Documento de requisitos

## Resumen

Desarrollar un programa que sea capaz de comprimir un archivo en formato zip.

Vamos a dividir la práctica en dos pequeñas partes.

En la primera parte lo que desarrollaremos será la funcionalidad principal de compresión de un archivo.

En la segunda parte añadiremos una barra de progreso con más información y la posibilidad de pausar el proceso de compresión a través de la terminal y nuestro teclado.

El objetivo de esta práctica es afianzar las secciones 6 y 7 trabajando principalmente con streams de datos y el sistema de archivos.

## Requisitos funcionales

- El usuario ejecutará el programa a través de la terminal.
- El programa debe validar que la ruta de entrada del archivo y la carpeta de salida existan.
  - Si alguna de las rutas no existe, el programa debe mostrar por pantalla un error y finalizar.
- El programa sólo admitirá un archivo a comprimir, no son válidas carpetas ni archivos múltiples.
- El programa mostrará por terminal una barra de progreso que permitirá conocer al usuario el porcentaje de compresión realizado.
  - El programa permitirá pausar la compresión pulsando la tecla p en la terminal.
- El programa permitirá reanudar la compresión pulsado la tecla r en la terminal.
- Si el programa se finaliza por un error en el proceso, el archivo resultante debe eliminarse antes de cerrar el programa.
- El programa puede finalizarse de tres formas:
  - Por un error
  - Cerrando el proceso (Ctrl+C o de forma externa)
  - Al finalizar la compresión de forma automática

## Requisitos no funcionales

- La aplicación deberá poderse ejecutar con la versión LTS de Node.JS(16)
- Se permite el uso de librerías/dependencias de terceros para las funcionalidades indicadas a continuación.
  - Barra de progreso, nosotros usaremos cli-progress
  - Formateo de texto para la terminal, nosotros usaremos figlet
