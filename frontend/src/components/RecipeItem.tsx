import { IoTimer } from "react-icons/io5";
import { FaBowlFood } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BsFillShareFill, BsTrash, BsTwitter, BsWhatsapp } from "react-icons/bs";
import Rating from "./Rating";
import { useState } from "react";

type RecipeItemProps = {
    _id: string;
    creator: string;
    name: string;
    duration: number;
    servings: number;
    calories: number;
    imgURL: string;
    rating: number;
};

const RecipeItem: React.FC<RecipeItemProps> = ({
    _id,
    name,
    creator,
    duration,
    servings,
    calories,
    imgURL,
    rating,
}) => {
    const token = localStorage.getItem("recipeAppToken");
    const [showSharePopup, setShowSharePopup] = useState(false);

    const parseDuration = (time: number): string => {
        if (time >= 60) {
            const hourPart = Math.floor(time / 60);
            const minPart = time % 60;
            return `${hourPart} hrs, ${minPart} mins`;
        }
        return `${time} mins`;
    };

    const handleDelete = async (itemId: string) => {
        try {
            const response = await axios.delete(
                `https://recipes-backend-0meq.onrender.com/api/recipes/${itemId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                toast.success("Deleted recipe successfully!");
            }
        } catch (e: any) {
            console.error(e);
            toast.error("Couldn't delete recipe");
        }
    };

    const toggleSharePopup = () => {
        setShowSharePopup(!showSharePopup);
    };

    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
        `Check out this amazing recipe: ${name} - https://recipes-09ce.onrender.com/recipe/${_id}`
    )}`;

    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `Check out this amazing recipe: ${name} - https://recipes-09ce.onrender.com/recipe/${_id}`
    )}`;

    return (
        <div className="bg-400 rounded-xl p-6 relative sm:w-full lg:w-96 mx-10">
            <div className="">
                <div className="text-wrap">
                    <h3 className="text-2xl text-300 font-bold">{name}</h3>
                </div>
                <h5 className="text-300">{`By ${creator}`}</h5>
                <div className="flex gap-3 ">
                    <span>
                        <IoTimer className="text-200 text-lg" />
                    </span>
                    <h5 className="text-2md text-300 font-bold">
                        {parseDuration(duration)}
                    </h5>
                </div>

                <div className="flex gap-3 p-1">
                    <span>
                        <FaBowlFood className="text-200 text-lg" />
                    </span>
                    <h5 className="text-2md text-300 font-bold">{`${servings} servings`}</h5>
                </div>
                <Rating _id={_id} rateScore={rating} />
                <div className="calories flex justify-between p-4 gap-4">
                    <h4 className="text-2md text-300 font-bold pr-6">{`${calories} calories`}</h4>
                    <button className="bg-100 rounded-full w-8 h-8 flex items-center justify-center">
                        <Link to={`/recipe/${_id}`}>
                            <MdArrowOutward className="text-xl text-center text-white" />
                        </Link>
                    </button>

                    <button
                        className="bg-200 rounded-full w-8 h-8 flex items-center justify-center"
                        onClick={() => handleDelete(_id)}
                    >
                        <BsTrash className="text-xl text-center text-white" />
                    </button>

                    <button
                        className="bg-100 w-8 h-8 rounded-full relative"
                        onClick={toggleSharePopup}
                    >
                        <BsFillShareFill className="text-md ml-2 text-white text-center" />
                    </button>
                    {showSharePopup && (
                        <div className="absolute top-28 right-20 bg-white shadow-md p-4 rounded-lg flex gap-4 z-10 opacity-90 w-fit h-16">
                            <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
                                <BsWhatsapp className="text-green-500 text-2xl" />
                            </a>
                            <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
                                <BsTwitter className="text-blue-500 text-2xl" />
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <div className="recipecard-img absolute left-[14rem] top-2">
                <img
                    src={imgURL}
                    className="rounded-full mt-11 w-32 h-32 aspect-square p-3"
                    alt={name}
                />
            </div>
        </div>
    );
};

export default RecipeItem;
