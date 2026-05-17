Para arrancarlo facilmente uso un archivo .bat que ubico en una carpeta para manejo de bases de datos.

El nombre del archivo es : MONGODB_ACTIVACION.bat

Simplemente hacemos clic sobre el nombre del archivo y se ejecutará el codigo de comandos en Windows.

Es basicamente un archivo de texto que construimos el notepad, es decir, tiene la extension .txt pero al terminar de editarlo le cambiamos el nombre de la extension a .bat


Este es el contenido. Arrancará a MonoDB y luego a MongoDB Compass
---
```bash
@echo off
chcp 65001 >nul
title Servidor MongoDB y Compass
echo Levantando el servidor de MongoDB en E:\data\db...

:: Cambiamos a la unidad E y arrancamos el servidor en segundo plano
E:
cd E:\MongoDB\bin
start "Servidor MongoDB" mongod.exe --dbpath "E:\data\db"

:: Esperamos 3 segundos para darle tiempo al servidor a arrancar antes de abrir Compass
timeout /t 3 /nobreak >nul

echo Abriendo MongoDB Compass...
:: Arrancamos Compass en su propio proceso independiente
start "" "C:\Users\barbu\AppData\Local\MongoDBCompass\MongoDBCompass.exe"

cls
echo ===================================================
echo   ¡¡¡MongoDB y MongoDB Compass están activados!!!
echo ===================================================
echo Puedes minimizar esta ventana. No la cierres hasta terminar de programar.
pause
```