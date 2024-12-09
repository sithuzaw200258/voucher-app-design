import React from 'react'

const Container = ({children}) => {
    return (
        <div className='w-full md:w-[720px] lg:w-[960px] mx-auto'>
            {children}
        </div>
    )
}

export default Container