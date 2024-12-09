import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import reactUseCookie from 'react-use-cookie';
import { login } from '../../../services/auth';
import Spinner from '../../../components/Spinner';

const LoginForm = () => {
    const [token, setToken] = reactUseCookie('my_token');
    const [userCookie, setUserCookie] = reactUseCookie('my_user');

    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();


    const handleLogin = async (data) => {
        try {
            const res = await login(data);
            const json = await res.json();

            if (res.ok) {
                toast.success("Login successfully");
                setToken(json.token);
                setUserCookie(JSON.stringify(json.user));
                navigate('/dashboard');
            } else {
                throw new Error(json.message);
            }
        } catch (error) {
            toast.error(error.message || 'An unexpected error occurred');
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 md:space-y-6" action="#">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input {...register("email")} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input {...register("password")} type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                        </div>
                    </div>
                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
                </div>
                <button type="submit" disabled={isSubmitting} className="flex justify-center items-center gap-3 disabled:opacity-50 disabled:pointer-events-none w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <span>Sign in</span> 
                    {isSubmitting && <Spinner />}
                </button>
                <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? <Link to={"/register"} className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
                </p>
            </form>
        </>
    )
}

export default LoginForm