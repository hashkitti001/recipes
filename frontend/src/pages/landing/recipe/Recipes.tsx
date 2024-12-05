import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { GoPlus } from "react-icons/go";
import BackToTop from "../../../components/BackToTop";
import Header from "../Header";
import NewRecipeForm from "./NewRecipeForm";
import RecipeItem from "../../../components/RecipeItem";
import 'react-toastify/ReactToastify.min.css'
import { FaSearch } from "react-icons/fa";
import Footer from "../../../components/Footer";
interface RecipeInterface {
  _id: string;
  creator: string;
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
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const token = localStorage.getItem("recipeAppToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://recipes-backend-0meq.onrender.com/api/recipes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFetchedRecipes(response.data.allRecipes);
        setFilteredRecipes(response.data.allRecipes);
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = fetchedRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(term)
    );
    setFilteredRecipes(filtered);
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

          {/* Search Bar */}
          
          <div className="relative flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search recipes..."
            className="w-4/5 mb-4 p-3 border bg-400 outline-none border-none rounded-full text-black"
          />
          <FaSearch className="text-2xl font-light text-100 right-36 top-2 absolute"/>
      </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={toggleForm}
              aria-label="Add new recipe"
              className="h-40 bg-100 shadow-md rounded-lg flex items-center justify-center text-center text-white"
            >
              <GoPlus className="text-4xl" />
            </button>

            {filteredRecipes.map((recipe) => (
              <RecipeItem
                key={recipe._id}
                _id={recipe._id}
                creator={recipe.creator}
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
      <Footer/>
    </div>
  );
};

export default Recipes;
