import React from 'react'

const LoadingPage = () => {
    
    return (
        <>
            <div className='w-full fixed top-0 left-0'>
                <div className='h-1 w-full bg-blue-100 overflow-hidden'>
                    <div className='progress w-full h-full bg-blue-500 left-right'></div>
                </div>
            </div>

            <div className='flex justify-center items-center h-screen'>
                {/* <div>Loading ...</div> */}
                <div className="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </div>
        </>
    )
}

export default LoadingPage