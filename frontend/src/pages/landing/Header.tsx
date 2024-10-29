import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { FaSearch } from 'react-icons/fa';
import { IoIosMenu, IoMdClose } from 'react-icons/io';
import { RxAvatar } from 'react-icons/rx';
import { toast } from 'react-toastify';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDDOpen, setIsDDOpen] = useState(false)
    const navigate = useNavigate();
    const token = localStorage.getItem('recipeAppToken');
    let username = '';

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropDown = () => {
        setIsDDOpen(!isDDOpen)
    }

    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            username = payload.username || "User";
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.info("Successfully logged out!");
        setTimeout(() => {
            navigate('/auth');
        }, 2000);
    };

    return (
        <header className="flex justify-between items-center w-[100vw] gap-5 bg-white shadow-md max-md:flex-col max-sm:h-screen lg:h-10 lg:p-10">
            <div className='hidden max-md:flex w-full justify-around'>
                <span onClick={toggleMenu} className='mt-5'>
                    <IoIosMenu className={`text-300 text-4xl ${isOpen ? 'hidden' : 'flex'}`} />
                </span>
                <span></span>
                <span onClick={toggleMenu}>
                    <IoMdClose className={`text-300 text-4xl ${isOpen ? 'flex' : 'hidden'}`} />
                </span>
            </div>
            <span className="logo font-bold text-xl">
                <Link className="text-gray-700 max-md:hidden" to="/">
                    Recipes
                </Link>
            </span>

            <nav className={`flex gap-5 items-center ${isOpen ? 'flex-col h-screen' : 'hidden'} lg:flex h-auto`}>
                <ul className="flex gap-5 max-md:flex-col h-full">
                    <li className="text-300 font-bold text-md">
                        <Link className="text-300" to="/">Home</Link>
                    </li>
                    <li className="text-300 font-bold text-md">
                        <Link className="text-300" to="/recipes">Recipes</Link>
                    </li>
                    <li className="text-300 font-bold text-md">
                        <Link className="text-300" to="/about-us">About Us</Link>
                    </li>
                 
                </ul>

                <ul className="flex items-center gap-5">
                    {/* <button className="rounded-full outline-none h-10 w-10 p-3 bg-300">
                        <FaSearch />
                    </button> */}

                    {token ? (
                        <div className='flex items-center mx-3 relative'>
                            <span className='mr-2 text-300'>
                                <RxAvatar className="text-4xl" onClick={toggleDropDown}/>
                            </span>
                            <div className={`absolute top-14 z-50 bg-white p-5 w-32 flex-col ${isDDOpen ? 'hidden' : 'flex'} z-[1]`}>
                                <button className='p-2 bg-red-600 text-white w-full rounded-2xl' onClick={handleLogout}>
                                    Log Out
                                </button>
                            </div>
                            <div>
                                <p className='text-300'>Welcome!<br />{username}</p>
                            </div>
                        </div>
                    ) : (
                        <button className="bg-100 font-bold py-2 px-6 rounded-full">
                            <Link to="/auth" className='text-white'>Log In</Link>
                        </button>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
