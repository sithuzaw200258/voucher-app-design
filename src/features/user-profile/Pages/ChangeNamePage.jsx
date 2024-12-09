import React from 'react'
import Container from '../../../components/Container'
import Breadcrumb from '../../../components/Breadcrumb'
import { useNavigate } from 'react-router-dom'
import reactUseCookie from 'react-use-cookie'
import { useForm } from 'react-hook-form'
import useUserStore from '../../../stores/useUserStore'
import toast from 'react-hot-toast'
import { changeName } from '../../../services/user_profile'

const ChangeNamePage = () => {
    const [userCookie, setUserCookie] = reactUseCookie('my_user')
    const [token] = reactUseCookie('my_token')

    const { user, setUser } = useUserStore();

    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: 'onChange' });

    const baseUrl = import.meta.env.VITE_API_URL;
    const changeNameUrl = baseUrl + '/user-profile/change-name';
    const handleChangeName = async ({ name }) => {
        try {
            const res = await changeName(changeNameUrl, { name });
            const json = await res.json();

            if (res.status === 200) {
                toast.success(json.message);
                setUserCookie(JSON.stringify(json.user));
                setUser(json.user);
                navigate('/dashboard/user-profile');
            } else {
                throw new Error(json.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <section>
            <Container>
                <Breadcrumb currentPageName={'Change Name'} links={[{ name: 'User Profile', path: '/dashboard/user-profile' }]} />

                <div className="bg-green-500 text-white w-1/2 py-2 px-3 rounded mt-5">Change Your Name</div>

                <div className="rounded bg-slate-50 mt-5 w-1/2 p-5">
                    <form onSubmit={handleSubmit(handleChangeName)} className="space-y-4  md:space-y-5" action="#">

                        <div>
                            <label htmlFor="name" className={`block mb-2 text-sm font-medium  ${errors.name ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>New Name</label>
                            <input {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters long",
                                },
                            })} type="text" name="name" id="name" placeholder="eg. John Doe" className={` border ${errors.name ? 'border-red-500 focus:border-red-600 dark:border-red-600 dark:focus:border-red-500 focus:ring-red-600 dark:focus:ring-red-500' : 'border-gray-300 focus:border-blue-600 dark:border-gray-600 dark:focus:border-blue-500 focus:ring-blue-600 dark:focus:ring-blue-500'} bg-gray-50  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white `} />
                            {errors.name && <p className='text-red-600 text-sm'>{errors.name.message}</p>}
                        </div>

                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change Name</button>
                    </form>
                </div>
            </Container>
        </section>
    )
}

export default ChangeNamePage