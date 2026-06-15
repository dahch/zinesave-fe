# ZineSave App

## Descripción
ZineSave App es una aplicación web moderna construida con [Next.js](https://nextjs.org) y [Tailwind CSS](https://tailwindcss.com) que permite a los usuarios convertir artículos web en formatos optimizados para lectura y guardarlos directamente en sus servicios de almacenamiento en la nube preferidos.

## Características Principales
*   **Conversión de Artículos**: Transforma URLs de artículos en formatos limpios y descargables.
*   **Gestión de Descargas**: Descarga directa de los archivos procesados.
*   **Integración Cloud**: Conexión con servicios como Google Drive, Dropbox y OneDrive para guardar los archivos convertidos.
*   **Interfaz Moderna**: UI responsiva y amigable diseñada con Tailwind CSS.

## Tecnologías Utilizadas
*   **Framework**: Next.js 16 (App Router)
*   **Biblioteca UI**: React 19
*   **Estilos**: Tailwind CSS 3
*   **Arquitectura**: Feature-Sliced Design (FSD)
*   **Gestión de Estado**: Zustand
*   **Data Fetching**: TanStack Query
*   **Cliente HTTP**: Axios
*   **Validación**: Zod
*   **Testing**: Vitest & React Testing Library
*   **Iconos**: Lucide React
*   **Notificaciones**: Sonner

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
*   [Node.js](https://nodejs.org/) (versión LTS recomendada)
*   [pnpm](https://pnpm.io/) (utilizado como gestor de paquetes)

## Instalación

1.  **Clonar el repositorio**:
    ```bash
    git clone <url-del-repositorio>
    cd zinesave-app
    ```

2.  **Instalar dependencias**:
    ```bash
    pnpm install
    ```

## Configuración y Variables de Entorno (.env)

El proyecto requiere ciertas variables de entorno para funcionar correctamente, especialmente para comunicarse con el backend.

Crea un archivo `.env` en la raíz del proyecto. Puedes basarte en el siguiente ejemplo:

```bash
# URL de la API Backend (FastAPI)
# Por defecto se asume que el backend corre en el puerto 8000 localmente
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Descripción de Variables
*   `NEXT_PUBLIC_API_URL`: La dirección base donde se encuentra escuchando el servicio backend. Es utilizada por el cliente Axios para realizar todas las peticiones de la API.

## Ejecución

### Entorno de Desarrollo
Para iniciar el servidor de desarrollo con _Hot Reloading_:

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

### Construcción para Producción
Para crear una versión optimizada para producción:

```bash
pnpm build
```

Una vez construido, puedes iniciar el servidor de producción:

```bash
pnpm start
```

### Linting
Para ejecutar el linter y verificar la calidad del código:

```bash
pnpm lint
```

### Testing
Para ejecutar la suite de pruebas unitarias (TDD):

```bash
pnpm test
```

## Estructura del Proyecto (Feature-Sliced Design)

El proyecto sigue estrictamente la arquitectura **Feature-Sliced Design (FSD)**:

*   `src/app`: Capa de enrutamiento estricto (Next.js App Router).
*   `src/widgets`: Bloques UI complejos que componen vistas usando características y entidades (ej. Header, Formularios complejos).
*   `src/features`: Lógica de dominio desacoplada y acciones de usuario (ej. hooks de procesamiento, gestión de estado de pago).
*   `src/entities`: Modelos de negocio y stores globales (ej. Autenticación).
*   `src/shared`: Código genérico, componentes UI base, configuración de la API, esquemas Zod, logs estructurados y utilidades.
*   `public`: Archivos estáticos públicos (imágenes, iconos).
