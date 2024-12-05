import { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

interface RecipeInterface {
  name: string;
  description: string;
  servings: number;
  calories: number;
  duration: number;
  ingredients: Array<string>;
  instructions: Array<string>;
  imgURL?: string;
}

interface NewRecipeFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NewRecipeForm: React.FC<NewRecipeFormProps> = ({ isOpen, setIsOpen }) => {
  const token = localStorage.getItem("recipeAppToken");
  const [recipeData, setRecipeData] = useState<RecipeInterface>({
    name: "",
    description: "",
    servings: 0,
    calories: 0,
    duration: 0,
    ingredients: [""],
    instructions: [""],
    imgURL: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    field?: "ingredients" | "instructions"
  ) => {
    const { name, value } = e.target;
    if (field !== undefined && index !== undefined) {
      setRecipeData((prev) => ({
        ...prev,
        [field]: prev[field].map((item, i) => (i === index ? value : item)),
      }));
    } else {
      setRecipeData((prev) => ({
        ...prev,
        [name]: name === "servings" || name === "duration" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options = {
      url: "http://localhost:3000/api/recipe",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: recipeData,
    };
    axios
      .request(options)
      .then((response) => {
        try {
          if (response.status === 201) {
            toast.success("Successfully added recipe");
          }
        } catch (e) {
          toast.error("Something went wrong while trying to add a recipe");
          console.error(e);
        }
      });
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  const addIngredient = () => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const addInstruction = () => {
    setRecipeData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  const removeIngredient = (index: number) => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const removeInstruction = (index: number) => {
    setRecipeData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white w-full max-w-lg mx-auto p-6 rounded-lg shadow-lg relative z-20 max-h-screen overflow-y-auto">
            <span onClick={toggleForm} className="absolute top-4 right-4 cursor-pointer">
              <MdClose className="text-3xl text-gray-600" />
            </span>
            <h3 className="text-xl text-gray-800 mb-4">New Recipe</h3>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                className="border border-gray-300 p-2 rounded bg-white mx-3 text-gray-700"
                placeholder="Recipe Name"
                type="text"
                name="name"
                value={recipeData.name}
                onChange={handleChange}
              />
              <input
                className="border border-gray-300 p-2 rounded bg-white mx-3 text-gray-700"
                placeholder="Recipe Description"
                type="text"
                name="description"
                value={recipeData.description}
                onChange={handleChange}
              />
              <label className="text-gray-700 px-3">Servings</label>
              <input
                className="border border-gray-300 p-2 rounded bg-white mx-3 text-gray-700"
                placeholder="Servings"
                type="number"
                name="servings"
                value={recipeData.servings}
                onChange={handleChange}
              />
              <label className="text-gray-700 px-3">Duration (in minutes)</label>
              <input
                className="border border-gray-300 p-2 rounded bg-white mx-3 text-gray-700"
                placeholder="Duration (minutes)"
                type="number"
                name="duration"
                value={recipeData.duration}
                onChange={handleChange}
              />
              <label className="text-gray-700 px-3">Calories</label>
              <input
                className="border border-gray-300 p-2 rounded bg-white mx-3 text-gray-700"
                placeholder="Calories (in kcal)"
                type="number"
                name="calories"
                value={recipeData.calories}
                onChange={handleChange}
              />
              <div className="mx-3">
                <h4 className="text-gray-700 mb-2">Ingredients</h4>
                {recipeData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      className="border border-gray-300 p-2 rounded bg-white flex-grow text-gray-700"
                      placeholder={`Ingredient ${index + 1}`}
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleChange(e, index, "ingredients")}
                    />
                    {recipeData.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addIngredient}
                  className="text-blue-500"
                >
                  Add Ingredient
                </button>
              </div>

              <div className="mx-3">
                <h4 className="text-gray-700 mb-2">Instructions</h4>
                {recipeData.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      className="border border-gray-300 p-2 rounded bg-white flex-grow text-gray-700"
                      placeholder={`Instruction ${index + 1}`}
                      type="text"
                      value={instruction}
                      onChange={(e) => handleChange(e, index, "instructions")}
                    />
                    {recipeData.instructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInstruction(index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addInstruction}
                  className="text-blue-500"
                >
                  Add Instruction
                </button>
              </div>

              <input
                className="border border-gray-300 p-2 rounded bg-white mx-3 text-gray-700"
                placeholder="Image URL (optional)"
                type="text"
                name="imgURL"
                value={recipeData.imgURL}
                onChange={handleChange}
              />

              <input
                type="submit"
                value="Create"
                className="self-center bg-100 text-white py-2 px-4 cursor-pointer w-11/12 rounded-2xl"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewRecipeForm;
