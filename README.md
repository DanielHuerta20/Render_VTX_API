# Vitromex-Arko Api (Node.js)

> descripcion e instalaciones para correrlo en local y produccion 

## Authors

- [Angel Isai (developer)](https://github.com/AngelIsaiRB)
- [Luis Enrique (developer)](https://github.com/Luis-Blash)
- [Inmersys](https://www.inmersys.com)

## Instalacion

Install my-project with npm

```bash
  git clone
  npm install
  nodemon app.js
  or
  node app.js 
```
## ENV guia 

el archivo cuenta con links y string que aran funcionar el API

`PORT` 
 puerto donde correra el API
 default: 8080

`SECRETKEY`
para firmar los JWT puede ser cualquier string

`AZURE_STORAGE_CONNECTION_STRING`
cadena de conexion para [azure Storage](https://experienceleague.adobe.com/docs/experience-platform/sources/ui-tutorials/create/cloud-storage/blob.html?lang=es) 

### Nombres de contenedores de imagenes

(Recomendado no cambiar)

`AZURE_BOLB_CONTAINER_NAME` = imagenes
`AZURE_BOLB_CONTAINER_NAME_RENDERS` = renders
`AZURE_BLOB_CONTAINER_SERIES` = series
`AZURE_BLOB_CONTAINER_APLICATIONS` = aplicaciones
`AZURE_BLOB_CONTAINER_TYPOLOGIAS` = typologias