import express from 'express'
const privateRouter = express.Router()
import { getAllRecipes, getRecipeById, createNewRecipe, deleteRecipe } from '../controllers/recipeController'
import authMiddleware from "../middleware/authMiddleware"
import { getUser } from '../controllers/authController'

console.log(authMiddleware)

privateRouter.get('/api/recipes', authMiddleware, getAllRecipes)
privateRouter.get('/api/recipe/:id', authMiddleware, getRecipeById)
privateRouter.get('/api/user/:id', authMiddleware, getUser)
// privateRouter.get('/api/update-user', authMiddleware, updateUser)
privateRouter.post('/api/recipe/', authMiddleware, createNewRecipe)
privateRouter.delete('/api/recipes/:id', authMiddleware, deleteRecipe)
// privateRouter.delete('api/v1/delete-user', authMiddleware, deleteUser)
export default privateRouter;

