# DATA WAREHOUSE

## Pasos para instalación

1- Bajar desde plataforma de Acamica o bien desde el repositorio de GitHub detallado abajo.
https://github.com/johnvamp/DataWarehouse.

2- Es necesario tener un servidor de base de datos MySQL.

3- El archivo "dwh.sql" contiene todo lo necesario para crear la base de datos, tablas, relaciones y algunos datos precargados necesarios para su uso. El mismo se encuentra localizado dentro de la carpeta Back.

4- Se deberan instalar las siguientes dependencias, se observan tambien en "package.json":

- express
- jsonwebtoken
- mysql2
- sequilize

5- El archivo "api.js" posee la configuración del servidor el cual correra por el puerto 3500. El archivo "conexion.js" posee la configuración de sequelize y la ruta a donde se alojara la BD que se genere con la informacion del archivo SQL

6- Para inicializar el servidor del Data Warehouse se debe ejecutar los comandos

- cd back
- node api.js

7- Hecho esto, verificar que el servidor indique en la consola que se ha inicializado en el puerto 3500 y se ha conectado en la base de datos.

8- Si todos los pasos fueron correctos, el servidor ya se encuentra disponible para ser utilizado.

9- El archivo raiz del proyecto es index.html desde alli se debe comenzar las pruebas.

10- Por último, para poder efectuar la pruebas el proyecto incorpora 2 usuarios para las mismas:

- Perfil: Administrador

  - email: pepepuerta@gmail.com
  - password: pepepuerta

- Perfil: Usuario normal
  - usuario: alipena@gmail.com
  - password: alipena
