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
| [NestJS](https://nestjs.com/) | **Backend** — API REST modular y escalable |
| [Supabase Auth](https://supabase.com/auth) | **Autenticación** — Gestión de sesiones, login y registro |
| [Prisma ORM](https://www.prisma.io/) | **Base de Datos** — Gestión de esquemas (`auth` y `public`) y consultas |
| [Turborepo](https://turbo.build/) | **Orquestador** — Gestión inteligente de tareas y cache en el monorepo |
| [pnpm](https://pnpm.io/) | **Package Manager** — Gestión eficiente de dependencias con workspaces |
| [PostgreSQL](https://www.postgresql.org/) | **Persistence** — Base de datos relacional robusta |

---

## 🗂️ Estructura del Monorepo

```
my-monorepo/
├── apps/
│   ├── web/          # Frontend Next.js (Architecture-driven / FSD)
│   └── api/          # Backend NestJS (Modular Architecture)
├── packages/
│   └── types/        # Tipos de TypeScript compartidos (@repo/types)
├── turbo.json        # Configuración de pipelines
└── pnpm-workspace.yaml
```

---

## ⚙️ Primeros Pasos

### Prerrequisitos
- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v8+

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
| **Backend** | [http://localhost:3001](http://localhost:3001) |

---

## 🛠️ Scripts Clave

- `pnpm dev`: Inicia el modo desarrollo.
- `pnpm build`: Compila para producción.
- `pnpm lint`: Ejecuta el análisis estático.
- `pnpm db:generate`: Regenera el cliente de Prisma.

---

## 📄 Notas de Implementación

Este proyecto se utiliza como laboratorio para implementar:
- **Auth Flow**: Registro con confirmación de email y redirección segura.
- **Database Synchronization**: Sincronización automática de perfiles entre `auth.users` y `public.users` mediante triggers de PostgreSQL.
- **Server Actions**: Manejo eficiente de lógica de servidor directamente desde los componentes de Next.js.
