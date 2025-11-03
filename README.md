🧬 Rick & Morty React App

Aplicación desarrollada con React + TypeScript + Vite, que consume la API pública de Rick and Morty y la API pública de Fake Store.

🚀 Requisitos del entorno

Asegúrate de tener instaladas las siguientes versiones (o superiores):

Herramienta	Versión recomendada
Node.js	v20.15.0
npm	v10.8.2
Vite	^7.1.7

💡 Tip: Puedes verificar tus versiones ejecutando:

node -v
npm -v

⚙️ Instalación y ejecución

Clona el repositorio y ejecuta los siguientes comandos:

# Instalar dependencias
npm install

# Correr el entorno de desarrollo
npm run dev

# Ver en producción localmente (tras el build)
npm run preview

🏗️ Scripts disponibles
Comando	Descripción
npm run dev	Levanta el servidor de desarrollo con Vite.
npm run build	Genera el build de producción en la carpeta /dist.
npm run preview	Sirve la build para probarla localmente.
npm run lint	Ejecuta ESLint para verificar la calidad del código.

🌍 Variables de entorno

El proyecto utiliza archivos .env para manejar los diferentes entornos (por defecto, Vite carga .env.development al ejecutar npm run dev).

📄 Archivo .env.development

Crea un archivo en la ruta src/config del proyecto con el siguiente contenido:

VITE_API_RM=https://rickandmortyapi.com/api
VITE_API_PRODUCTS=https://fakestoreapi.com


🔸 Importante: Todas las variables deben comenzar con el prefijo VITE_
🔸 Vite las carga automáticamente según el entorno (npm run dev → .env.development)

Puedes acceder a las variables directamente desde tu código con:

import.meta.env.VITE_API_RM

🧭 Centralización de variables (src/config/env.ts)

Para mantener el código limpio, las variables se centralizan en un archivo de configuración:

src/config/env.ts

export const ENV = {
  API_RM: import.meta.env.VITE_API_RM,
  API_PRODUCTS: import.meta.env.VITE_API_PRODUCTS,
};


Uso en tu aplicación:

import { ENV } from "@/config/env"; // o "../config/env"

fetch(`${ENV.API_RM}/character`);
fetch(`${ENV.API_PRODUCTS}/products`);


🧩 Dependencias principales

React 19 — Librería principal para la UI.

React Router DOM 7 — Manejo de rutas SPA.

React Hook Form + Zod — Manejo y validación de formularios.

Zustand — Manejo de estado global.

Bootstrap 5 — Estilos y componentes predefinidos.

Moment.js — Formateo de fechas.

🔐 Credenciales de acceso (login simulado)

Para ingresar al sistema, utiliza las siguientes credenciales de ejemplo:
(Puede usar cualquier correo que respete el formato de correo y cualquier contraseña
que respete minimo 6 y maximo 12 caracteres)

Correo: admin@rickmorty.com
Contraseña: 123456

⏱️ Sesión y cierre automático

Por motivos de seguridad y usabilidad, la sesión del usuario expira automáticamente después de 5 minutos de inactividad.
Si no se detecta actividad dentro de ese periodo (movimientos o clics en la aplicación), el sistema cerrará la sesión y redirigirá al login.

💡 Este comportamiento se gestiona mediante un hook personalizado (useSessionGuard) y el estado global controlado por Zustand.

🧱 Estructura del proyecto (resumen)
rick-morty-react/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── store/
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

🧰 Build de producción

Para generar una build lista para producción, ejecuta:

npm run build

Esto generará la carpeta /dist que puedes desplegar en servicios como Netlify, Vercel, o GitHub Pages.