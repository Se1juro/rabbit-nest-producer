# Rabbit Produce

Este proyecto es una aplicacion basada en HTTP.

Su puerto principal es el `3000`.

## Requisitos

1. Una instancia de RabbitMQ, ya sea local o remota

## Como correrlo

1. `npm i`

2. `npm run start:dev`

### Como se desarrollo

Se creo primeramente un modulo llamado `users`, el cual contiene los servicios y controladores para el manejo de los mensajes entrantes.

En el modulo `users` se registro el cliente de RabbitMQ para poder disparar eventos/enviar mensajes.

Para la validacion de los datos desistimos de usar `Joi`, es mucho mas verboso que class-transformer, class-validator que nos permite realizar las mismas tareas, nos permite el uso de decoradores, transformar datos y hasta crear nuestros propios `decoradores`.

El endpoint para crear usuarios es:

`[POST] http://localhost:3000/api/producer/users/`

Su Body sigue una simple regla y es que el nombre debe ser un string y no debe estar vacio.

`{
  "name": "Daniel Morales 4"
}`

Tambien cuenta con un endpoint tipo GET, que tambien dispara el message get-all-users, el cual trae la lista de usuarios creados a la fecha.

`[GET] http://localhost:3000/api/producer/users/`
