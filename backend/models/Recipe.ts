import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    creator: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true,
    },
    servings: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    ingredients: {
        type: [String], 
        default: []
    },
    instructions: {
        type: [String], 
        default: []
    },
    imgURL: {
        type: String,
    }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
