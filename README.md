# Proyecto Integrador — Backend

API REST desarrollada con **Node.js + Express** para un e-commerce. Permite el registro y autenticación de usuarios, gestión de órdenes de compra y recepción de mensajes de contacto.

---

## 🔗 Links

| | URL |
|---|---|
| **Deploy (Render)** | https://proyecto-integrador-backen.onrender.com |
| **Repositorio** | https://github.com/patrycast/proyecto-integrador-Backen |
| **Frontend (Vercel)** | https://proyecto-integrador-react-zeta.vercel.app |
| **Frontend repo** | https://github.com/patrycast/proyecto-integrador-react |

---

## 🛠️ Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Base de datos:** MongoDB (Mongoose)
- **Autenticación:** JWT (Access Token + Refresh Token)
- **Encriptación:** bcrypt
- **Validaciones:** express-validator
- **Deploy:** Render

---

## 📁 Estructura del proyecto

```
proyecto-integrador-Backen/
├── controller/        # Lógica de negocio
│   ├── auth.js
│   ├── orders.js
│   └── contact.js
├── routes/            # Definición de rutas
│   ├── auth.js
│   ├── orders.js
│   └── contact.js
├── middlewares/       # Middlewares personalizados
│   ├── connect.js     # Conexión a MongoDB
│   ├── protect.js     # Verificación JWT
│   ├── hash.js        # Encriptación de contraseña
│   └── hasErrors.js   # Manejo de errores de validación
├── models/            # Modelos de Mongoose
├── validations/       # Validaciones por entidad
│   ├── register.js
│   ├── login.js
│   ├── confirm.js
│   └── order.js
├── utils/             # Funciones auxiliares
├── app.js             # Configuración principal de Express
└── package.json
```

## 🚀 Instalación y uso local


```

El servidor corre por defecto en `http://localhost:3030`

---

## 📋 Documentación de Endpoints

**Base URL:** `https://proyecto-integrador-backen.onrender.com`

Los endpoints protegidos requieren el siguiente header:
```
Authorization: Bearer <access_token>
```

### 🔐 Autenticación — `/auth`

#### `POST /auth/register`
Registra un nuevo usuario.

---

#### `POST /auth/login`
Autentica al usuario y devuelve un access token y un refresh token.

---

#### `POST /auth/refresh`
Genera un nuevo access token usando un refresh token válido.

```

#### `GET /auth/confirm?token=<token>`
Confirma la cuenta del usuario mediante el token recibido por email.

---

### 🛒 Órdenes — `/orders`

#### `POST /orders` 🔒
Crea una nueva orden de compra para el usuario autenticado.

---

#### `GET /orders` 🔒
Devuelve el historial de órdenes del usuario autenticado.

---

### 📬 Contacto — `/contact`

#### `POST /contact`
Recibe el formulario de contacto enviado desde el frontend.


---

## 🔄 Flujo de uso recomendado

```
1. POST /auth/register       → Crear cuenta
2. GET  /auth/confirm?token= → Confirmar email (link recibido por mail)
3. POST /auth/login          → Iniciar sesión → obtener tokens
4. POST /orders              → Crear orden (con Bearer token)
5. GET  /orders              → Ver historial de órdenes
6. POST /auth/refresh        → Renovar access token cuando expire
7. POST /contact             → Enviar mensaje de contacto
```

---

## 🧪 Probar la API

Podés probar todos los endpoints directamente desde el frontend deployado:

👉 **https://proyecto-integrador-react-zeta.vercel.app**

O con herramientas como **Postman** o **Thunder Client** usando la base URL:

```
https://proyecto-integrador-backen.onrender.com
```

> ⚠️ El servidor en Render puede tardar unos segundos en responder si estuvo inactivo (cold start del plan gratuito).

---

## 👩‍💻 Autora

**Patricia Castillo**  
GitHub: [@patrycast](https://github.com/patrycast)
