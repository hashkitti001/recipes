import { useState } from 'react';
import authBg from '../../../assets/authbg.jpeg';
import Login from './Login';
import Signup from './Signup';
import Header from '../Header';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    
    const toggleAction = () => {
        setIsLogin(prevState => !prevState);
    };

    return (
      <>
      <Header/>
        
        <div className='flex w-[100vw] h-screen max-sm:flex-col'>

            <div className='img-holder w-1/2 h-full max-md:w-full'>
                <img src={authBg} className="h-full object-cover" alt="Delish pancakes" />
            </div>


            <div className='w-1/2 bg-400 flex justify-center items-center max-md:w-full'>
                <div className='flex flex-col items-center w-2/3'>
                    <div className='flex justify-between bg-white p-3 rounded-lg mb-5 w-full'>
                        <span
                            className={`text-lg text-center p-3 rounded-lg ${isLogin ? 'bg-100 text-white' : 'text-gray-600'} w-3/6`}
                            onClick={toggleAction}
                        >
                            Log In
                        </span>
                        <span
                            className={`text-lg text-center p-3 rounded-lg ${!isLogin ? 'bg-100 text-white' : 'text-gray-600'} w-3/6`}
                            onClick={toggleAction}
                        >
                            Sign Up
                        </span>
                    </div>


                    <div className='w-full'>
                        {isLogin ? <Login /> : <Signup />}
                    </div>
                </div>
            </div>
        </div>
      </>
    );
}

export default AuthPage;
