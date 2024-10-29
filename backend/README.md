To build a recipe site with the functional requirements of signup, login, view recipes, create recipes, and delete recipes, you’ll need to implement a set of relevant API endpoints. Below is a structured outline of the essential endpoints, along with a brief description of each:

### User Authentication Endpoints

1. **Signup**
   - **Endpoint**: `POST /api/auth/signup`
   - **Description**: Register a new user.
   - **Request Body**: 
     ```json
     {
       "username": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - **Response**: User details or error message.

2. **Login**
   - **Endpoint**: `POST /api/auth/login`
   - **Description**: Authenticate a user and return a JWT.
   - **Request Body**: 
     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```
   - **Response**: JWT token and user details or error message.

### Recipe Endpoints

3. **View All Recipes**
   - **Endpoint**: `GET /api/recipes`
   - **Description**: Retrieve a list of all recipes.
   - **Response**: Array of recipe objects.

4. **View a Single Recipe**
   - **Endpoint**: `GET /api/recipes/:id`
   - **Description**: Retrieve a specific recipe by ID.
   - **Response**: Recipe object or error message.

5. **Create a Recipe**
   - **Endpoint**: `POST /api/recipes`
   - **Description**: Add a new recipe.
   - **Request Body**: 
     ```json
     {
       "title": "string",
       "ingredients": ["string"],
       "instructions": "string",
       "imageUrl": "string",
       "userId": "string"
     }
     ```
   - **Response**: Created recipe object or error message.

6. **Delete a Recipe**
   - **Endpoint**: `DELETE /api/recipes/:id`
   - **Description**: Remove a specific recipe by ID.
   - **Response**: Success message or error message.

// Use the middleware for protected routes
router.post('/recipes', authenticateJWT, ...);
router.delete('/recipes/:id', authenticateJWT, ...);
```

