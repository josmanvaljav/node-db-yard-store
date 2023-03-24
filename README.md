PACKAGE.JSON FILE:
-------------------

{
  "name": "yard-store",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
# arranca ambiente de desarrollo
    "dev": "nodemon index.js",
# arranca ambiente de producción
    "start": "node index.js",
    "lint": "eslint"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
# Genera data aleatoria
    "@faker-js/faker": "^7.6.0",
# Configuración inicial
    "eslint": "^8.36.0",
    "eslint-config-prettier": "^8.7.0",
    "eslint-plugin-prettier": "^4.2.1",
    "nodemon": "^2.0.21",
    "prettier": "^2.8.4"
# Manejo de "Migraciones" para control de versiones de base de datos
    "sequelize-cli": "^6.6.0"
  },
  "dependencies": {
# Manejo de errores
    "@hapi/boom": "^10.0.1",
# Manejo de cors
    "cors": "^2.8.5",
# Reconoce variables de entonce configurados en .env
    "dotenv": "^16.0.3",
# Framework backend de node
    "express": "^4.18.2",
# Genera data aleatoria (desactualizado)
    "faker": "^6.6.6",
# Trabajo con Schema y validación de datos de entrada
    "joi": "^17.8.4",
# Drivers de MYSQL
    "mysql2": "^3.2.0",
# Gestión de Pool de conexiones / drivers de Postgres
    "pg": "^8.10.0",
# Encampsula Transacciones con la BD uncluido Pool de conexiones
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.29.3"
  }
}
