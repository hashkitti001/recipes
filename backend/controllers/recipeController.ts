import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Recipe from '../models/Recipe';

// Get all recipes
const getAllRecipes = async (req: Request, res: Response): Promise<void> => {
  try {
    const allRecipes = await Recipe.find({});
    res.status(200).json({ allRecipes });
    return;
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
    return
  }
};


const getRecipeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   res.status(400).json({ error: 'Invalid recipe ID' });
    //   return
    // }

    const recipe = await Recipe.findById(id);
    
    if (!recipe) {
      res.status(404).json({ message: 'Recipe not found' });
      return
    }

    res.status(200).json({ recipe });
    return
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve recipe' });
    return
  }
};


const createNewRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, servings, duration, ingredients, instructions, calories, imgURL } = req.body;
    console.log(req.body)
    
    if (!name || !servings || !duration) {
      res.status(400).json({ error: 'Name, servings, and duration are required' });
      return
    }

    const existingRecipe = await Recipe.findOne({ name });
    if (existingRecipe) {
      res.status(400).json({ error: 'Recipe with this name already exists' });
      return
    }

   
    const newRecipe = new Recipe({
      name,
      description,
      servings,
      duration,
      calories,
      ingredients: ingredients || [],
      instructions: instructions || [],
      imgURL
    });

    await newRecipe.save();
    res.status(201).json({ message: 'Recipe created successfully', recipe: newRecipe });
    return
  } catch (error) {
    res.status(500).json({ error: 'Failed to create recipe' });
    console.log(error)
    return
   
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
      return
    }

    res.status(200).json({ message: 'Recipe deleted successfully', recipe: deletedRecipe });
    return
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete recipe' });
    return
  }
};

export { getAllRecipes, getRecipeById, createNewRecipe, deleteRecipe };
