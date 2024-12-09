import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Header";
import axios from "axios";
import Loader from "../../../components/Loader";

interface Recipe {
  id: string;
  creator: string;
  name: string;
  description: string;
  imgURL?: string;
  ingredients: string[];
  instructions: string[];
}

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("recipeAppToken");

  useEffect(() => {
    if (!token) {
      setError("Authentication token is missing. Please log in.");
      setLoading(false);
      return;
    }

    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://recipes-backend-0meq.onrender.com/api/recipe/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status !== 200 || !response.data.recipe) {
          throw new Error("Failed to fetch recipe data");
        }

        setRecipe(response.data.recipe);
      } catch (err: any) {
        console.error("Failed to fetch recipe:", err);
        setError("Failed to load recipe. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, token]);

  useEffect(() => {
    if (recipe?.name) {
      document.title = `${recipe.name} - Recipe Details`;
    }
  }, [recipe]);

  if (loading) return <div><Loader/></div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!recipe) return <div>Recipe not found.</div>;

  return (
    <>
      <Header />
      <div className="recipe-detail w-full mx-auto p-5 bg-white flex flex-col lg:flex-row justify-center items-center lg:space-x-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-5">{recipe.name}</h1>
          <h3 className="text-2xl font-lighter text-center text-gray-800 mb-4">By {recipe.creator}</h3>
          <p className="text-lg mb-8 text-gray-600">{recipe.description || "No description available."}</p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ingredients</h2>
          {recipe.ingredients.length > 0 ? (
            <ol className="list-decimal list-inside ml-4 text-gray-800 space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ol>
          ) : (
            <p>No ingredients provided.</p>
          )}

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Instructions</h2>
          {recipe.instructions.length > 0 ? (
            <ol className="list-decimal list-inside ml-4 text-gray-800 space-y-2">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          ) : (
            <p>No instructions provided.</p>
          )}
        </div>

        {recipe.imgURL ? (
          <img
            src={recipe.imgURL}
            alt={recipe.name}
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-lg mb-5 shadow-lg transition-transform duration-300 transform hover:scale-105"
          />
        ) : (
          <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-64 bg-gray-200 rounded-lg mb-5 flex items-center justify-center shadow-lg">
            <p className="text-gray-500">No image available</p>
          </div>
        )}
      </div>
    </>
  );
};

export default RecipeDetails;
