# Scalable Web App with Authentication & Dashboard

A modern, production-ready web application featuring user authentication, role-based access control, and a comprehensive dashboard with CRUD operations.

## 🎯 Features

### ✅ Authentication & Security
- **User Registration & Login** - Secure signup/login with email validation
- **Password Hashing** - Bcrypt-based password encryption
- **JWT Tokens** - Stateless authentication with JWT tokens
- **Protected Routes** - Dashboard and profile pages require authentication
- **Automatic Token Refresh** - Seamless user experience with token management
- **Logout** - Secure session termination

### ✅ Dashboard Features
- **User Profile** - View and update user information
- **Profile Management** - Edit name, email, and profile picture
- **Task Management** - Full CRUD operations on tasks/notes
- **Search & Filter** - Advanced filtering and search capabilities
- **Real-time Updates** - Instant UI updates on data changes
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### ✅ Backend API
- RESTful API endpoints for all operations
- Comprehensive error handling and validation
- Request/response validation with Zod
- CORS enabled for frontend integration
- Structured for easy scaling

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **React Router 6** - Client-side routing
- **TailwindCSS 3** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **React Query** - Server state management
- **TypeScript** - Type safety
- **React Hook Form** - Form state management

### Backend
- **Express.js** - Web framework
- **Node.js** - Runtime environment
- **MongoDB** - Database (via Mongoose)
- **Bcrypt** - Password hashing
- **JWT** - Token-based authentication
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing

### Development
- **TypeScript** - Type safety across stack
- **Vitest** - Unit testing
- **ESM** - Modern module syntax
- **Prettier** - Code formatting

## 📋 Project Structure

```
fusion-starter/
├── client/                    # React Frontend
│   ├── pages/                # Route components
│   │   ├── Index.tsx         # Landing/Home page
│   │   ├── Login.tsx         # Login page
│   │   ├── Signup.tsx        # Registration page
│   │   ├── Dashboard/        # Dashboard routes
│   │   │   ├── Profile.tsx   # User profile page
│   │   │   └── Tasks.tsx     # Task management page
│   │   └── NotFound.tsx      # 404 page
│   ├── components/
│   │   ├── ui/              # Radix UI components
│   │   └── AuthGuard.tsx    # Protected route wrapper
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── App.tsx              # Main app component with routing
│   ├── global.css           # Global styles & theme
│   └── vite-env.d.ts        # Vite environment types
│
├── server/                    # Express Backend
│   ├── routes/              # API route handlers
│   │   ├── auth.ts          # Auth endpoints
│   │   ├── users.ts         # User endpoints
│   │   └── tasks.ts         # Task endpoints
│   ├── middleware/          # Custom middleware
│   │   └── auth.ts          # JWT verification
│   ├── models/              # MongoDB schemas
│   │   ├── User.ts
│   │   └── Task.ts
│   ├── index.ts             # Express app setup
│   └── node-build.ts        # Production build setup
│
├── shared/                    # Shared Types
│   └── api.ts               # API interfaces & types
│
├── tailwind.config.ts       # TailwindCSS configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies
└── .env.example             # Environment variables template
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- pnpm 8+ (recommended) or npm/yarn
- MongoDB instance (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd fusion-starter
```

2. **Install dependencies**
```bash
pnpm install
# or: npm install | yarn install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add:
```
# Database
MONGODB_URI=mongodb://localhost:27017/scalable-app
# or for MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Server Port
PORT=5000
```

4. **Start development server**
```bash
pnpm dev
```

The app will be available at `http://localhost:5173` (frontend with backend proxy)

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```
Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST `/api/auth/login`
Login with credentials
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### User Endpoints

#### GET `/api/users/profile`
Requires: Valid JWT token
Get current user profile

#### PATCH `/api/users/profile`
Requires: Valid JWT token
Update user profile
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

### Task Endpoints

#### GET `/api/tasks`
Requires: Valid JWT token
Get all tasks for current user with pagination/filtering

#### POST `/api/tasks`
Requires: Valid JWT token
Create a new task
```json
{
  "title": "Task title",
  "description": "Task description",
  "status": "pending"
}
```

#### PATCH `/api/tasks/:id`
Requires: Valid JWT token
Update a task

#### DELETE `/api/tasks/:id`
Requires: Valid JWT token
Delete a task

## 🔐 Authentication Flow

1. User registers with email and password
2. Password is hashed using bcrypt and stored in database
3. Upon login, password is verified against hash
4. JWT token is generated and returned to client
5. Token is stored in localStorage (frontend)
6. Token is sent with each authenticated request via Authorization header
7. Backend middleware verifies token on protected routes
8. On logout, token is removed from localStorage

## 🏗 Architecture & Scalability Notes

### Frontend Scalability
- **Component Modularization** - Each feature has isolated components
- **Custom Hooks** - Reusable logic extracted to hooks
- **Context API** - For global auth state management
- **React Query** - Server state caching and synchronization
- **Lazy Loading** - Route-based code splitting for faster initial load

### Backend Scalability
- **Middleware Pattern** - Easy to add auth, logging, rate limiting
- **Route Separation** - Endpoints organized by domain (auth, users, tasks)
- **Database Abstraction** - Mongoose models separate from routes
- **Error Handling** - Consistent error responses for easy debugging
- **Environment Config** - All secrets in .env file

### Production Deployment
- **Docker Support** - Containerize the entire application
- **Environment Management** - Different configs for dev/staging/prod
- **Database Indexing** - Add indexes on frequently queried fields
- **API Rate Limiting** - Implement to prevent abuse
- **HTTPS Only** - Force SSL in production
- **CORS Whitelist** - Restrict to approved domains

### Further Scaling
1. **Separate Frontend/Backend** - Deploy on different services
2. **Microservices** - Split tasks, users, auth into separate services
3. **Message Queues** - Redis/RabbitMQ for async operations
4. **Caching Layer** - Redis for session and data caching
5. **Database Replication** - MongoDB replica sets for HA
6. **Load Balancing** - Nginx/HAProxy for distributing traffic
7. **CDN** - Cloudflare/CloudFront for static assets
8. **Monitoring** - Sentry for errors, DataDog for metrics

## 📱 Responsive Design

All pages are fully responsive:
- **Mobile (320px+)** - Touch-friendly, optimized layout
- **Tablet (768px+)** - Enhanced spacing and multi-column layouts
- **Desktop (1024px+)** - Full feature layout

## 🧪 Testing

Run tests with:
```bash
pnpm test
```

## 🔍 Code Quality

Format code:
```bash
pnpm format.fix
```

Type check:
```bash
pnpm typecheck
```

## 📦 Build & Deployment

### Development Build
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
```

### Start Production Server
```bash
pnpm start
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and format
4. Submit a pull request

## 📝 License

MIT License - feel free to use in personal or commercial projects

## 🆘 Support & Resources

- **Vite Documentation** - https://vitejs.dev
- **React Documentation** - https://react.dev
- **TailwindCSS** - https://tailwindcss.com
- **MongoDB** - https://docs.mongodb.com
- **Express** - https://expressjs.com
- **Radix UI** - https://www.radix-ui.com

---

**Ready to get started?** Run `pnpm dev` and navigate to `http://localhost:5173` to see the app in action!
