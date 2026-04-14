# 📘 Blueprint: Clean Architecture "Golden Standard" en NestJS

Este documento sirve como la guía definitiva y plantilla maestra para implementar módulos bajo una arquitectura limpia, robusta y desacoplada en un entorno monorepo.

---

## 1. Filosofía y Objetivos

El objetivo principal es la **Independencia Total**. La lógica de negocio (el valor de tu empresa) debe estar protegida de cambios tecnológicos (bases de datos, frameworks, APIs externas).

### Reglas de Oro:
1.  **Dependencias hacia adentro**: Las capas internas nunca conocen a las externas.
2.  **Dominio Puro**: Sin decoradores, sin librerías, solo TypeScript.
3.  **Desacoplamiento de Entrada**: Los DTOs de la web no dictan cómo funciona el negocio.

---

## 2. Mapa de Estructura (Categorías como Ejemplo)

```text
src/modules/categories/
├── categories.module.ts              # Pegamento de NestJS (DI Container)
│
├── domain/                           # Capa 1: Núcleo del Negocio
│   ├── entities/                     # Clases de dominio (Category)
│   ├── interfaces/                   # Contratos de Repositorio (ICategoryRepository)
│   └── exceptions/                   # Excepciones de negocio (CategoryNotFound)
│
├── application/                      # Capa 2: Reglas de Aplicación
│   ├── use-cases/                    # Orquestadores (CreateCategoryUseCase)
│   └── interfaces/                   # Comandos de entrada (CreateCategoryCommand)
│
├── infrastructure/                   # Capa 3: Detalles Técnicos
│   ├── persistence/                  # Implementación ORM (PrismaCategoriesRepository)
│   └── mappers/                      # Traductores (ICategoryMapper, CategoryMapper)
│
└── presentation/                     # Capa 4: Entrada/Salida
    ├── controllers/                  # Controladores REST (CategoriesController)
    └── dtos/                         # Contratos de la Web con decoradores (CreateCategoryDto)
```

---

## 3. Desglose Detallado de Capas

### 🟢 Capa 1: Dominio (La Verdad)
Es el código más importante. No depende de nadie.
- **Entidades**: Representan conceptos de negocio. Deben implementar los tipos compartidos del monorepo (`@repo/types`).
- **Interfaces**: Clases abstractas que definen qué necesita el dominio para persistir datos.
- **Excepciones**: Errores específicos del negocio (ej: `CategoríaDuplicada`).

### 🔵 Capa 2: Aplicación (Los Casos de Uso)
Define **qué hace** la aplicación. 
- **Commands**: Son interfaces puras de TS que definen la entrada de datos. **No tienen decoradores**.
- **Use Cases**: Inyectan el Repositorio y ejecutan la lógica. Reciben un `Command` y devuelven una `Entity`.

### 🟡 Capa 3: Infraestructura (Las Herramientas)
Implementa los deseos del Dominio usando tecnologías específicas.
- **Persistence**: Aquí vive Prisma, TypeORM o Mongoose.
- **Mappers**: Transforman el objeto "feo" de la base de datos en una entidad "limpia" de dominio. Se inyectan como servicios para poder ser mockeados.

### 🔴 Capa 4: Presentación (La Interfaz)
Es el punto de contacto con el mundo exterior.
- **Controllers**: Reciben HTTP, delegan al Use Case.
- **DTOs**: Aquí es donde viven `@ApiProperty` y `class-validator`. Su única misión es validar que lo que envía el usuario sea correcto antes de convertirlo en un `Command` para la Aplicación.

---

## 4. El Flujo de una Petición (Pipeline)

1.  **Cliente** envía un JSON.
2.  **NestJS Controller** recibe el `CreateCategoryDto`.
3.  **ValidationPipe** valida los decoradores `@IsString`, etc. 
4.  El **Controller** llama a `UseCase.execute(dto)`. (El Dto es compatible con la interfaz `Command`).
5.  El **UseCase** valida lógica de negocio (ej: slug único) usando el Repositorio.
6.  El **UseCase** llama a `Repository.save()`.
7.  El **Repository** usa Prisma para guardar, obtiene el resultado, llama al **Mapper** para convertirlo en `Entity` y lo devuelve.
8.  El **Controller** devuelve la `Entity` (serializada a JSON) al cliente.

---

## 5. Checklist para Replicar en un Nuevo Módulo

1.  [ ] **Domain Entities**: Crear la entidad en `domain/entities` implementando la interfaz de `@repo/types`.
2.  [ ] **Domain Exceptions**: Definir errores específicos en `domain/exceptions`.
3.  [ ] **Repository Interface**: Crear la clase abstracta en `domain/interfaces`.
4.  [ ] **Application Commands**: Definir las interfaces de entrada en `application/interfaces`.
5.  [ ] **Use Cases**: Crear las clases de caso de uso en `application/use-cases`.
6.  [ ] **Mapper**: Crear interfaz e implementación en `infrastructure/mappers`.
7.  [ ] **Adapter/Repository**: Implementar el repositorio real en `infrastructure/persistence`.
8.  [ ] **DTOs**: Crear los DTOs en `presentation/dtos` implementando los `Commands`.
9.  [ ] **Controller**: Crear el controlador en `presentation/controllers`.
10. [ ] **DI Wiring**: Registrar todo en el `.module.ts` (Importante: usar `useClass` para las interfaces/clases abstractas).

---

## 6. ¿Por qué esto es mejor?

- **Testabilidad**: Puedes testear el `CreateProductUseCase` inyectando un `FakeProductRepository` y un `FakeProductMapper` que no usen base de datos. Los tests corren en milisegundos.
- **Flexibilidad**: Si mañana cambias de Prisma a una API externa, el 80% de tu código (Dominio y Aplicación) no cambia.
- **Monorepo**: Al usar `@repo/types` en la entidad, garantizas que si el frontend rompe, el backend también ("Fail Fast").

---
*Este Blueprint asegura que tu aplicación sea mantenible por años y que el código hable por sí solo.*
