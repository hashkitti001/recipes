import { ChangeEvent, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import axios from 'axios'
import countriesData from '../countries';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'


interface SignupDetails {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    country: string;
}

const Signup = () => {
    const [signupDetails, setSignupDetails] = useState<SignupDetails>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: ''
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSignupDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://recipes-backend-0meq.onrender.com/auth/signup', signupDetails)
            if (response.status === 201) {
                //Replace with Toastify
                toast.success("Sign up successful!")
                
            }
            toast.info(response.data)
            
        } catch (e) {
           toast.error("Couldn't sign up!")
           console.error(e)
        }
    };

    return (
        <div>
            <ToastContainer/>
            <form className='flex flex-col w-full' onSubmit={handleSubmit}>
                <input
                    className="mb-4 p-3 rounded bg-white outline-none text-300"
                    type="text"
                    name="name"
                    value={signupDetails.name}
                    onChange={handleInputChange}
                    placeholder='Name'
                    autoComplete='false'
                />
                <input
                    className="mb-4 p-3 rounded bg-white outline-none text-300"
                    type="email"
                    name="email"
                    value={signupDetails.email}
                    onChange={handleInputChange}
                    placeholder='Email'
                    autoComplete='false'
                />
                   
                <select
                    className="mb-4 p-3 rounded bg-white outline-none text-300"
                    name="country"
                    value={signupDetails.country}
                    onChange={handleInputChange}

                >
                   
                    {countriesData.map((country) => (
                        <option key={country.code} value={country.name}>{country.name}</option>
                    ))}

                </select>

                <div className="relative mb-4">
                    <input
                        className="p-3 rounded bg-white outline-none w-full text-300"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={signupDetails.password}
                        onChange={handleInputChange}
                        placeholder='Password'
                        autoComplete='false'
                    />
                    <i
                        className='text-3xl text-100 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </i>
                </div>

                <div className="relative mb-4">
                    <input
                        className="p-3 rounded bg-white outline-none w-full text-300"
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={signupDetails.confirmPassword}
                        onChange={handleInputChange}
                        placeholder='Confirm Password'
                        autoComplete='false'
                    />
                    <i
                        className='text-3xl text-100 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </i>
                </div>

                <input
                    className="bg-100 mb-3 p-3 rounded outline-none cursor-pointer"
                    type="submit"
                    value="Sign Up"
                    onClick={handleSubmit}
                />
            </form>
        </div>
    );
}

export default Signup;
