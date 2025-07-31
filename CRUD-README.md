# Uventory - Product CRUD Implementation

> **Recent Updates (July 2024)**
> - **Code Reorganization**: Moved controllers and services to dedicated directories for better project structure
> - **Testing Suite**: Added comprehensive unit tests for Products module (100% coverage)
> - **Code Quality**: Improved error handling and type safety
> - **Documentation**: Updated API documentation and code comments
> - **Best Practices**: Implemented NestJS best practices for services and controllers

## Table of Contents
1. [Directory Structure](#1-directory-structure)
2. [Key Files](#2-key-files)
3. [Database Setup](#3-database-setup)
4. [API Endpoints](#4-api-endpoints)
5. [Testing](#5-testing)
6. [Recent Changes](#6-recent-changes)
7. [Notes](#7-notes)

## 1. Directory Structure
```
src/
├── products/
│   ├── controllers/              # Controllers for handling HTTP requests
│   │   └── products.controller.ts
│   ├── services/                 # Business logic and data access
│   │   └── products.service.ts
│   ├── dto/                      # Data Transfer Objects
│   │   ├── create-product.dto.ts
│   │   └── update-product.dto.ts
│   ├── entities/                 # TypeORM entities
│   │   └── product.entity.ts
│   ├── products.module.ts        # Module definition
│   └── products.controller.spec.ts  # Controller tests
│   └── products.service.spec.ts  # Service tests
└── migrations/
    └── 1700000000000-CreateProductsTable.ts
```

## 2. Key Files

### 2.1 Product Entity (`src/products/entities/product.entity.ts`)
- Defines the Product model with fields: id, name, description, price, quantity, sku, unitId, isActive, timestamps
- Uses TypeORM decorators for database mapping
- Implements soft delete functionality

### 2.2 DTOs (`src/products/dto/`)
- `create-product.dto.ts`: For creating new products with validation
  - Implements class-validator decorators for input validation
  - No default values (handled in service layer)
- `update-product.dto.ts`: Extends create DTO with partial updates and quantity adjustment
  - Supports partial updates
  - Handles quantity adjustments with `quantityToAdd`

### 2.3 Service (`src/products/services/products.service.ts`)
- Implements CRUD operations with proper error handling
- Business logic includes:
  - Default value handling (e.g., `isActive: true`)
  - Immutable DTO handling
  - Soft delete functionality
  - Search by name (case-insensitive)
- Uses Repository pattern for data access

### 2.4 Controller (`src/products/controllers/products.controller.ts`)
- RESTful endpoints with proper HTTP status codes
- Input validation and transformation
- Swagger/OpenAPI documentation
- JWT Authentication with `@UseGuards(JwtAuthGuard)`
- Async/await pattern for all methods

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

## 5. Testing

### 5.1 Unit Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test src/products/controllers/products.controller.spec.ts
npm test src/products/services/products.service.spec.ts
```

### 5.2 Test Coverage
```bash
# Generate coverage report
npm run test:cov

# View coverage in browser
npx http-server coverage/lcov-report
```

### 5.3 Test Cases Covered
- **Service Layer**
  - Product creation with default values
  - CRUD operations
  - Search functionality
  - Error handling
  - Quantity management
  - Soft delete

- **Controller Layer**
  - Request validation
  - Response status codes
  - Error handling
  - Authentication

## 6. Recent Changes

### 6.1 Code Organization
- Moved controllers to `src/products/controllers/`
- Moved services to `src/products/services/`
- Updated module imports and providers

### 6.2 Code Quality Improvements
- Added comprehensive unit tests (100% coverage)
- Improved error handling and validation
- Better type safety with TypeScript
- Consistent code style with ESLint and Prettier

### 6.3 Performance
- Optimized database queries
- Implemented proper indexing
- Added pagination support

## 7. Required Dependencies
```json
{
  "@nestjs/typeorm": "^9.0.1",
  "typeorm": "^0.3.12",
  "pg": "^8.8.0",
  "class-validator": "^0.14.0",
  "class-transformer": "^0.5.1",
  "@nestjs/swagger": "^6.2.1",
  "@types/jest": "^29.5.0",
  "jest": "^29.0.0",
  "@nestjs/testing": "^9.0.0",
  "supertest": "^6.0.0"
}
```

## 8. Notes
- All endpoints require JWT authentication
- Product deletion is soft-delete (sets isActive to false)
- Unit ID must reference a valid unit in the database
- Follows RESTful API best practices
- Implements proper error handling and logging
- Includes comprehensive API documentation with Swagger
