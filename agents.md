# Documentación del Proyecto Frontend (RegistroCredito.Web) para Agentes de IA

Este documento sirve como base de conocimiento para cualquier agente de IA que interactúe con este repositorio. Define las reglas estrictas de desarrollo, la arquitectura y el lenguaje de diseño a mantener.

## 1. Stack Tecnológico
- **Framework Principal:** Angular 18 (Arquitectura Standalone estricta, sin `app.module.ts`).
- **Gestor de Paquetes:** `pnpm` (ESTRICTAMENTE PROHIBIDO usar `npm` o `yarn`).
- **Diseño y Estilos:** Tailwind CSS (versión 3) + Angular Material.
- **Interacciones / UX:** SweetAlert2 para modales y notificaciones.
- **Lenguaje:** TypeScript estricto.

## 2. Lenguaje de Diseño y UI/UX (Estilo "Vivas")
El diseño actual emula un **SaaS Moderno** con una paleta vibrante inspirada en la marca "Vivas":
- **Paleta de Colores (Brand):** Verde Esmeralda Vibrante (definido en `tailwind.config.js`). El color primario es `#059669` (botones) y `#10b981` (acentos).
- **Surface/Fondo:** Modo claro. Fondos limpios (`slate-50` / `white`), sombras suaves (`shadow-lg`, `shadow-sm`) y bordes redondeados (`rounded-xl`, `rounded-2xl`, `rounded-3xl`).
- **Angular Material Overrides:** Los inputs usan `.mdc-notched-outline` sobrescrito en `styles.css` para tener bordes grises (`#cbd5e1`) y verdes en focus, eliminando el estilo negro agresivo por defecto de Material.
- **Modales:** Cero `MatSnackBar`. Toda alerta de éxito o error en los servicios debe utilizar `Swal.fire` (SweetAlert2) para una UX interactiva y amigable.

## 3. Estructura de la Aplicación
El proyecto sigue una estructura Feature-Driven:
- `src/app/core/`: Contiene guards (`auth.guard.ts`), interceptores (`jwt.interceptor.ts`) y servicios de estado global (`auth.service.ts`).
- `src/app/features/auth/`: Lógica de autenticación (`LoginComponent`).
- `src/app/features/credits/`: Lógica de negocio.
  - `credit-registration`: Formulario reactivo para radicar créditos.
  - `credit-list`: Data table de Angular Material (`MatTable`) con paginación, filtros y formateo de datos (`DatePipe`, `CurrencyPipe`, `PercentPipe`) adornados con "badges" de colores.

## 4. Reglas Estrictas de Desarrollo
1. **Pnpm:** Ejecutar `pnpm install`, `pnpm start`, `pnpm build`.
2. **Cero Tailwind Preflight:** La directiva `corePlugins: { preflight: false }` DEBE mantenerse en `tailwind.config.js`. Angular Material se rompe visualmente (los bordes colapsan) si se activa el preflight de Tailwind.
3. **Forms Reactivos:** Todos los formularios deben usar `ReactiveFormsModule` y el helper moderno `inject(FormBuilder)`.
4. **Standalone Components:** Todos los componentes se deben generar usando `standalone: true`. Las dependencias (Módulos de Material, Pipes, etc.) se declaran explícitamente en el arreglo `imports: []` del decorador `@Component`.
5. **Inyección de Dependencias:** Usar la función `inject()` de Angular 14+ en lugar de inyectar dependencias en el constructor.
6. **Manejo de Tokens (CORS):** El interceptor `jwt.interceptor.ts` clona las peticiones HTTP agregando el Bearer token (almacenado en `localStorage`).

## 5. Testing y Calidad
- **Unit Testing (Karma/Jasmine):** Los tests deben evaluar el comportamiento, no la sintaxis. Los servicios deben usar `HttpTestingController` para simular respuestas HTTP, validando los payloads, las URLs enviadas y la persistencia en `localStorage`.
- **UI Testing:** Validar renderizado DOM usando scripts locales de Playwright en la carpeta *scratch* si es necesario confirmar detalles de UI.

## 6. Despliegue y CI/CD
- **Dockerfile & Nginx:** El proyecto cuenta con un `Dockerfile` multi-stage que utiliza Nginx. El archivo `nginx.conf` contiene un `try_files` esencial para manejar el enrutamiento SPA de Angular en entornos Dockerizados.
- **Vercel & GitHub Actions:** Existe un pipeline en `.github/workflows/deploy.yml` configurado para compilar con pnpm y hacer deploy nativo a Vercel, y construir una imagen Docker, al hacer merge en `master`.
