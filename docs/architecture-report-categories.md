# 🏛️ Informe Técnico: Arquitectura Limpia en Módulo Categories

Este documento detalla la implementación final de la arquitectura para el módulo de Categorías, siguiendo el esquema **"Golden Standard"** (Híbrido Modular). La estructura garantiza el desacoplamiento total de la lógica de negocio frente a la base de datos y el framework web.

---

## 1. Estructura de Directorios

El módulo se organiza en 4 capas de responsabilidad bien definidas:

```text
src/modules/categories/
├── categories.module.ts              # Orquestador del módulo (Inyección de Dependencias)
│
├── domain/                           # Capa 1: Núcleo y Reglas de Negocio
│   ├── entities/                     # category.entity.ts (Clase pura, sin decoradores)
│   ├── interfaces/                   # ICategoryRepository.ts (Contratos de persistencia)
│   └── exceptions/                   # category.exceptions.ts (Errores de negocio puros)
│
├── application/                      # Capa 2: Casos de Uso (Orquestación)
│   ├── use-cases/                    # Lógica por acción (Create, Update, Get, Delete)
│   └── interfaces/                   # category-commands.interface.ts (Interfaces de entrada puras)
│
├── infrastructure/                   # Capa 3: Implementación Técnica (Detalles)
│   ├── persistence/                  # prisma-categories.repository.ts (Lógica Prisma)
│   └── mappers/                      # category.mapper.ts (Traductor DB <-> Dominio)
│
└── presentation/                     # Capa 4: Interfaces externas (NestJS)
    ├── controllers/                  # categories.controller.ts (Endpoints REST)
    └── dtos/                         # Contratos de la Web con decoradores (Validación)
```

---

## 2. Análisis por Capas

### 🔹 Capa de Dominio (El Corazón)
- **Entidad Pura**: La clase `Category` no tiene decoradores de `@ApiProperty` ni `@Entity`. Es JS/TS puro y cumple con la interfaz global `@repo/types/Category`.
- **Inversión de Dependencias**: Definimos `ICategoriesRepository` como una **clase abstracta**. Esto permite que NestJS la use como "Token" de inyección sin depender de la implementación real de la base de datos.
- **Excepciones**: Los errores como `CategoryNotFoundError` son clases puros que no dependen de `@nestjs/common`.

### 🔹 Capa de Aplicación (El Director)
- **Casos de Uso Unitarios**: Cada acción del sistema (`CreateCategoryUseCase`, etc.) es una clase independiente que inyecta el repositorio a través de su interfaz. 
- **Interfaces de Entrada (Commands)**: Los casos de uso reciben interfaces de comandos de TypeScript puro. Esto asegura que la lógica de negocio no dependa de cómo se validan los datos en la web.

### 🔹 Capa de Infraestructura (El Obrero)
- **Prisma Repository**: Implementa la interfaz definida en el dominio. Aquí es donde vive la dependencia con `PrismaService`.
- **Mapper Inyectable**: Se encarga de transformar el objeto crudo que devuelve Prisma en una instancia de la clase `Category` del dominio. Al ser inyectable, permite desacoplar totalmente la implementación de la base de datos.

### 🔹 Capa de Presentación (La Puerta)
- **Controlador REST**: Maneja solo el protocolo HTTP, validación de Swagger y delegación a los Casos de Uso.
- **DTOs con Validación**: Aquí residen las reglas de `class-validator` y Swagger. Los DTOs implementan los `Commands` de la aplicación de forma explícita.
- **Filtro Global**: El `DomainExceptionFilter` intercepta los errores de dominio y les asigna un código HTTP (`404`, `400`) de forma automática.

---

## 3. Patrones y Mejores Prácticas Aplicados

1.  **Screaming Architecture**: Al mirar la carpeta `categories`, el sistema "grita" su intención de negocio.
2.  **Single Responsibility Principle (SRP)**: Cada archivo tiene una única razón para cambiar.
3.  **Dependency Inversion**: Las dependencias siempre apuntan hacia adentro (el Dominio).
4.  **Mapper Pattern**: Proporciona aislamiento total entre el modelo de datos físico y el modelo de negocio lógico.

---

## 4. Beneficios Obtenidos

| Beneficio | Descripción |
| :--- | :--- |
| **Testabilidad** | Puedes probar un Caso de Uso en segundos usando un Mock del repositorio, sin base de datos. |
| **Bajo Acoplamiento** | Si decides cambiar Prisma por otro ORM, solo necesitas crear un archivo nuevo en `infrastructure/persistence`. |
| **Mantenibilidad** | Es fácil encontrar dónde ocurre un bug: si es de entrada (Controller), de negocio (UseCase) o de datos (Repository). |
| **Pureza Arquitectónica** | La lógica central (Domain/Application) está 100% aislada de dependencias externas. |

---
*Informe generado automáticamente por Antigravity AI - 14/04/2026*
