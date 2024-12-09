import axios from "axios";
import { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";

type Props = {
  _id: string;
  rateScore: number;
};

const StarRating: React.FC<Props> = ({ _id, rateScore }) => {
  const [rating, setRating] = useState(rateScore); // Initialize with rateScore
  const token = localStorage.getItem("recipeAppToken");

  const handleClick = (index: number) => {
    if (rating !== index + 1) {
      setRating(index + 1); // Update rating only if it has changed
    }
  };

  useEffect(() => {
    // Sync rating with rateScore if it changes
    setRating(rateScore);
  }, [rateScore]);

  useEffect(() => {
    const updateRating = async () => {
      if (!token) {
        console.error("No token found. User might not be authenticated.");
        return;
      }

      try {
        const response = await axios.put(
          `http://localhost:3000/api/recipe/${_id}/rate`,
          { rating },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Rating updated successfully");
        } else {
          console.error("Failed to update rating");
        }
      } catch (error) {
        console.error("Error updating rating:", error);
      }
    };

    // Only update rating if it is a valid score
    if (rating > 0) {
      updateRating();
    }
  }, [rating]);

  return (
    <div className="flex gap-2 cursor-pointer py-2">
      {[...Array(5)].map((_, index) => (
        <span key={index} onClick={() => handleClick(index)}>
          <AiFillStar
            className={`${
              index < rating ? "text-yellow-500 text-lg" : "text-gray-400 text-lg"
            }`}
          />
        </span>
      ))}
    </div>
  );
};

export default StarRating;
