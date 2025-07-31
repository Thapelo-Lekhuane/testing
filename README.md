<p align="center">
  <img src="public/images/Screenshot 2025-07-07 at 07.35.42.png" width="200" alt="Uventory Logo" />
</p>

<p align="center">
  <strong>Uventory - Inventory Management System</strong>
</p>

<p align="center">
  A modern NestJS-based inventory management application with complete user authentication, product tracking, and real-time inventory control.
</p>

<p align="center">
  <a href="https://nestjs.com/" target="_blank"><img src="https://img.shields.io/badge/NestJS-ED2942?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" /></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://www.postgresql.org/" target="_blank"><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>
  <a href="https://jwt.io/" target="_blank"><img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" /></a>
  <a href="https://swagger.io/" target="_blank"><img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" /></a>
</p>

<p align="center">
  <a href="https://github.com/uchexm/uventory/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/uchexm/uventory?style=social" alt="Stars" /></a>
  <a href="https://github.com/uchexm/uventory/network" target="_blank"><img src="https://img.shields.io/github/forks/uchexm/uventory?style=social" alt="Forks" /></a>
  <a href="https://github.com/uchexm/uventory/issues" target="_blank"><img src="https://img.shields.io/github/issues/uchexm/uventory" alt="Issues" /></a>
  <a href="https://github.com/uchexm/uventory/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/github/license/uchexm/uventory" alt="License" /></a>
</p>

---

# 📦 Uventory - Inventory Management System

A comprehensive inventory management application built with NestJS, featuring user authentication, product tracking, stock management, and real-time inventory control. Perfect for businesses looking to streamline their inventory operations.

## 🎯 Project Overview

Uventory is a modern, scalable inventory management system designed to help businesses:

- **Track inventory levels** in real-time
- **Manage user access** with role-based authentication
- **Monitor product movements** with detailed audit trails
- **Generate reports** for business insights
- **Integrate with external systems** via RESTful APIs

## ✨ Features

### 🔐 Authentication & Security

- **User Registration & Login** - Secure account creation and authentication
- **JWT Token Management** - Stateless authentication with configurable expiration
- **Password Security** - bcrypt hashing with salt rounds
- **Role-Based Access Control** - Different permission levels for users
- **Input Validation** - Comprehensive request validation
- **CORS Support** - Frontend integration ready

### 📦 Inventory Management (Planned)

- **Product Catalog** - Add, edit, and categorize products
- **Stock Tracking** - Real-time inventory level monitoring
- **Stock Movements** - Track in/out transactions
- **Low Stock Alerts** - Automated notifications
- **Barcode Integration** - QR code and barcode support
- **Supplier Management** - Vendor and supplier tracking

### 📊 Reporting & Analytics (Planned)

- **Inventory Reports** - Stock level summaries
- **Movement History** - Transaction audit trails
- **Sales Analytics** - Performance metrics
- **Export Capabilities** - CSV, PDF, Excel exports

### 🔧 Technical Features

- **PostgreSQL Database** - Robust data storage with Neon integration
- **TypeORM Integration** - Entity-based database management
- **Swagger Documentation** - Interactive API documentation
- **Environment Configuration** - Flexible deployment options
- **Docker Support** - Containerized deployment ready

## 🏗️ Architecture & Design Patterns

### **Layered Architecture**

```
┌─────────────────────────────────────┐
│           Presentation Layer        │
│         (Controllers/Guards)        │
├─────────────────────────────────────┤
│           Business Logic Layer      │
│           (Services/Strategies)     │
├─────────────────────────────────────┤
│           Data Access Layer         │
│         (Repositories/Entities)     │
├─────────────────────────────────────┤
│           Database Layer            │
│         (PostgreSQL/TypeORM)        │
└─────────────────────────────────────┘
```

### **Design Patterns Implemented**

#### **1. Repository Pattern**

- Abstract data access layer
- TypeORM repositories for database operations
- Clean separation of concerns

#### **2. Strategy Pattern**

- JWT and Local authentication strategies
- Pluggable authentication methods
- Easy to extend with new auth providers

#### **3. Guard Pattern**

- Route protection with JWT and Local guards
- Reusable authentication middleware
- Role-based access control ready

#### **4. DTO Pattern**

- Data Transfer Objects for validation
- Request/Response schema definition
- Type-safe API contracts

#### **5. Module Pattern**

- Feature-based module organization
- Dependency injection container
- Scalable architecture

## 🗂️ Domain Model & Data Relationships

Below is the core entity-relationship diagram for Uventory, representing how the main business objects interact:

```mermaid
erDiagram
    PRODUCT }|--|| PRODUCT_CATEGORY: contains

    PRODUCT }|--|{ WAREHOUSE: stocked

    ACTIVITY ||--|| PRODUCT: includes
    ACTIVITY ||--|{ WAREHOUSE: includes
    ACTIVITY ||--o{ PARTY: includes
    ACTIVITY ||--|| USER: includes

    COMPANY ||--o{ WAREHOUSE: has
    COMPANY ||--o{ PARTY: has
    COMPANY ||--o{ PRODUCT: has
    COMPANY ||--o{ ACTIVITY: has
    COMPANY ||--o{ USER: has

    DOCUMENT ||--|{ ACTIVITY: associated
```

### **Entity Descriptions**

#### **Product**

- Represents a single type of item, e.g., "Woollen Red Sweater".
- Assigned to a single category (e.g., "Winter Clothes").
- Can be stocked in multiple warehouses at the same time (e.g., CPT Warehouse, JHB Warehouse).

#### **Product Category**

- Groups products into logical categories for easier management and reporting.

#### **Warehouse**

- Physical or logical storage location for products.
- Each warehouse can stock multiple products.

#### **Party**

- Can be a vendor (supplier) or customer (buyer).
- Vendors supply products (inbound flow).
- Customers purchase products (outbound flow).
- A party can be both a vendor and a customer.

#### **Company**

- Represents a single company account using the software.
- Can have multiple warehouses, parties, products, users, and activities.

#### **User**

- Represents a person with login credentials and permissions.
- Each user belongs to a company.

#### **Activity**

- Represents a business event (e.g., stock movement, sale, purchase).
- Can include products, warehouses, parties, and users.

#### **Document**

- Associated with activities (e.g., invoices, receipts, delivery notes).

---

## 🧠 Business Concepts

- **Multi-Warehouse Support:** Products can be tracked across multiple warehouses.
- **Flexible Party Model:** Parties can be vendors, customers, or both.
- **Company-Centric:** All data is scoped to a company, supporting multi-tenancy.
- **Auditability:** Activities and documents provide a full audit trail of inventory movements and business transactions.
- **Role-Based Access:** Users have permissions and roles, ensuring secure access to company data.

---

## 📈 Example Use Cases

- **Stock In:** Vendor (Party) supplies products to a warehouse (Activity: Stock In, Document: Delivery Note).
- **Stock Out:** Customer (Party) purchases products from a warehouse (Activity: Sale, Document: Invoice).
- **Stock Transfer:** Move products between warehouses (Activity: Transfer).
- **Inventory Adjustment:** Manual correction of stock levels (Activity: Adjustment).

---

## 📁 Project Structure

```
src/
├── auth/                          # Authentication module
│   ├── dto/                       # Data transfer objects
│   │   ├── login.dto.ts
│   │   ├── register.dto.ts
│   │   └── auth-response.dto.ts
│   ├── guards/                    # Route protection
│   │   ├── jwt-auth.guard.ts
│   │   └── local-auth.guard.ts
│   ├── strategies/                # Passport strategies
│   │   ├── jwt.strategy.ts
│   │   └── local.strategy.ts
│   ├── auth.controller.ts         # Auth endpoints
│   ├── auth.service.ts            # Auth business logic
│   └── auth.module.ts             # Auth module config
├── users/                         # User management
│   ├── user.entity.ts             # Database entity
│   ├── users.service.ts           # User business logic
│   └── users.module.ts            # Users module config
├── app.controller.ts              # Main controller
├── app.service.ts                 # Main service
├── app.module.ts                  # Root module
└── main.ts                        # Application entry
```

## 🚀 Quick Start

### **Prerequisites**

- Node.js (v18 or higher)
- PostgreSQL database (Neon recommended)
- npm or yarn package manager

### **Installation**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/uchexm/uventory.git
   cd uventory
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Configuration:**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your configuration:

   ```env
   # Database Configuration
   DATABASE_URL=postgresql://username:password@host:port/database

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=7d

   # App Configuration
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the application:**

   ```bash
   npm run start:dev
   ```

5. **Access the application:**
   - **API Documentation:** http://localhost:3000/api
   - **Health Check:** http://localhost:3000

## 📚 API Documentation

### **Interactive Swagger UI**

Access comprehensive API documentation at: `http://localhost:3000/api`

**Features:**

- ✅ **Interactive Testing** - Test endpoints directly in browser
- ✅ **Request/Response Examples** - See exact data formats
- ✅ **Authentication Support** - JWT bearer token integration
- ✅ **Error Documentation** - Complete error response docs
- ✅ **Schema Validation** - Input validation rules documented

### **Authentication Endpoints**

#### **Register User**

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### **Login User**

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### **Get User Profile**

```http
GET /auth/profile
Authorization: Bearer jwt_token_here
```

## 🗄️ Database Schema

### **Current Tables**

#### **Users Table**

| Column      | Type      | Constraints      | Description            |
| ----------- | --------- | ---------------- | ---------------------- |
| `id`        | UUID      | Primary Key      | Unique user identifier |
| `email`     | String    | Unique, Not Null | User email address     |
| `password`  | String    | Not Null         | Hashed password        |
| `firstName` | String    | Not Null         | User's first name      |
| `lastName`  | String    | Not Null         | User's last name       |
| `isActive`  | Boolean   | Default: true    | Account status         |
| `createdAt` | Timestamp | Auto             | Account creation time  |
| `updatedAt` | Timestamp | Auto             | Last update time       |

### **Planned Tables**

#### **Products Table**

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sku VARCHAR(100) UNIQUE,
  category VARCHAR(100),
  unit VARCHAR(50),
  cost DECIMAL(10,2),
  price DECIMAL(10,2),
  minStockLevel INTEGER DEFAULT 0,
  maxStockLevel INTEGER,
  createdBy UUID REFERENCES users(id),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

#### **Inventory Table**

```sql
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  productId UUID REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 0,
  location VARCHAR(100),
  lastUpdated TIMESTAMP DEFAULT NOW()
);
```

#### **Stock Movements Table**

```sql
CREATE TABLE stock_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  productId UUID REFERENCES products(id),
  type VARCHAR(20) NOT NULL, -- 'IN', 'OUT', 'ADJUSTMENT'
  quantity INTEGER NOT NULL,
  reason VARCHAR(255),
  reference VARCHAR(100),
  performedBy UUID REFERENCES users(id),
  createdAt TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Development

### **Available Scripts**

```bash
# Development
npm run start:dev          # Start development server with hot reload
npm run start:debug        # Start with debug mode

# Production
npm run build              # Build for production
npm run start:prod         # Start production server

# Testing
npm run test               # Run unit tests
npm run test:e2e           # Run end-to-end tests
npm run test:cov           # Run tests with coverage

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier
```

### **Environment Variables**

| Variable         | Description                  | Default       | Required |
| ---------------- | ---------------------------- | ------------- | -------- |
| `DATABASE_URL`   | PostgreSQL connection string | -             | ✅       |
| `JWT_SECRET`     | Secret for JWT token signing | -             | ✅       |
| `JWT_EXPIRES_IN` | JWT token expiration         | `7d`          | ❌       |
| `PORT`           | Server port                  | `3000`        | ❌       |
| `NODE_ENV`       | Environment mode             | `development` | ❌       |

## 🛡️ Security Features

### **Authentication & Authorization**

- **JWT Tokens** - Stateless authentication with configurable expiration
- **Password Hashing** - bcrypt with 10 salt rounds
- **Input Validation** - Comprehensive request validation using class-validator
- **CORS Protection** - Configurable cross-origin resource sharing
- **Rate Limiting** - Protection against brute force attacks (planned)

### **Data Protection**

- **Environment Variables** - Sensitive data stored in environment
- **SQL Injection Prevention** - TypeORM parameterized queries
- **XSS Protection** - Input sanitization and validation
- **HTTPS Ready** - SSL/TLS support for production

## 🚀 Deployment

### **Docker Deployment**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

### **Environment Setup**

```bash
# Production environment variables
NODE_ENV=production
DATABASE_URL=your_production_database_url
JWT_SECRET=your_production_jwt_secret
PORT=3000
```

### **Deployment Platforms**

- **Heroku** - Easy deployment with PostgreSQL add-on
- **Railway** - Simple deployment with database integration
- **DigitalOcean** - VPS deployment with managed databases
- **AWS** - Scalable cloud deployment
- **Vercel** - Serverless deployment option

## 📈 Roadmap

### **Phase 1: Core Authentication** ✅

- [x] User registration and login
- [x] JWT token authentication
- [x] Password hashing and validation
- [x] API documentation with Swagger
- [x] Database integration

### **Phase 2: Inventory Management** 🚧

- [ ] Product catalog management
- [ ] Stock level tracking
- [ ] Stock movement history
- [ ] Low stock alerts
- [ ] Barcode/QR code integration

### **Phase 3: Advanced Features** 📋

- [ ] Role-based access control
- [ ] Multi-location inventory
- [ ] Supplier management
- [ ] Purchase order system
- [ ] Sales order integration

### **Phase 4: Analytics & Reporting** 📊

- [ ] Inventory reports
- [ ] Movement analytics
- [ ] Performance dashboards
- [ ] Export capabilities
- [ ] Real-time notifications

### **Phase 5: Integration & API** 🔗

- [ ] RESTful API for external systems
- [ ] Webhook support
- [ ] Third-party integrations
- [ ] Mobile app support
- [ ] Advanced search and filtering

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **Development Setup**

1. Clone the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### **Code Style**

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write comprehensive tests
- Update documentation for new features

## 📞 Support

### **Getting Help**

- **Documentation:** [API Docs](http://localhost:3000/api)
- **Issues:** [GitHub Issues](https://github.com/uchexm/uventory/issues)
- **Discussions:** [GitHub Discussions](https://github.com/uchexm/uventory/discussions)

### **Community**

- **Discord:** Join our community server
- **Twitter:** Follow for updates
- **Blog:** Read our technical articles

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NestJS Team** - For the amazing framework
- **TypeORM** - For database management
- **Swagger** - For API documentation
- **PostgreSQL** - For reliable data storage
- **TMA** - For an amazing team of developers

## 👨‍💻 Author

**Uchechi Nwaka**

- **LinkedIn:** [Uchechi Nwaka](https://www.linkedin.com/in/nwakauc/)
- **Portfolio:** [https://uchexm.github.io/Portfolio/](https://uchexm.github.io/Portfolio/)
- **Twitter:** [@Nwakauc](https://x.com/Nwakauc)

---

<p align="center">
  ⭐️ <b>If you like this project, please consider <a href="https://github.com/uchexm/uventory/stargazers">starring it on GitHub</a>!</b> ⭐️
</p>

<p align="center">
  <a href="https://coff.ee/nwakauc" target="_blank"><img src="https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee" /></a>
</p>

---

## 🚀 Spread the Word

If you find Uventory useful, share it with your friends and colleagues!

- Tweet about it: [Share on Twitter](https://twitter.com/intent/tweet?text=Check%20out%20Uventory%20%E2%80%93%20an%20awesome%20open-source%20inventory%20management%20system!%20https://github.com/uchexm/uventory)
- Post on LinkedIn: [Share on LinkedIn](https://www.linkedin.com/shareArticle?mini=true&url=https://github.com/uchexm/uventory&title=Uventory%20Inventory%20Management%20System)
- Add a star ⭐️ on GitHub: [Star this repo](https://github.com/uchexm/uventory/stargazers)

---

<p align="center">
  <b>Made with ❤️ by the TMA backend team for the inventory management community.</b>
</p>

## 🧹 Code Quality: Linting & Formatting

This project uses **ESLint** for code linting and **Prettier** for code formatting. To ensure code quality and consistency, linting and formatting are enforced automatically before every commit using Husky and lint-staged.

### **Linting**

Run ESLint on all TypeScript files:

```bash
npm run lint
```

### **Formatting**

Format all code and markdown files with Prettier:

```bash
npm run format
```

### **Pre-commit Hook**

Whenever you commit, only staged `.ts` and `.md` files will be automatically linted and formatted:

- TypeScript: `eslint --fix` and `prettier --write`
- Markdown: `prettier --write`

If any issues are found, the commit will be blocked until they are fixed.

---
