import express from 'express'
const privateRouter = express.Router()
import { getAllRecipes, getRecipeById, createNewRecipe, deleteRecipe } from '../controllers/recipeController'
import authMiddleware from "../middleware/authMiddleware"

console.log(authMiddleware)

privateRouter.get('/api/recipes', authMiddleware, getAllRecipes)
privateRouter.get('/api/recipe/:id', authMiddleware, getRecipeById)
privateRouter.post('/api/recipe/', authMiddleware, createNewRecipe)
privateRouter.delete('/api/recipes/:id', authMiddleware, deleteRecipe)

export default privateRouter;

