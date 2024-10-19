import {useState} from 'react'
import { Link } from 'react-router-dom'
import { FaSearch} from 'react-icons/fa'
import { IoIosMenu, IoMdClose } from "react-icons/io";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu  = () => {
        setIsOpen(!isOpen)
    }

    return (
        <header className="flex justify-between items-center p-6 w-[100vw] gap-5
         bg-white bg-opacity-70 shadow-md max-md:flex-col h-screen lg:h-auto">
            <div className='hidden max-md:flex w-full justify-around'>
                <span onClick={toggleMenu}>
                    <IoIosMenu className={`text-300 text-4xl ${isOpen ? 'hidden' : 'flex'}`}/>
                </span>
                <span></span>
                <span onClick={toggleMenu}>
                    <IoMdClose className={`text-300 text-4xl max-md:${isOpen ? 'flex' : 'hidden'}`}/>
                </span>
            </div>
            <span className="logo font-bold text-xl">
                <Link className="text-gray-700 max-md:hidden" to="/">
                    Recipes
                </Link>
            </span>

            <nav className={`flex gap-5 items-center max-md:${isOpen ? 'flex-col h-screen' : 'hidden'} lg:flex h-auto`}>
                <ul className="flex gap-5 max-md:flex-col h-full">
                    <li className="text-300 font-bold text-md">Home</li>
                    <li className="text-300 font-bold text-md">Recipes</li>
                    <li className="text-300 font-bold text-md">About Us</li>
                    <li className="text-300 font-bold text-md">Dashboard</li>
                </ul>

                <ul className="flex items-center gap-5">
                   
                    <button className="rounded-full outline-none h-10 w-10 p-3 bg-300">
                        <FaSearch />
                    </button>
                    
                   
                    <button className="bg-100 font-bold py-2 px-6 rounded-full">
                        <Link to="/auth" className='text-white'>Log In</Link>
                    </button>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
