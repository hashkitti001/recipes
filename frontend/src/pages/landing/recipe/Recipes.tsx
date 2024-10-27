import { useState, useEffect } from "react";
import BackToTop from "../../../components/BackToTop";
import Header from "../Header";
import { GoPlus } from "react-icons/go";
import NewRecipeForm from "./NewRecipeForm";
import RecipeItem from "../../../components/RecipeItem";
import axios from "axios";
import { toast } from "react-toastify";

interface RecipeInterface {
  name: string;
  description: string;
  servings: number;
  duration: number;
  calories: number;
  ingredients: Array<string>;
  instructions: Array<string>;
  imageURL?: string;
}

const Recipes = () => {
  const [fetchedRecipes, setFetchedRecipes] = useState<Array<RecipeInterface>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/recipes')
        console.log(response.data)
        setFetchedRecipes(response.data.allRecipes);
        console.log(fetchedRecipes)
      } catch (e) {
        toast.error("Failed to fetch recipes");
        console.error(e)
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white w-screen h-screen relative">
      <Header />
      <h1 className="text-300 p-5 text-md">Recipes</h1>
      <NewRecipeForm />
      <div className="layout-container flex-col gap-8 px-5">
        <section className="m-5 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-300 text-xl mb-4">Available Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fetchedRecipes.map((recipe) => (
              <RecipeItem
                key={recipe.name}
                name={recipe.name}
                duration={recipe.duration}
                servings={recipe.servings}
                imgURL={recipe.imageURL || ""}
                calories={recipe.calories}

              />
            ))}
          </div>
        </section>

        <section className="m-5 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-300 text-xl mb-4">Your Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="h-40 bg-100 shadow-md rounded-lg flex items-center justify-center text-center text-300">
              <GoPlus className="text-4xl text-white" />
            </button>

            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-40 bg-100 shadow-md rounded-lg flex items-center justify-center text-center text-300"
              >
                Your Recipe {index + 1}
              </div>
            ))}
          </div>
        </section>

        <BackToTop />
      </div>
    </div>
  );
};

export default Recipes;
