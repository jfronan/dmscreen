# Descargas
Ir al apartado de Tags/Etiquetas y descargar la ultima version.

# Desarrollo
Se debe instalar:
* npm install -g electron-forge@5.2.4
* npm install -g electron@4.1.3
* Descargar e instalar WiX Toolset 3.11 ... de https://wixtoolset.org/releases/
* Agregar a la variable de entorno PATH (la que esta usando nodeJS en windows), la ruta a la carpeta /bin de wix  (ej.: C:\Program Files (x86)\WiX Toolset v3.11\bin)

#### Para probar la app
````
npm start
````
#### Para crear el instalador
````
npm run make
````

El instalador se generara en la carpeta out/make/wix/x64