# Food Delivery Web - Backend

This is the backend server for the Food Delivery Web application, providing authentication and user management functionality.

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- MongoDB integration

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/food_delivery
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=30d
   ```

3. Start the server:
   ```
   npm start
   ```

   For development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- **POST /api/auth/signup** - Register a new user
  - Request body: `{ name, email, password }`
  - Response: `{ user, token }`

- **POST /api/auth/signin** - Login an existing user
  - Request body: `{ email, password }`
  - Response: `{ user, token }`

- **GET /api/auth/me** - Get current user (protected route)
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ user }`

## Testing

A test script is provided to verify the authentication flow:

```
node test-auth.js
```

This script tests:
1. User registration
2. User login
3. Access to protected routes

## Integration with Frontend

The frontend connects to this backend through the `AuthContext` and `authService` modules, which handle:

- User registration
- User login
- Token storage
- Authenticated API requests