import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { GoPlus } from "react-icons/go";
import BackToTop from "../../../components/BackToTop";
import Header from "../Header";
import NewRecipeForm from "./NewRecipeForm";
import RecipeItem from "../../../components/RecipeItem";
import "react-toastify/ReactToastify.min.css";
import { FaSearch } from "react-icons/fa";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";

interface RecipeInterface {
  imgURL: string;
  _id: string;
  creator: string;
  name: string;
  description: string;
  servings: number;
  duration: number;
  calories: number;
  ingredients: string[];
  instructions: string[];
  rating: number;
}

const Recipes = () => {
  const [fetchedRecipes, setFetchedRecipes] = useState<RecipeInterface[]>([]);
  const [userRecipes, setUserRecipes] = useState<RecipeInterface[]>([]);
  const [otherRecipes, setOtherRecipes] = useState<RecipeInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const token = localStorage.getItem("recipeAppToken");
  const {username} = JSON.parse(atob(token!.split(".")[1]))
  const userId = localStorage.getItem("recipeAppUserId"); // Assuming you store user ID in localStorage

  const navigate = useNavigate();
  if (!token) {
    navigate("/auth");
    window.location.href = "/auth";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://recipes-backend-0meq.onrender.com/api/recipes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allRecipes = response.data.allRecipes;
        const myRecipes = allRecipes.filter((recipe: RecipeInterface) => recipe.creator === username);
        const othersRecipes = allRecipes.filter((recipe: RecipeInterface) => recipe.creator !== username);

        setFetchedRecipes(allRecipes);
        setUserRecipes(myRecipes);
        setOtherRecipes(othersRecipes);
      } catch (error) {
        toast.error("Failed to fetch recipes");
        console.error("Error fetching recipes:", error);
      }
    };
    fetchData();
  }, [userId, token]);

  const toggleForm = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredMyRecipes = fetchedRecipes
      .filter((recipe) => recipe.creator === userId)
      .filter((recipe) => recipe.name.toLowerCase().includes(term));
    const filteredOthersRecipes = fetchedRecipes
      .filter((recipe) => recipe.creator !== userId)
      .filter((recipe) => recipe.name.toLowerCase().includes(term));

    setUserRecipes(filteredMyRecipes);
    setOtherRecipes(filteredOthersRecipes);
  };

  return (
    <div className="bg-gray-100 w-screen h-screen relative">
      <ToastContainer />
      <Header />
      <h1 className="text-gray-800 text-3xl font-semibold p-5">Recipes</h1>
      <NewRecipeForm isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="layout-container flex-col gap-8 px-5">
        {/* Recipes by Others */}
        <section className="m-5 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-gray-700 text-xl mb-4">Recipes by Others</h2>

          {/* Search Bar */}
          <div className="relative flex justify-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search recipes..."
              className="w-4/5 mb-4 p-3 border bg-400 outline-none border-none rounded-full text-black"
            />
            <FaSearch className="text-2xl font-light text-100 right-36 top-2 absolute" />
          </div>
          <div className="flex flex-wrap gap-4">
            {otherRecipes.map((recipe) => (
              <RecipeItem
                key={recipe._id}
                _id={recipe._id}
                creator={recipe.creator}
                name={recipe.name}
                duration={recipe.duration}
                servings={recipe.servings}
                imgURL={recipe.imgURL || ""}
                calories={recipe.calories}
                rating={recipe.rating}
              />
            ))}
          </div>
        </section>

        {/* Your Recipes */}
        <section className="m-5 p-6 bg-white shadow-md rounded-lg ">
          <h2 className="text-gray-700 text-xl mb-4">Your Recipes</h2>

          <div className="relative flex justify-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search recipes..."
              className="w-4/5 mb-4 p-3 border bg-400 outline-none border-none rounded-full text-black"
            />
            <FaSearch className="text-2xl font-light text-100 right-36 top-2 absolute" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={toggleForm}
              aria-label="Add new recipe"
              className="h-40 bg-100 shadow-md rounded-lg flex items-center justify-center text-center text-white"
            >
              <GoPlus className="text-4xl" />
            </button>

            {userRecipes.map((recipe: RecipeInterface) => (
              <RecipeItem
                key={recipe._id}
                _id={recipe._id}
                creator={recipe.creator}
                name={recipe.name}
                duration={recipe.duration}
                servings={recipe.servings}
                imgURL={recipe.imgURL || ""}
                calories={recipe.calories}
                rating={recipe.rating}
              />
            ))}
          </div>
        </section>
        <BackToTop />
      </div>
      <Footer />
    </div>
  );
};

export default Recipes;
