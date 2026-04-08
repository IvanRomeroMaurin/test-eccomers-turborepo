# 🚀 Trabajo Campo — Ingeniería II

Monorepo fullstack que integra una aplicación web con **Next.js** y una API REST con **NestJS**, gestionado con **Turborepo** y **pnpm workspaces**.

---

## 📦 Stack tecnológico

| Herramienta | Rol |
|---|---|
| [Next.js](https://nextjs.org/) | Frontend — React framework con SSR/SSG |
| [NestJS](https://nestjs.com/) | Backend — API REST modular y escalable |
| [Turborepo](https://turbo.build/) | Orquestador de tareas del monorepo |
| [pnpm](https://pnpm.io/) | Gestor de paquetes con workspaces |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático en todo el stack |

---

## 🗂️ Estructura del proyecto

```
my-monorepo/
├── apps/
│   ├── web/          # Aplicación Next.js → localhost:3000
│   └── api/          # API NestJS        → localhost:3001
├── package.json      # Scripts raíz + devDependencies compartidas
├── pnpm-workspace.yaml
├── turbo.json        # Configuración de pipelines de Turborepo
└── .gitignore
```

---

## ⚙️ Primeros pasos

### Prerrequisitos

- [Node.js](https://nodejs.org/) v18 o superior
- [pnpm](https://pnpm.io/installation) v8 o superior

```bash
npm install -g pnpm
```

### Instalación

Cloná el repositorio e instalá las dependencias desde la raíz:

```bash
git clone https://github.com/IvanRomeroMaurin/Trabajo-Campo-Ing-II.git
cd Trabajo-Campo-Ing-II
pnpm install
```

---

## 🧑‍💻 Levantar el proyecto en desarrollo

Desde la raíz del monorepo, ejecutá:

```bash
pnpm dev
```

Turborepo correrá en paralelo todos los servidores de desarrollo:

| App | URL |
|---|---|
| **web** (Next.js) | [http://localhost:3000](http://localhost:3000) |
| **api** (NestJS) | [http://localhost:3001](http://localhost:3001) |

---

## 🛠️ Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Levanta todas las apps en modo desarrollo |
| `pnpm build` | Compila todas las apps para producción |
| `pnpm lint` | Ejecuta el linter en todo el monorepo |
| `pnpm db:generate` | Genera el cliente de base de datos (Prisma) |
| `pnpm db:migrate` | Ejecuta migraciones de base de datos |

Para ejecutar un script en una app específica:

```bash
pnpm --filter web dev
pnpm --filter api dev
```

---

## 📚 Apps

### `apps/web` — Frontend (Next.js)

Aplicación React con renderizado del lado del servidor. Consume la API REST provista por `apps/api`.

### `apps/api` — Backend (NestJS)

API REST construida sobre arquitectura modular de NestJS. Expone los endpoints que consume el frontend.

---

## 🤝 Contribuciones

1. Creá una rama desde `main`: `git checkout -b feat/nombre-feature`
2. Realizá tus cambios y commiteá siguiendo [Conventional Commits](https://www.conventionalcommits.org/)
3. Abrí un Pull Request hacia `main`

---

## 📄 Licencia

Este proyecto fue desarrollado para la materia **Ingeniería de Software II**.
