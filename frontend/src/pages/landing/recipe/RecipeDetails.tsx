import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Header";

interface Recipe {
  id: string;
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

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/recipe/${id}`);
        if (!response.ok) throw new Error("Failed to fetch recipe data");
        const data = await response.json();
        setRecipe(data.recipe);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found.</div>;

  return (
    <>
      <Header />
      <div className="recipe-detail w-full mx-auto p-5 bg-white flex flex-col lg:flex-row justify-center items-center lg:space-x-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-center text-100 mb-5">{recipe.name}</h1>
          <p className="text-lg mb-8 text-300">{recipe.description}</p>
          <div className="flex gap-4">
            <div>
              
            </div>
            <div></div>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-100">Ingredients</h2>
          <ol className="list-decimal list-inside ml-4 text-gray-800 space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ol>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-100">Instructions</h2>
          <ol className="list-decimal list-inside ml-4 text-gray-800 space-y-2">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>

        {recipe.imgURL && (
          <img
            src={recipe.imgURL}
            alt={recipe.name}
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-lg mb-5 shadow-lg transition-transform duration-300 transform hover:scale-105"
          />
        )}
      </div>
    </>
  );
};

export default RecipeDetails;
