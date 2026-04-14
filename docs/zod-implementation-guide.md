# 🛡️ Guía: Implementación de Zod "Type-Safe Everywhere"

Esta guía detalla el estándar para usar **Zod** como fuente única de verdad para tipos y validaciones en todo el monorepo (API, Web y Tipos Compartidos).

---

## 1. Estructura en `@repo/types` (Shared)

Para cada entidad (ej: `Product`), el archivo debe contener tanto el esquema como el tipo inferido.

### Definición del Archivo (`src/product.ts`)
```typescript
import { z } from 'zod';

// Esquema: La Verdad en Tiempo de Ejecución
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Requerido'),
  price: z.number().positive(),
  // ... resto de campos
});

// Tipo: La Verdad en Tiempo de Compilación
export type Product = z.infer<typeof ProductSchema>;
```

### Exportación Crítica (`src/index.ts`)
Debido a las restricciones de ESM en Node v24, **debes usar la extensión .js** en las exportaciones relativas:
```typescript
export * from './product.js'; // Obligatorio .js aunque el archivo sea .ts
export * from './category.js';
```

---

## 2. Integración en el Backend (`apps/api`)

Usamos `nestjs-zod` para vincular los esquemas compartidos con NestJS y Swagger.

### Configuración Global (`main.ts`)
```typescript
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ZodValidationPipe());
  // ...
}
```

### Definición de DTOs (`presentation/dtos`)
No vuelvas a escribir validaciones manuales. Extiende el esquema compartido:
```typescript
import { createZodDto } from 'nestjs-zod';
import { ProductSchema } from '@repo/types';

// Crear: Omitimos lo que genera la DB
export class CreateProductDto extends createZodDto(
  ProductSchema.omit({ id: true, created_at: true })
) {}

// Actualizar: Lo mismo pero con campos opcionales
export class UpdateProductDto extends createZodDto(
  ProductSchema.omit({ id: true, created_at: true }).partial()
) {}
```

---

## 3. Integración en el Frontend (`apps/web`)

Puedes usar los mismos esquemas para validar formularios con librerías como `react-hook-form`.

### Ejemplo de uso
```typescript
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema } from '@repo/types';

const form = useForm({
  resolver: zodResolver(ProductSchema.omit({ id: true })),
});
```

---

## 4. Checklist de Migración para un Nuevo Módulo

1.  **Tipos**: Convertir la interfaz en `packages/types/src/ENTITY.ts` a un `z.object`.
2.  **Export**: Añadir `export * from './ENTITY.js'` al `index.ts` de tipos.
3.  **Build**: Ejecutar `pnpm --filter @repo/types build` para generar los `.js` de Node.
4.  **API DTOs**: Refactorizar los DTOs de la API para que usen `createZodDto(ENTITYSchema...)`.
5.  **Clean up**: Borrar los decoradores de `class-validator` antiguos, ya que Zod se encarga de todo.

---

## 5. Troubleshooting (Gotchas)

> [!WARNING]
> **Error ERR_MODULE_NOT_FOUND**: Si al arrancar NestJS ves este error, es porque falta el `.js` en el `index.ts` del paquete de tipos o no has corrido el build de ese paquete.
>
> **Tipos Null vs Undefined**: Zod es estricto. Si tu DB devuelve `null`, el esquema debe tener `.nullable()`. Si el campo puede no venir, debe tener `.optional()`.

---
*Esta arquitectura garantiza que si cambias una regla de validación en los tipos, todo tu sistema se adapte o falle en compilación inmediatamente.*
