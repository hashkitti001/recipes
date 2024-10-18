import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

const Header = () => {
    return (
        <header className="flex justify-between items-center p-6 w-[100vw] gap-5 bg-white bg-opacity-80 shadow-md">
            <span className="logo font-bold text-xl">
                <Link className="text-gray-700" to="/">
                    Recipes
                </Link>
            </span>

            <nav className="flex gap-5 items-center">
                <ul className="flex gap-5">
                    <li className="text-300 font-bold text-md">Home</li>
                    <li className="text-300 font-bold text-md">Recipes</li>
                    <li className="text-300 font-bold text-md">About Us</li>
                    <li className="text-300 font-bold text-md">Dashboard</li>
                </ul>

                <ul className="flex items-center gap-5">
                   
                    <button className="rounded-full outline-none h-10 w-10 p-3 bg-300">
                        <FaSearch />
                    </button>
                    
                   
                    <button className="bg-100 text-white font-bold py-2 px-6 rounded-full">
                        Log In
                    </button>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
