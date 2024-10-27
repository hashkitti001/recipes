import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Recipe from '../models/Recipe';

// Get all recipes
const getAllRecipes = async (req: Request, res: Response): Promise<void> => {
  try {
    const allRecipes = await Recipe.find({});
    res.status(200).json({ allRecipes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};

// Get recipe by ID
const getRecipeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Check if the ID is a valid Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid recipe ID' });
    }

    const recipe = await Recipe.findById(id);
    
    if (!recipe) {
      res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ recipe });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve recipe' });
  }
};


const createNewRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, servings, duration, ingredients, instructions, calories } = req.body;

    
    if (!name || !servings || !duration) {
      await res.status(400).json({ error: 'Name, servings, and duration are required' });
    }

    const existingRecipe = await Recipe.findOne({ name });
    if (existingRecipe) {
      await res.status(400).json({ error: 'Recipe with this name already exists' });
    }

   
    const newRecipe = new Recipe({
      name,
      servings,
      duration,
      calories,
      ingredients: ingredients || [],
      instructions: instructions || []
    });

    await newRecipe.save();
    res.status(201).json({ message: 'Recipe created successfully', recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create recipe' });
    console.log(error)
  }
};


const deleteRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid recipe ID' });
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ message: 'Recipe deleted successfully', recipe: deletedRecipe });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
};

export { getAllRecipes, getRecipeById, createNewRecipe, deleteRecipe };
