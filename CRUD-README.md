# Uventory - Product CRUD Implementation

## 1. Directory Structure
```
src/
├── products/
│   ├── dto/
│   │   ├── create-product.dto.ts
│   │   └── update-product.dto.ts
│   ├── entities/
│   │   └── product.entity.ts
│   ├── products.controller.ts
│   ├── products.module.ts
│   └── products.service.ts
└── migrations/
    └── 1700000000000-CreateProductsTable.ts
```

## 2. Key Files

### 2.1 Product Entity (`src/products/entities/product.entity.ts`)
- Defines the Product model with fields: id, name, description, price, quantity, sku, unitId, isActive, timestamps
- Uses TypeORM decorators for database mapping

### 2.2 DTOs (`src/products/dto/`)
- `create-product.dto.ts`: For creating new products with validation
- `update-product.dto.ts`: Extends create DTO with partial updates and quantity adjustment

### 2.3 Service (`src/products/products.service.ts`)
- Implements CRUD operations
- Includes business logic for product management
- Handles database operations

### 2.4 Controller (`src/products/products.controller.ts`)
- Defines REST endpoints
- Handles HTTP requests/responses
- Uses Swagger decorators for API documentation

## 3. Database Setup

### 3.1 Required Environment Variables
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=uventory
```

### 3.2 Migration Commands
```bash
# Generate migration
npx typeorm-ts-node-commonjs migration:generate src/migrations/CreateProductsTable -d src/data-source.ts

# Run migration
npm run db:migrate

# Revert migration
npm run db:migrate:revert
```

## 4. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /products | Create product |
| GET    | /products | Get all products |
| GET    | /products/search?name=:name | Search products |
| GET    | /products/:id | Get product by ID |
| PATCH  | /products/:id | Update product |
| DELETE | /products/:id | Delete product |

## 5. Required Dependencies
```json
{
  "@nestjs/typeorm": "^9.0.1",
  "typeorm": "^0.3.12",
  "pg": "^8.8.0",
  "class-validator": "^0.14.0",
  "class-transformer": "^0.5.1",
  "@nestjs/swagger": "^6.2.1"
}
```

## 6. Testing
1. Start the server
2. Use Postman or cURL to test endpoints
3. Verify data in PostgreSQL database

## 7. Notes
- All endpoints require JWT authentication
- Product deletion is soft-delete (sets isActive to false)
- Unit ID must reference a valid unit in the database
