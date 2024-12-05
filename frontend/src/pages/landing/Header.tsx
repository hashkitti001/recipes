import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosMenu, IoMdClose } from 'react-icons/io';
import { RxAvatar } from 'react-icons/rx';
import { FiSettings } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDDOpen, setIsDDOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('recipeAppToken');
    let username = ""

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropDown = () => {
        setIsDDOpen(!isDDOpen);
    };

    if (token) {
        try {
            const payload = JSON.parse(atob(token!.split('.')[1]));
            username = payload.username || "User";
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("recipeAppToken");
        toast.info("Successfully logged out!");
        setTimeout(() => {
            navigate('/auth');
        }, 2000);
    };

    return (
        <header className="bg-white shadow-md w-[100vw] flex justify-between items-center py-2 px-5">
            {/* Mobile Menu Toggle */}
            <div className="flex justify-between items-center px-5 py-4 lg:hidden">
                <div onClick={toggleMenu} className="text-3xl cursor-pointer">
                    {isOpen ? <IoMdClose className="text-black" /> : <IoIosMenu className="text-black" />}
                </div>

            </div>
            <Link className="font-bold text-xl text-black" to="/">Recipes</Link>
            {/* Mobile Menu */}
            <nav
                className={`fixed inset-0 bg-white flex flex-col items-center justify-center gap-8 z-10 transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 lg:static lg:flex lg:flex-row lg:transform-none`}
            >
                <ul className="text-left text-lg lg:flex lg:gap-6">
                    <li>
                        <Link to="/" className="font-bold text-2xl max-md:text-3xl text-gray-900 hover:text-100" onClick={toggleMenu}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/recipes" className="font-bold text-2xl max-md:text-3xl text-gray-900 hover:text-100" onClick={toggleMenu}>
                            Recipes
                        </Link>
                    </li>
                    <li>
                        <Link to="/about-us" className="font-bold text-2xl max-md:text-3xl text-gray-900 hover:text-100" onClick={toggleMenu}>
                            About Us
                        </Link>
                    </li>
                    <li className='flex md:hidden lg:hidden gap-6'>
                        <FiSettings className='text-3xl text-black hover:text-100'/>
                        <Link to="/about-us" className="font-bold text-2xl max-md:text-3xl text-gray-900 hover:text-100" onClick={toggleMenu}>
                            Profile Settings
                        </Link>
                    </li>
                    <button className='bg-200 text-white p-3 rounded-lg w-full md:hidden lg:hid'>Log Out</button>
                </ul>

                {/* Avatar and Actions */}
                <div className="mt-6 flex flex-col items-center gap-6 lg:mt-0 lg:flex-row">
                    {token ? (
                        <div className="relative max-md:hidden">
                            <div className='flex items-center'>
                            <RxAvatar
                                className="text-5xl text-black cursor-pointer"
                                onClick={toggleDropDown}
                            />
                            <p className='text-300 text-lg text-wrap pl-3'>{`${username}`}</p>
                            </div>
                           
                            <div
                                className={`absolute top-16 right-0 bg-white shadow-lg rounded-lg p-4 w-48 ${
                                    isDDOpen ? 'block' : 'hidden'
                                }`}
                            >
                                <div className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer">
                                    <FiSettings className="text-lg text-black" />
                                    <Link to="/profile-settings" className="text-black">
                                        Profile Settings
                                    </Link>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="mt-2 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button className="bg-100 text-white py-2 px-6 rounded-full hover:opacity-85">
                            <Link className="text-white" to="/auth">Log In</Link>
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
