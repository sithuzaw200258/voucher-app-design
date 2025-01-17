import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { register as registerAccount } from '../../../services/auth';
import useUserStore from '../../../stores/useUserStore';
import Spinner from '../../../components/Spinner';

const RegisterForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

    const { user, setUser } = useUserStore();

    const handleRegister = async (data) => {
        console.log(data)
        const res = await registerAccount(data);
        console.log(res)
        const json = await res.json();
        console.log(json)

        if (res.status === 200) {
            toast.success("Register successfully")
            setUser(json.user);
            navigate('/login')
        } else {
            toast.error(json.message)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-4 md:space-y-6" action="#">
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input {...register('name')} type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg. John Doe" />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input {...register('email')} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="johndoe@gmail.com" />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input {...register('password')} type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input {...register('password_confirmation')} type="password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a></label>
                    </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="flex justify-center items-center gap-3 disabled:opacity-50 disabled:pointer-events-none w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <span>Create an account</span> 
                    {isSubmitting && <Spinner />}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? <Link to={'/login'} className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
                </p>
            </form>
        </>
    )
}

export default RegisterForm