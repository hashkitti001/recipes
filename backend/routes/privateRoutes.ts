import express from 'express'
const privateRouter = express.Router()
import { getAllRecipes, getRecipeById, createNewRecipe, deleteRecipe } from '../controllers/recipeController'

privateRouter.get('/api/recipes', getAllRecipes)
privateRouter.get('/api/recipe/:id', getRecipeById)
privateRouter.post('/api/recipe/', createNewRecipe)
privateRouter.delete('/api/recipes/:id', deleteRecipe)

export default privateRouter;

