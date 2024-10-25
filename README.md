# Image Plus 🌟

Un backend construido con Node.js y Express que proporciona una API para gestionar imágenes favoritas. Esta API permite a los usuarios registrarse, iniciar sesión, cerrar sesión y seleccionar imágenes como favoritas, además de implementar diversas funcionalidades de seguridad.

## 📋 Características

- 📄 API RESTful: Proporciona endpoints para registrar usuarios, iniciar sesión, cerrar sesión y gestionar imágenes favoritas.
- 🔒 Autenticación Segura: Implementación de middleware para la validación de JWT y protección de rutas.
- 🔄 Middleware de Seguridad: Control de la cantidad de solicitudes y prevención de ataques de fuerza bruta.
- 🌐 Configuración de CORS: Permite controlar el acceso a la API desde diferentes dominios.
- 🛠 DTOs y Servicios: Uso de Data Transfer Objects para una gestión estructurada de datos y lógica de negocio.
- 🛠 Tecnologías Utilizadas
    - Node.js - Entorno de ejecución para JavaScript del lado del servidor.
    - Express - Framework para aplicaciones web en Node.js.
    - JWT - JSON Web Tokens para autenticación.
    - Sequelize - ORM para MYSQL.
    - MYSQL - Base de datos SQL.

## 🚀 Instalación

## Pre-requisitos

- Node.js: Requiere Node.js versión 14 o superior.
- NPM o Yarn: Gestor de paquetes de Node.js.
- MYSQL: Base de datos para almacenar la información.

## Pasos de instalación
1. Clona este repositorio:

```bash
git clone https://github.com/BrayanG25/Backend-Image-Plus
```

2. Instala las dependencias:

Usando npm:


```bash
npm install
```

O usando yarn:

```bash
yarn install
```

3. Configura las Variables de Entorno:

Crea un archivo .env en la raíz del proyecto y añade las siguientes variables de entorno:

```bash
PORT = "puerto"
DB_HOST="host"
DB_USER="user"
DB_PASSWORD="password"
DB_DATABASE="database"
DB_PORT = "port"
NODE_ENV="ambiente"
SALT_ROUNDS="salt"
JWT_SECRET_KEY="secret key"
JWT_EXPIRATION="1h"
JWT_USER_SERVICE = "user"
JWT_ROL_SERVICE="rol"
API_BASE_URL_IMAGES = "https://api.unsplash.com/search/photos"
API_CLIENT_ID_IMAGES = "api client id"
```

4. Inicia el Servidor de Desarrollo:

Usando npm:

```bash
npm run dev
```

La API estará disponible en http://localhost:puerto.