import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { GoPlus } from "react-icons/go";
import BackToTop from "../../../components/BackToTop";
import Header from "../Header";
import NewRecipeForm from "./NewRecipeForm";
import RecipeItem from "../../../components/RecipeItem";

interface RecipeInterface {
  _id: string; // Changed to string assuming MongoDB ObjectID format; modify as needed
  name: string;
  description: string;
  servings: number;
  duration: number;
  calories: number;
  ingredients: string[];
  instructions: string[];
  imageURL?: string;
}

const Recipes = () => {
  const [fetchedRecipes, setFetchedRecipes] = useState<RecipeInterface[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/recipes");
        setFetchedRecipes(response.data.allRecipes);
        console.log(response.data.allRecipes);
      } catch (error) {
        toast.error("Failed to fetch recipes");
        console.error("Error fetching recipes:", error);
      }
    };
    fetchData();
  }, []);

  const toggleForm = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-gray-100 w-screen h-screen relative">
      <ToastContainer />
      <Header />
      <h1 className="text-gray-800 text-3xl font-semibold p-5">Recipes</h1>
      <NewRecipeForm isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <div className="layout-container flex-col gap-8 px-5">
        <section className="m-5 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-gray-700 text-xl mb-4">Available Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={toggleForm}
              aria-label="Add new recipe"
              className="h-40 bg-100 shadow-md rounded-lg flex items-center justify-center text-center text-white"
            >
              <GoPlus className="text-4xl" />
            </button>
            
            {fetchedRecipes.map((recipe) => (
              <RecipeItem
                key={recipe._id}
                _id={recipe._id}
                name={recipe.name}
                duration={recipe.duration}
                servings={recipe.servings}
                imgURL={recipe.imageURL || ""}
                calories={recipe.calories}
              />
            ))}
          </div>
        </section>
        <BackToTop />
      </div>
    </div>
  );
};

export default Recipes;
