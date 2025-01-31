import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

interface LoginDetails {
    email: string;
    password: string;
}

const Login = () => {
    const [loginDetails, setLoginDetails] = useState<LoginDetails>({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target;
        setLoginDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/auth/login', loginDetails)
            if (response.status === 200) {
                toast.success("Successfully logged in!")
                localStorage.setItem("recipeAppToken", response.data.token)
                setTimeout(() => {
                    navigate('/recipes')
                }, 4000)
            }
        } catch (e) {
            toast.error("Couldn't log in")
            console.error(e)
        }
    }
    return (
        <div>
            <ToastContainer />
            <form className='flex flex-col w-full'>
                <input
                    className="mb-4 p-3 rounded bg-white outline-none text-300"
                    type="text"
                    name="email"
                    value={loginDetails.email}
                    onChange={handleInputChange}
                    placeholder='Email'
                />

                <div className="relative mb-4">
                    <input
                        className="p-3 rounded bg-white outline-none w-full text-300"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={loginDetails.password}
                        onChange={handleInputChange}
                        placeholder='Password'
                    />
                    <i
                        className='text-3xl text-100 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </i>
                </div>

                <input
                    className="bg-100 mb-3 p-3 rounded outline-none"
                    type="submit"
                    value="Log In"
                    onClick={handleSubmit}
                />
            </form>
        </div>
    );
}

export default Login;
