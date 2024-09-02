# Backend_Developer_NestJS_02

¡Bienvenido(a) a la prueba técnica para el puesto de Desarrollador Backend con NestJS! En esta prueba, evaluaremos tus habilidades en el desarrollo de aplicaciones utilizando NestJS, con un enfoque específico en diversos aspectos técnicos y de buenas prácticas.

## Descripción del Proyecto

El objetivo de este proyecto es construir un servicio backend para una aplicación de lista de tareas utilizando **NestJS**. El servicio debe estar dockerizado, seguir reglas estrictas de linting, incluir conexiones a bases de datos, registro de logs (tanto en archivos como en MongoDB) y utilizar otros componentes avanzados proporcionados por el framework.

## Requisitos Técnicos

La aplicación debe ser desarrollada utilizando las siguientes tecnologías:

- Framework: NestJS.
- Lenguaje de programación: TypeScript.
- Base de datos: MySQL para la persistencia de datos.
- Docker: La aplicación debe estar dockerizada.

El proyecto debe incluir:

- Un controlador para gestionar las operaciones CRUD de las tareas.
- Un servicio que maneje la lógica de negocio relacionada con las tareas.
- Validaciones para los datos de entrada en las solicitudes usando DTOs.
- Middleware para registro de solicitudes HTTP.
- Sistema de logging con soporte para archivos y MongoDB.
- Cacheo para los endpoints más accedidos usando Redis.
- Limitación de tasa (Rate limiting) en los endpoints de la API.
- Pruebas unitarias y de integración con al menos un 80% de cobertura.
- Documentación API utilizando el módulo Swagger (opcional).

### Endpoints de la API

#### Gestión de Tareas

- **POST** `/tasks`: Crear una nueva tarea.
- **GET** `/tasks`: Recuperar todas las tareas con la capacidad de filtrar por estado (completadas, pendientes).
- **GET** `/tasks/:id`: Recuperar una tarea específica por ID.
- **PUT** `/tasks/:id`: Actualizar una tarea existente (título, descripción, estado).
- **DELETE** `/tasks/:id`: Eliminar una tarea por ID.

#### Estado de las Tareas

- Marcar tareas como completadas o pendientes.
- Incluir un contador que indique cuántas tareas están completadas y cuántas están pendientes.

### Dockerización

- Proporcionar un archivo `Dockerfile` para construir la imagen de Docker de la aplicación NestJS.
- Proporcionar un archivo `docker-compose.yml` para el despliegue local del servicio.

### Logging

- Implementar un sistema de registro de logs completo:
  - **Logging basado en archivos:** Registrar todas las solicitudes y respuestas HTTP.
  - **Logging en MongoDB:** Guardar los logs de la aplicación (p. ej., errores, eventos importantes) en MongoDB.
- Integrar **Winston** u otra biblioteca de logging que soporte múltiples transportes.

### Seguridad

- Implementar autenticación basada en **JWT** y proteger los endpoints de la API.
- Proteger los datos sensibles (p. ej., credenciales de la base de datos) usando variables de entorno y asegurarse de que no se expongan.

### Extras

- Implementar un endpoint de métricas para monitorizar el rendimiento de la API (p. ej., usando **Prometheus** o similar).
- Añadir soporte de paginación para el endpoint `GET /tasks` cuando haya más de 10 tareas.

## Aspectos a Evaluar

Durante la revisión de tu proyecto, nos enfocaremos en los siguientes aspectos:

1. **Correcto Funcionamiento:** Verificaremos que la aplicación cumpla con los requisitos y funcione correctamente.
2. **Eficiencia:** Evaluaremos la eficiencia del código, incluido el rendimiento y el manejo de recursos.
3. **Lectura de Código:** Revisaremos la legibilidad del código, la claridad en la estructura y la coherencia en las convenciones de nomenclatura.
4. **Formateo y Estilo del Código:** Verificaremos el uso de herramientas como linter para mantener un código consistente y prettier para el formateo del mismo.
5. **Organización del Proyecto:** Evaluar la estructura y organización del código fuente.

## Tareas a Realizar

1. Implementar el servicio de gestión de tareas con las funcionalidades descritas anteriormente.
2. Crear un archivo `Dockerfile` para construir la imagen de Docker de la aplicación.
3. Crear un archivo `docker-compose.yml` para el despliegue local del servicio.
4. Realizar una revisión del código para evaluar la calidad de la lectura del mismo.
5. Utilizar un linter y prettier para garantizar la calidad y estilo del código.
6. Verificar el correcto funcionamiento de la aplicación.

## Entrega de la Prueba

- El código fuente debe ser entregado mediante un pull request hacia la rama `master` de este repositorio.
- El nombre de la rama debe seguir la siguiente convención: `test/nombre-persona`.
- Agrega al final del archivo `README.md` instrucciones claras sobre cómo ejecutar y probar la aplicación.
  - Además de la documentación necesaria para probar la API con ejemplos de requests.

¡Buena suerte y estamos ansiosos por revisar tu trabajo!
