import React from 'react'
import { useNavigate } from 'react-router-dom';
import { removeCookie } from 'react-use-cookie'

const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        removeCookie('my_token');
        removeCookie('my_user');
        navigate('/');
    }
    return (
        <>
            <button onClick={handleLogout} type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Logout</button>
        </>
    )
}

export default LogoutButton