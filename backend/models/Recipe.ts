import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    imageURL: {
        type: String,
    }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
