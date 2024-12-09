import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import LoadingPage from '../../../components/LoadingPage'

const PublicLayout = () => {
    return (
        <>
            <main className='flex flex-col min-h-screen'>
                <Header />
                <Suspense fallback={<LoadingPage />}>
                    <Outlet />
                </Suspense>
                <Footer />
            </main>
        </>
    )
}

export default PublicLayout