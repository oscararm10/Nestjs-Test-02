## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Instrucciones

1. Instalar dependencias
2. Ejeutar sql
3. Colocar contraseña en el app.modulo
4. Correr el proyecto con los comando npm run start o npm run start:dev
6. Realizar las peticiones con postman o ide favorito

## Metodos

A continuacion explico como consumir cada endpoint y su funcionalidad

# Crear tarea

Enviar el siguiente endpoint con su body para crear tarea

http://localhost:3000/tasks

{
  "titulo": "Tarea",
  "descripcion": "Prueba",
  "estado": "Completado"
}

# Obtener tareas

Enviar el siguiente Enviar el siguiente endpoint para obtener todas la tareas creadas

http://localhost:3000/tasks

# OBtener tarea por id

Enviar el siguiente Enviar el siguiente endpoint para obtener todas la tareas creadas

# Actualizar tarea

Enviar el siguiente endpoint con su body para actualizar tarea

http://localhost:3000/tasks/3 = /:id = numero de id por el cual buscara y actualizara la tarea

{
  "titulo": "Tarea para actualizar",
  "descripcion": "Prueba",
  "estado": "Completado"
}

# Elminar tarea

Enviar el siguiente endpoint 

http://localhost:3000/tasks/2 = /:id = numero de id por el cual buscara y eliminara esa tarea





