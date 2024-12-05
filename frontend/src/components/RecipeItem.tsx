import { IoTimer } from "react-icons/io5";
import { FaBowlFood } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BsTrash } from "react-icons/bs";

type RecipeItemProps = {
    _id: string;
    creator: string;
    name: string;
    duration: number;
    servings: number;
    calories: number;
    imgURL: string;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ _id, name, creator, duration, servings, calories, imgURL }) => {
    const token = localStorage.getItem('recipeAppToken')

    const parseDuration = (time: number): string => {
        if (time >= 60) {
            const hourPart = Math.round(time / 60)
            const minPart = Math.round(time % 60)
            return `${hourPart} hrs, ${minPart} mins`
        }
        return `${time} mins`
    }

    const handleDelete = async (itemId: string) => {
        try {
            const response = await axios.delete(`https://recipes-backend-0meq.onrender.com/api/recipes/${itemId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                toast.success("Deleted recipe successfully!")
            }
        } catch (e: any) {
            console.error(e)
            toast.error("Couldn't delete recipe")
        }
    }

    return (
        <div className="flex bg-400 rounded-xl p-6 relative">
            <div className="">
                <div className="text-wrap">
                    <h3 className="text-2xl text-300 font-bold">{name}</h3>
                </div>
                <h5 className="text-300">{`By ${creator}`}</h5>
                <div className="flex gap-3 ">
                    <span>
                        <IoTimer className="text-200 text-lg" />
                    </span>
                    <h5 className="text-2md text-300 font-bold">{parseDuration(duration)}</h5>
                </div>

                <div className="flex gap-3 p-1">
                    <span>
                        <FaBowlFood className="text-200 text-lg" />
                    </span>
                    <h5 className="text-2md text-300 font-bold">{`${servings} servings`}</h5>
                </div>

                <div className="calories flex justify-between p-4">
                    <h4 className="text-2md text-300 font-bold pr-6">{`${calories} calories`}</h4>

                    <button className="bg-100 rounded-full w-8 h-8 flex items-center justify-center">
                        <Link to={`/recipe/${_id}`}>
                            <MdArrowOutward className="text-xl text-center text-white" />
                        </Link>
                    </button>

                    {/* Handle delete with an anonymous function to prevent immediate invocation */}
                    <button 
                        className="bg-200 rounded-full w-8 h-8 flex items-center justify-center"
                        onClick={() => handleDelete(_id)} // Now it will trigger on click
                    >
                        <BsTrash className="text-xl text-center text-white" />
                    </button>
                </div>
            </div>

            <div className="recipecard-img absolute left-[14rem] top-2">
                <img src={imgURL} className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full object-cover mb-2 aspect-square" alt={name} />
            </div>
        </div>
    )
}

export default RecipeItem;
