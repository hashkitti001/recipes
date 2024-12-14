# Recipe Management API

This API provides endpoints to manage recipes and user accounts. It is built using **Express.js** and **TypeScript**. This documentation outlines how to set up and run the application, as well as a summary of the available endpoints.

## Features
- User authentication middleware to secure endpoints.
- CRUD operations for recipes.
- User management features.

## Prerequisites
Ensure you have the following installed:
- Node.js (v14 or later)
- npm or yarn

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the project root and configure the required environment variables. For example:
   ```env
   PORT=3000
   JWT_SECRET=<your_jwt_secret>
   DATABASE_URL=<your_database_url>
   ```

4. Build the TypeScript files:
   ```bash
   npm run build
   ```

5. Start the application:
   - Development mode:
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

## API Endpoints
### Recipes
- **Get all recipes**
  ```http
  GET /api/recipes
  ```
  Retrieves all recipes. Requires authentication.

- **Get recipe by ID**
  ```http
  GET /api/recipe/:id
  ```
  Retrieves a specific recipe by ID. Requires authentication.

- **Create a new recipe**
  ```http
  POST /api/recipe/
  ```
  Creates a new recipe. Requires authentication.

- **Update recipe rating**
  ```http
  PUT /api/recipe/:id/rate
  ```
  Updates the rating of a recipe by ID. Requires authentication.

- **Delete a recipe**
  ```http
  DELETE /api/recipes/:id
  ```
  Deletes a recipe by ID. Requires authentication.

### User Management
- **Get user by ID**
  ```http
  GET /api/user/:id
  ```
  Retrieves user information by ID. Requires authentication.

- **Update user information**
  ```http
  PUT /api/update-user
  ```
  Updates user information. Requires authentication.

- **Delete user account**
  ```http
  DELETE /api/delete-user
  ```
  Deletes the authenticated user's account. Requires authentication.

## Middleware
### Authentication Middleware
`authMiddleware` is applied to all endpoints to ensure only authenticated users can access them.

## Project Structure
```
src/
├── controllers/         # Contains business logic for recipes and users
├── middleware/          # Custom middleware, including authentication
├── routes/              # Route definitions (e.g., privateRouter)
├── app.ts               # Application setup
├── server.ts            # Entry point for the server
```

## Scripts
- `npm run build` - Compiles TypeScript to JavaScript.
- `npm run dev` - Runs the application in development mode.
- `npm start` - Runs the application in production mode.

