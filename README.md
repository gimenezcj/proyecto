![UTN FRLP](/assets/images/logo-frlp-escalado.png)
# Codapli - GAMA
Proyecto para la materia Proyecto
ciclo lectivo 2022

El sistema cuenta con dos aplicativos client y server en sus correspondientes carpetas.

Comandos para su instalacion:

> npm install
> npm --prefix server install
> npm --prefix client install

Dentro de la carpeta del servidor (server/)se debe crear un archivo: .env con la informacion del acceso a la base de datos:

> DB_HOST="127.0.0.1"
> DB_DABASE=gama_database_development
> DB_USERNAME="su usuario"
> DB_PASSWORD="su contraseña"

Ejecucion 

Ejecutar cliente y api server: 
> npm start

o

Ejecutar por separado en dos terminales
> npm --prefix server run start
> npm --prefix client run start

