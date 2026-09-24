# Stock Nova

Sistema web de gestión de inventario desarrollado como proyecto full-stack.

Stock Nova permite gestionar productos, categorías, proveedores e inventario mediante una aplicación web con autenticación, control de roles, dashboard, filtros y conexión con una base de datos PostgreSQL.

---

# 🚀 Características principales

- 🔐 Autenticación de usuarios mediante JWT.
- 🔒 Control de acceso mediante roles.
- 📦 Gestión de productos.
- 🏷️ Gestión de categorías.
- 🚚 Gestión de proveedores.
- 📥 Registro de entradas de inventario.
- 📤 Registro de salidas de inventario.
- 📋 Historial de movimientos.
- 📊 Dashboard con estadísticas reales.
- 💰 Cálculo del valor total del inventario.
- ⚠️ Detección de productos con stock bajo.
- 💱 Consulta de tasa de cambio mediante API externa.
- 🔎 Búsqueda y filtros en productos.
- 🔎 Búsqueda y filtros en categorías.
- 🔎 Búsqueda y filtros en proveedores.
- 🔎 Búsqueda y filtros en movimientos de inventario.
- 👤 Perfil de usuario.
- 🔑 Cambio de contraseña.
- 📱 Diseño responsive.

---

# 🛠️ Tecnologías utilizadas

## Frontend

- React
- TypeScript
- Vite
- Axios
- React Router

## Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- JWT
- bcrypt
- CORS

## Base de datos

- PostgreSQL

## Herramientas

- Visual Studio Code
- Git
- GitHub

---

# 💻 Requisitos previos

Antes de instalar y ejecutar Stock Nova necesitas tener instalados los siguientes programas:

## 1. Node.js

Descarga Node.js desde:

https://nodejs.org/

Se recomienda utilizar una versión LTS.

Comprueba que Node.js esté instalado:

```powershell
node -v
```

Comprueba npm:

```powershell
npm -v
```

---

## 2. PostgreSQL

Stock Nova utiliza PostgreSQL como sistema de base de datos.

Descarga PostgreSQL desde:

https://www.postgresql.org/download/

Durante la instalación debes recordar:

- Usuario de PostgreSQL.
- Contraseña de PostgreSQL.
- Puerto de PostgreSQL.

El puerto utilizado normalmente es:

```text
5432
```

Comprueba PostgreSQL con:

```powershell
psql --version
```

También puedes administrar PostgreSQL mediante pgAdmin.

---

## 3. Git

Git es necesario para descargar el proyecto desde GitHub.

Descarga Git desde:

https://git-scm.com/downloads

Comprueba la instalación:

```powershell
git --version
```

---

## 4. Visual Studio Code

Se recomienda utilizar Visual Studio Code para abrir, ejecutar y modificar el proyecto.

Descarga Visual Studio Code desde:

https://code.visualstudio.com/

---

# 📥 Descargar el proyecto

## 1. Clonar el repositorio

Abre una terminal y ejecuta:

```powershell
git clone https://github.com/Jesusalbt77/StockNova.git
```

Después entra en la carpeta del proyecto:

```powershell
cd StockNova
```

---

# 📁 Estructura principal

Después de clonar el proyecto encontrarás:

```text
StockNova/
│
├── backend/
├── frontend/
├── .gitignore
└── README.md
```

El proyecto está dividido en dos aplicaciones principales:

```text
Frontend
   ↓
Backend
   ↓
PostgreSQL
```

---

# ⚙️ CONFIGURACIÓN DEL BACKEND

## 2. Entrar en la carpeta backend

Desde la raíz del proyecto:

```powershell
cd backend
```

---

## 3. Instalar las dependencias del backend

Ejecuta:

```powershell
npm install
```

En Windows PowerShell, si `npm` está bloqueado, utiliza:

```powershell
npm.cmd install
```

---

# 🗄️ CONFIGURAR POSTGRESQL

## 4. Crear la base de datos

Stock Nova necesita una base de datos PostgreSQL.

Puedes crearla utilizando pgAdmin o `psql`.

El nombre utilizado actualmente por la configuración del proyecto es:

```text
stockflux
```

### Crear la base de datos utilizando psql

Abre `psql` y ejecuta:

```sql
CREATE DATABASE stockflux;
```

Después puedes comprobar que la base de datos existe.

> También puedes utilizar otro nombre para la base de datos, pero en ese caso debes utilizar ese mismo nombre en la variable `DATABASE_URL` del archivo `.env`.

---

# 🔐 CONFIGURAR LAS VARIABLES DE ENTORNO

## 5. Crear el archivo `.env`

Dentro de:

```text
StockNova/backend/
```

existe un archivo de referencia llamado:

```text
.env.example
```

Debes crear un archivo:

```text
.env
```

Puedes copiar `.env.example`.

En PowerShell:

```powershell
Copy-Item .env.example .env
```

Después abre:

```text
StockNova/backend/.env
```

y configura sus valores.

Ejemplo:

```env
DATABASE_URL="postgresql://postgres:TU_CONTRASEÑA@localhost:5432/stockflux"
JWT_SECRET=TU_SECRETO_JWT
PORT=3000
```

Debes sustituir:

```text
TU_CONTRASEÑA
```

por la contraseña real de PostgreSQL.

También debes establecer un valor propio para:

```text
JWT_SECRET
```

Por ejemplo:

```env
DATABASE_URL="postgresql://postgres:MiPassword@localhost:5432/stockflux"
JWT_SECRET=una_clave_segura_para_stock_nova
PORT=3000
```

---

# ⚠️ SEGURIDAD DEL ARCHIVO `.env`

Nunca publiques tu archivo `.env`.

No debes subir a GitHub:

- Contraseñas.
- JWT_SECRET.
- Tokens.
- Claves privadas.
- Credenciales.
- Información sensible.

El proyecto utiliza `.gitignore` para impedir que el archivo `.env` sea incluido accidentalmente en Git.

El archivo que sí puede publicarse como referencia es:

```text
.env.example
```

---

# 🧬 CONFIGURAR PRISMA

## 6. Generar Prisma Client

Desde:

```text
StockNova/backend
```

ejecuta:

```powershell
npx prisma generate
```

En Windows PowerShell:

```powershell
npx.cmd prisma generate
```

Este comando genera Prisma Client para que el backend pueda comunicarse con PostgreSQL mediante Prisma.

---

## 7. Sincronizar la base de datos

Después ejecuta:

```powershell
npx prisma db push
```

En Windows PowerShell:

```powershell
npx.cmd prisma db push
```

Este comando sincroniza el esquema definido en Prisma con la base de datos PostgreSQL.

---

# ✅ COMPROBAR EL BACKEND ANTES DE INICIARLO

Antes de levantar el backend comprueba que:

```text
PostgreSQL
✅ Está funcionando.

Base de datos
✅ Existe.

.env
✅ Está configurado.

Prisma Client
✅ Fue generado.

Prisma schema
✅ Fue sincronizado.
```

---

# ▶️ LEVANTAR EL BACKEND

## 8. Iniciar el servidor

Desde:

```text
C:\StockNova\backend
```

ejecuta:

```powershell
npm run dev
```

En Windows PowerShell:

```powershell
npm.cmd run dev
```

Si todo funciona correctamente aparecerá un mensaje similar a:

```text
Stock Nova API ejecutándose en http://localhost:3000
```

El backend quedará disponible en:

```text
http://localhost:3000
```

---

# ❤️ COMPROBAR QUE EL BACKEND FUNCIONA

Abre el navegador y visita:

```text
http://localhost:3000/api/health
```

Deberías recibir una respuesta similar a:

```json
{
  "success": true,
  "message": "Stock Nova API funcionando"
}
```

Si aparece esa respuesta, significa que el backend está funcionando correctamente.

---

# 💻 CONFIGURACIÓN DEL FRONTEND

## 9. Abrir una segunda terminal

No cierres la terminal donde está funcionando el backend.

En Visual Studio Code puedes abrir otra terminal desde:

```text
Terminal → New Terminal
```

---

## 10. Entrar en la carpeta frontend

Puedes utilizar:

```powershell
cd C:\StockNova\frontend
```

---

## 11. Instalar las dependencias del frontend

Ejecuta:

```powershell
npm install
```

En Windows PowerShell:

```powershell
npm.cmd install
```

Esto instalará React, Vite, Axios, React Router y las demás dependencias definidas por el proyecto.

---

# ▶️ LEVANTAR EL FRONTEND

## 12. Iniciar Vite

Desde:

```text
C:\StockNova\frontend
```

ejecuta:

```powershell
npm run dev
```

En Windows PowerShell:

```powershell
npm.cmd run dev
```

Vite mostrará una dirección similar a:

```text
Local: http://localhost:5173/
```

---

# 🌐 ABRIR STOCK NOVA

Después de iniciar el frontend, abre en el navegador:

```text
http://localhost:5173/
```

Ahí podrás acceder a Stock Nova.

---

# 🔄 EJECUTAR TODO EL PROYECTO

Para utilizar Stock Nova localmente necesitas tener funcionando:

```text
PostgreSQL
     ↓
Backend
     ↓
Frontend
```

---

# 🪟 EJECUTAR STOCK NOVA DESDE VISUAL STUDIO CODE

La forma recomendada en Windows es utilizar dos terminales.

## Terminal 1 — Backend

Abre una terminal y ejecuta:

```powershell
cd C:\StockNova\backend
```

Después:

```powershell
npm.cmd run dev
```

Mantén esta terminal abierta.

---

## Terminal 2 — Frontend

Abre una segunda terminal y ejecuta:

```powershell
cd C:\StockNova\frontend
```

Después:

```powershell
npm.cmd run dev
```

Mantén esta terminal abierta.

---

## Navegador

Abre:

```text
http://localhost:5173/
```

---

# 🔌 PUERTOS UTILIZADOS

## PostgreSQL

```text
5432
```

## Backend

```text
3000
```

URL:

```text
http://localhost:3000
```

## Frontend

```text
5173
```

URL:

```text
http://localhost:5173/
```

---

# 🪟 NOTA IMPORTANTE PARA WINDOWS POWERSHELL

En algunos equipos Windows, PowerShell puede bloquear directamente:

```text
npm
npx
```

En ese caso utiliza las versiones:

```text
npm.cmd
npx.cmd
```

Por ejemplo:

```powershell
npm.cmd install
```

```powershell
npm.cmd run dev
```

```powershell
npx.cmd prisma generate
```

```powershell
npx.cmd prisma db push
```

---

# 🧰 GUÍA COMPLETA DESDE CERO

Esta sección resume todo el proceso para una persona que acaba de descargar Stock Nova.

## Paso 1 — Clonar

```powershell
git clone https://github.com/Jesusalbt77/StockNova.git
```

```powershell
cd StockNova
```

## Paso 2 — Configurar PostgreSQL

Crear una base de datos llamada:

```text
stockflux
```

## Paso 3 — Entrar al backend

```powershell
cd backend
```

## Paso 4 — Instalar dependencias

```powershell
npm.cmd install
```

## Paso 5 — Crear `.env`

```powershell
Copy-Item .env.example .env
```

Después configurar:

```env
DATABASE_URL="postgresql://postgres:TU_CONTRASEÑA@localhost:5432/stockflux"
JWT_SECRET=TU_SECRETO_JWT
PORT=3000
```

## Paso 6 — Generar Prisma

```powershell
npx.cmd prisma generate
```

## Paso 7 — Sincronizar PostgreSQL

```powershell
npx.cmd prisma db push
```

## Paso 8 — Levantar backend

```powershell
npm.cmd run dev
```

El backend estará en:

```text
http://localhost:3000
```

## Paso 9 — Abrir una segunda terminal

```powershell
cd C:\StockNova\frontend
```

## Paso 10 — Instalar dependencias del frontend

```powershell
npm.cmd install
```

## Paso 11 — Levantar frontend

```powershell
npm.cmd run dev
```

## Paso 12 — Abrir el navegador

```text
http://localhost:5173/
```

---

# 🔎 COMPROBAR TYPESCRIPT

Para comprobar que el frontend no tiene errores de TypeScript:

```powershell
cd C:\StockNova\frontend
```

Después:

```powershell
npx.cmd tsc --noEmit
```

Si el comando termina sin mostrar errores, la comprobación de TypeScript se completó correctamente.

---

# 📁 ESTRUCTURA DEL PROYECTO

```text
StockNova/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── server.ts
│   │   └── ...
│   │
│   ├── prisma/
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── ...
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# 🔐 AUTENTICACIÓN

Stock Nova utiliza:

- JWT para autenticación.
- bcrypt para proteger las contraseñas.
- Middleware de autenticación.
- Control de acceso mediante roles.
- Protección de rutas.

Las operaciones administrativas están protegidas mediante autorización por roles.

---

# 📊 DASHBOARD

El Dashboard obtiene datos reales desde el backend.

Actualmente muestra:

- Total de productos.
- Total de categorías.
- Productos con stock bajo.
- Movimientos de inventario.
- Valor total del inventario.
- Estado general del inventario.

Los datos mostrados provienen de la información almacenada en PostgreSQL.

---

# 📦 GESTIÓN DE INVENTARIO

Stock Nova permite registrar:

## Entrada

Aumenta el stock disponible de un producto.

## Salida

Disminuye el stock disponible de un producto.

El sistema valida que una salida no supere la cantidad disponible en stock.

También mantiene un historial de movimientos con:

- Producto.
- Tipo de movimiento.
- Cantidad.
- Usuario.
- Fecha.

---

# 🔎 BÚSQUEDA Y FILTROS

## Productos

- Búsqueda por nombre.
- Sugerencias de productos.
- Filtro por categoría.
- Filtro de stock bajo.
- Ordenamiento por ID.

## Categorías

- Búsqueda por nombre.
- Ordenamiento por ID.

## Proveedores

- Búsqueda por nombre.
- Búsqueda por correo.
- Búsqueda por teléfono.

## Inventario

- Búsqueda por producto.
- Búsqueda por usuario.
- Búsqueda por correo.
- Filtro por entradas.
- Filtro por salidas.
- Ordenamiento por ID.

---

# 🚚 PROVEEDORES

Stock Nova permite:

- Crear proveedores.
- Editar proveedores.
- Eliminar proveedores.
- Buscar proveedores.
- Consultar nombre.
- Consultar correo.
- Consultar teléfono.

Las operaciones administrativas de proveedores están protegidas mediante autenticación y autorización por roles.

---

# 🏷️ CATEGORÍAS

Stock Nova permite:

- Crear categorías.
- Editar categorías.
- Eliminar categorías.
- Buscar categorías.
- Ordenar categorías por ID.
- Validar nombres duplicados.

---

# 📦 PRODUCTOS

Stock Nova permite:

- Crear productos.
- Editar productos.
- Eliminar productos.
- Buscar productos.
- Filtrar por categoría.
- Filtrar por stock bajo.
- Ordenar por ID.
- Gestionar precio.
- Gestionar stock mínimo.

---

# 👤 PERFIL DE USUARIO

El sistema incluye un perfil de usuario accesible desde el menú superior.

Funciones disponibles:

- Consultar información del usuario.
- Actualizar información del perfil.
- Cambiar contraseña.
- Cerrar sesión.

---

# 💱 TASA DE CAMBIO

Stock Nova utiliza una API externa para consultar información de tasa de cambio.

Endpoint interno:

```text
GET /api/exchange-rate
```

---

# 🔌 API REST

El backend de Stock Nova utiliza una API REST desarrollada con Express.

## Health

```text
GET /api/health
```

## Autenticación

```text
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me
PUT  /api/auth/profile
PUT  /api/auth/change-password
```

## Productos

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

## Categorías

```text
GET    /api/categories
POST   /api/categories
PUT    /api/categories/:id
DELETE /api/categories/:id
```

## Inventario

```text
POST /api/inventory/entry
POST /api/inventory/exit
GET  /api/inventory/movements
```

## Proveedores

```text
GET    /api/suppliers
GET    /api/suppliers/:id
POST   /api/suppliers
PUT    /api/suppliers/:id
DELETE /api/suppliers/:id
```

## Dashboard

```text
GET /api/dashboard
```

## Tasa de cambio

```text
GET /api/exchange-rate
```

---

# 🔄 COMUNICACIÓN ENTRE FRONTEND Y BACKEND

La aplicación funciona mediante la siguiente arquitectura:

```text
                    STOCK NOVA

          ┌─────────────────────────┐
          │        FRONTEND         │
          │ React + TypeScript      │
          │ Vite                    │
          └────────────┬────────────┘
                       │
                       │ HTTP / Axios
                       ↓
          ┌─────────────────────────┐
          │         BACKEND         │
          │ Node.js + Express       │
          │ TypeScript              │
          │ JWT + bcrypt            │
          └────────────┬────────────┘
                       │
                       │ Prisma
                       ↓
          ┌─────────────────────────┐
          │       POSTGRESQL        │
          │       Base de datos     │
          └─────────────────────────┘
```

---

# 🎯 OBJETIVO DEL PROYECTO

Stock Nova fue desarrollado como proyecto práctico para trabajar conceptos de desarrollo web full-stack, incluyendo:

- React.
- TypeScript.
- Node.js.
- Express.
- APIs REST.
- Prisma ORM.
- PostgreSQL.
- JWT.
- bcrypt.
- Autenticación.
- Autorización por roles.
- Validaciones.
- Gestión de inventario.
- Integración entre frontend y backend.
- Git.
- GitHub.
- Diseño de interfaces administrativas.

---

# 📌 ESTADO DEL PROYECTO

Stock Nova continúa en desarrollo y recibe mejoras de:

- Funcionalidad.
- Seguridad.
- Validaciones.
- Interfaz.
- Experiencia de usuario.
- Documentación.
- Preparación para portfolio.

---

# 👨‍💻 REPOSITORIO

GitHub:

https://github.com/Jesusalbt77/StockNova

---

# 📄 LICENCIA

Este proyecto se publica como proyecto de portfolio y aprendizaje.