import React, { useRef } from 'react'
import Breadcrumb from '../../../components/Breadcrumb'
import Container from '../../../components/Container'
import reactUseCookie from 'react-use-cookie'
import { LiaCameraRetroSolid } from 'react-icons/lia'
import useUserStore from '../../../stores/useUserStore'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { BiSolidEdit } from 'react-icons/bi'
import { uploadImage } from '../../../services/user_profile'

const UserProfilePage = () => {
    const [token] = reactUseCookie('my_token')
    const [userCookie, setUserCookie] = reactUseCookie('my_user')
    // const { name, email, profile_image } = JSON.parse(userCookie);

    const { user, setUser } = useUserStore();
    const { name, email, profile_image } = user;

    const baseUrl = import.meta.env.VITE_API_URL;
    const updateImageUrl = baseUrl + '/user-profile/change-profile-image';

    const fileInputRef = useRef();
    const handleUpdateImage = async (event) => {
         // console.log(event)
        // console.log(event.target)
        // console.log(event.target.files)
        // console.log(event.target.files[0])
        try {
            const formData = new FormData();
            formData.append('profile_image', event.target.files[0]);
            // console.log(formData)

            const res = await uploadImage(updateImageUrl, formData);
            const json = await res.json();

            if (res.status === 200) {
                toast.success(json.message);
                setUserCookie(JSON.stringify(json.user));
                setUser(json.user);
            } else {
                throw new Error(json.message);
            }
        } catch (error) {
            toast.error(error.message || 'An unexpected error occurred');
        }
    }
    const handleImageUploader = () => {
        // console.log(fileInputRef)
        // console.log(fileInputRef.current);
        fileInputRef.current.click();
    };
    return (
        <section>
            <Container>
                <Breadcrumb currentPageName={'User Profile'} />

                <div className="rounded bg-slate-50 mt-5 w-1/2 px-5 py-10">
                    <div className="flex flex-col justify-center items-center gap-y-3">
                        <div className="relative">
                            <img src={profile_image ? profile_image : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"} alt="" className='size-36 object-cover object-top rounded-full shadow-sm' />
                            <LiaCameraRetroSolid onClick={handleImageUploader} className='size-10 text-slate-500 absolute left-1/2 -translate-x-1/2 bottom-0 opacity-0 hover:opacity-100 duration-300' />

                            <input ref={fileInputRef} onChange={handleUpdateImage} type="file" className='hidden' />
                        </div>
                        <div className='text-center'>
                            <p className="text-lg font-bold flex items-center justify-center">
                                {name}
                                <Link to={"/dashboard/user-profile/change-name"} className='inline-block ms-2 bg-slate-300 p-1 rounded hover:bg-slate-400'>
                                    <BiSolidEdit className='text-blue-500 hover:text-blue-600' />
                                </Link>
                            </p>
                            <p className="text-md">{email}</p>
                        </div>
                        <Link to={"/dashboard/user-profile/change-password"} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Change Password</Link>

                    </div>
                </div>
            </Container>
        </section>
    )
}

export default UserProfilePage