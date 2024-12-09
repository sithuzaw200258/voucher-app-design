import React from 'react'
import Container from '../../../components/Container'
import useUserStore from '../../../stores/useUserStore';

const Header = () => {
    // const [userCookie] = reactUseCookie('my_user')
    // console.log(userCookie)
    // console.log(JSON.parse(userCookie))
    // const {name,email,profile_image} = JSON.parse(userCookie);

    const {user:{name,email,profile_image}} = useUserStore();
    return (
        <header className='mb-5'>
            <Container>
                <div className="flex justify-between items-center">
                    <div className="">
                        <h1 className='font-bold text-3xl'>Voucher App</h1>
                        <p className="text-stone-500">MMS Software</p>
                    </div>

                    <div className="">
                        <div className="flex items-center gap-x-2">
                            <img src={profile_image ? profile_image : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"} alt="" className='size-14 object-cover object-top rounded-full shadow-sm' />
                            <div className="">
                                <h1 className='font-bold text-xl'>{name}</h1>
                                <p className="text-stone-500">{email}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </Container>
        </header>
    )
}

export default Header