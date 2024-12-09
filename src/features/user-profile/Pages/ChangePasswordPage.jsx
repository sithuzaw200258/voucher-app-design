import React from 'react'
import Container from '../../../components/Container'
import Breadcrumb from '../../../components/Breadcrumb'
import { useForm } from 'react-hook-form'
import reactUseCookie, { removeCookie } from 'react-use-cookie'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { changePassword } from '../../../services/user_profile'

const ChangePasswordPage = () => {
    const [userCookie,setUserCookie] = reactUseCookie('my_user')
    const [token] = reactUseCookie('my_token')

    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({mode: 'onChange'});

    const baseUrl = import.meta.env.VITE_API_URL;
    const changePasswordUrl = baseUrl + '/user-profile/change-password';
    const handleChangePassword = async (data) => {
        // console.log(data)
        const res = await changePassword(changePasswordUrl,data);

        const json = await res.json();

        if (res.status === 200) {
            toast.success(json.message);
            // setUserCookie(JSON.stringify(json.user));
            removeCookie('my_token');
            removeCookie('my_user');
            navigate('/');
        } else {
            toast.error(json.message);
        }
    }

    const new_password = watch('new_password')
    return (
        <section>
            <Container>
                <Breadcrumb currentPageName={'Change Password'} links={[{ name: 'User Profile', path: '/dashboard/user-profile' }]} />

                <div className="bg-green-500 text-white w-1/2 py-2 px-3 rounded mt-5">Change Your Password</div>

                <div className="rounded bg-slate-50 mt-5 w-1/2 p-5">
                    <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-4  md:space-y-5" action="#">

                        <div>
                            <label htmlFor="old_password" className={`block mb-2 text-sm font-medium  ${errors.old_password ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>Old Password</label>
                            <input {...register("old_password", {
                                required: "Old Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Old Password must be at least 8 characters long",
                                },
                            })} type="password" name="old_password" id="old_password" placeholder="••••••••" className={` border ${errors.old_password ? 'border-red-500 focus:border-red-600 dark:border-red-600 dark:focus:border-red-500 focus:ring-red-600 dark:focus:ring-red-500' : 'border-gray-300 focus:border-blue-600 dark:border-gray-600 dark:focus:border-blue-500 focus:ring-blue-600 dark:focus:ring-blue-500'} bg-gray-50  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white `} />
                            {errors.old_password && <p className='text-red-600 text-sm'>{errors.old_password.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="new_password" className={`block mb-2 text-sm font-medium  ${errors.new_password ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>New Password</label>
                            <input {...register("new_password", {
                                required: "New Password is required",
                                minLength: {
                                    value: 8,
                                    message: "New Password must be at least 8 characters long",
                                },
                            })} type="password" name="new_password" id="new_password" placeholder="••••••••" className={` border ${errors.new_password ? 'border-red-500 focus:border-red-600 dark:border-red-600 dark:focus:border-red-500 focus:ring-red-600 dark:focus:ring-red-500' : 'border-gray-300 focus:border-blue-600 dark:border-gray-600 dark:focus:border-blue-500 focus:ring-blue-600 dark:focus:ring-blue-500'} bg-gray-50  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white `} />
                            {errors.new_password && <p className='text-red-600 text-sm'>{errors.new_password.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="new_password_confirmation" className={`block mb-2 text-sm font-medium  ${errors.new_password_confirmation ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>Confirm Password</label>
                            <input {...register("new_password_confirmation", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === new_password || "Passwords do not match"
                            })} type="password" name="new_password_confirmation" id="new_password_confirmation" placeholder="••••••••" className={` border ${errors.new_password_confirmation ? 'border-red-500 focus:border-red-600 dark:border-red-600 dark:focus:border-red-500 focus:ring-red-600 dark:focus:ring-red-500' : 'border-gray-300 focus:border-blue-600 dark:border-gray-600 dark:focus:border-blue-500 focus:ring-blue-600 dark:focus:ring-blue-500'} bg-gray-50  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white `} />
                            {errors.new_password_confirmation && <p className='text-red-600 text-sm'>{errors.new_password_confirmation.message}</p>}
                        </div>

                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change passwod</button>
                    </form>
                </div>
            </Container>
        </section>
    )
}

export default ChangePasswordPage