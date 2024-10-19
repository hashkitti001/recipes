import { ChangeEvent, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

interface SignupDetails {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    country: string;
}

const Signup: React.FC = () => {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
      
        console.log('Signup Details:', signupDetails);
    };

    return (
        <div>
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
                    <option value="" disabled>Select Country</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">UK</option>
                    <option value="Australia">Australia</option>
                   
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
                    className="bg-100 mb-3 p-3 rounded outline-none" 
                    type="submit" 
                    value="Sign Up" 
                />
            </form>
        </div>
    );
}

export default Signup;
