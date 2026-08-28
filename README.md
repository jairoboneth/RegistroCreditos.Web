# 🚀 Registro Créditos Web (Frontend)

Aplicación frontend moderna para la gestión, radicación y consulta de créditos, construida con **Angular 18 (Standalone)**, **Tailwind CSS** y **Angular Material**.

Este proyecto ha sido diseñado priorizando una arquitectura limpia, una interfaz de usuario minimalista y vibrante inspirada en plataformas SaaS (estilo Vivas), y listo para producción con contenedores Docker y despliegue automatizado.

---

## 🛠️ Stack Tecnológico

- **Framework:** [Angular 18](https://angular.io/) (Arquitectura 100% Standalone).
- **Estilos y UI:** [Tailwind CSS v3](https://tailwindcss.com/) + [Angular Material](https://material.angular.io/).
- **Manejo de Paquetes:** [pnpm](https://pnpm.io/) (Requerido).
- **Notificaciones/Modales:** [SweetAlert2](https://sweetalert2.github.io/).
- **CI/CD:** GitHub Actions + Vercel + Docker.

---

## ⚙️ Requisitos Previos

Antes de ejecutar este proyecto localmente, asegúrate de tener instalado:
1. **Node.js** (v18 o superior).
2. **pnpm** (puedes activarlo corriendo `corepack enable` en tu terminal).

---

## 🚀 Instalación y Uso Local

1. **Clonar el repositorio:**
   ```bash
   git clone [<URL_DEL_REPOSITORIO>](https://github.com/jairoboneth/RegistroCreditos.Web.git)
   cd RegistroCredito.Web
   ```

2. **Instalar las dependencias (usando pnpm estrictamente):**
   ```bash
   pnpm install
   ```

3. **Ejecutar el servidor de desarrollo local:**
   ```bash
   pnpm start
   ```
   > Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en el código.
   > **Nota:** Por defecto, el entorno local apunta a la API en `http://localhost:5295/api`. Asegúrate de tener el backend (.NET) corriendo en esa dirección.

---

## 🌍 Variables de Entorno y Despliegue (CI/CD)

A diferencia de las APIs tradicionales, este proyecto Angular utiliza un enfoque moderno de inyección en tiempo de compilación (*build time*) para manejar las variables de entorno.

### Estructura de Entornos
- `src/environments/environment.development.ts`: Usado automáticamente al correr `pnpm start` (apunta al backend local).
- `src/environments/environment.ts`: Usado al construir la aplicación para producción.

### Inyección Dinámica
El comando de compilación (`pnpm build`) ejecuta un script (`set-env.js`) que sobreescribe dinámicamente `environment.ts` con la URL de tu API remota si encuentra la variable de sistema `API_URL`.

### Cómo desplegar (Vercel)
Si tienes el repositorio conectado a **Vercel** o si utilizas nuestros **GitHub Actions** (`.github/workflows/deploy.yml`), solo debes asegurarte de ir a los *Settings* del proyecto en tu plataforma de alojamiento y configurar el siguiente secreto:

- **Nombre de la Variable:** `API_URL`
- **Valor:** `https://tu-backend.railway.app/api`

---

## 📦 Docker y Despliegues On-Premise

El proyecto cuenta con un `Dockerfile` optimizado y multi-etapa que utiliza `Nginx` para servir la SPA de forma nativa. 

Para construir y ejecutar localmente con Docker:

```bash
# Construir la imagen
docker build -t registro-creditos-web .

# Ejecutar el contenedor (expuesto en el puerto 8080 local)
docker run -p 8080:80 registro-creditos-web
```

> **Importante:** Recuerda que para Docker, también debes inyectar la URL del backend al momento del build pasando el argumento si editas el `Dockerfile` o simplemente asegurándote de que `environment.ts` esté actualizado antes de construir el contenedor.

---

## 🎨 Diseño (UI/UX)

La aplicación ha sido customizada anulando los bordes oscuros rígidos de Angular Material. Usa Tailwind para inyectar una paleta de color **"Brand Emerald"** (`#10b981`). Los colores se extienden al Navbar, Data Tables (que cuentan con paginación y filtrado), insignias (badges) y alertas tipo popup.

## 🧪 Pruebas Unitarias

El proyecto cuenta con pruebas robustas basadas en el comportamiento usando Jasmine y Karma (`HttpTestingController`). Para ejecutar las pruebas:

```bash
pnpm test
```
