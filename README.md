# 🚀 Modern Monorepo — Fullstack Store

Este es un proyecto personal dedicado a la práctica y dominio de arquitecturas modernas y escalables en el ecosistema JavaScript/TypeScript. Se trata de un **Monorepo** que implementa una tienda virtual completa, integrando un frontend robusto con un backend modular.

---

## 🏗️ Arquitectura y Metodologías

El proyecto destaca por el uso de patrones de diseño avanzados:

- **Feature-Sliced Design (FSD)**: En `apps/web` se implementa esta arquitectura para garantizar la modularidad, mantenibilidad y escalabilidad del frontend.
- **Clean Architecture Principles**: El backend (`apps/api`) sigue principios de modularidad y separación de capas para facilitar la evolución del sistema.
- **Shared Package Pattern**: Tipado unificado mediante un paquete de tipos compartido (`@repo/types`).

---

## 📦 Stack Tecnológico

| Herramienta | Rol |
|---|---|
| [Next.js 15+](https://nextjs.org/) | **Frontend** — React con App Router y Server Components |
| [NestJS 11](https://nestjs.com/) | **Backend** — API REST modular y escalable |
| [Supabase Auth](https://supabase.com/auth) | **Autenticación** — Gestión de sesiones, login y registro |
| [Passport & JWT](http://www.passportjs.org/) | **Seguridad** — Validación de JWT de Supabase en el backend |
| [Swagger / OpenAPI](https://swagger.io/) | **Documentación** — Especificación y UI interactiva de la API |
| [Prisma ORM](https://www.prisma.io/) | **Base de Datos** — Gestión de esquemas (`auth` y `public`) y consultas |
| [Turborepo](https://turbo.build/) | **Orquestador** — Gestión inteligente de tareas y cache |
| [pnpm](https://pnpm.io/) | **Package Manager** — Gestión eficiente de dependencias con workspaces |
| [openapi-typescript](https://openapi-ts.pages.dev/) | **Type Safety** — Generación de tipos TS a partir de OpenAPI |


---

## 🗂️ Estructura del Monorepo

```
my-monorepo/
├── apps/
│   ├── web/          # Frontend Next.js (Architecture-driven / FSD)
│   └── api/          # Backend NestJS (Modular Architecture)
├── packages/
│   ├── types/        # Tipos de TypeScript compartidos (@repo/types)
│   └── api-client/   # Cliente HTTP autogenerado con tipos (@repo/api-client)
├── turbo.json        # Configuración de pipelines
└── pnpm-workspace.yaml
```

---

## ⚙️ Primeros Pasos

### Prerrequisitos
- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/) v9+


### Instalación
```bash
# Clonar e instalar
git clone https://github.com/IvanRomeroMaurin/Trabajo-Campo-Ing-II.git
cd Trabajo-Campo-Ing-II
pnpm install
```

### Desarrollo
Para levantar todo el entorno (Web + API) en paralelo:
```bash
pnpm dev
```

| App | URL |
|---|---|
| **Frontend** | [http://localhost:3000](http://localhost:3000) |
| **Backend** | [http://localhost:3001/api](http://localhost:3001/api) |
| **API Docs (Swagger)** | [http://localhost:3001/docs](http://localhost:3001/docs) |

---

## 🛠️ Scripts Clave

- `pnpm dev`: Inicia el modo desarrollo (Web + API).
- `pnpm build`: Compila todo el monorepo.
- `pnpm generate:api`: Sincroniza los tipos del `api-client` con el backend.
- `pnpm db:generate`: Regenera el cliente de Prisma.

---

## 📄 Notas de Implementación

Este proyecto se utiliza como laboratorio para implementar:
- **Auth Flow**: Registro con confirmación de email y redirección segura.
- **Database Synchronization**: Sincronización automática de perfiles mediante triggers de PostgreSQL.
- **Type Safe Communication**: Uso de `openapi-typescript` para garantizar que el frontend y el backend hablen el mismo idioma sin escribir tipos manuales.
- **Protected Routes**: Implementación de Guards JWT en NestJS para asegurar que solo usuarios autenticados operen sobre sus datos.
- **Modern UI**: Frontend basado en Server Components para máximo rendimiento y SEO.
