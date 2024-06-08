import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full mt-[7rem] min-h-screen'>
            <div className='gap-0 flex flex-col items-center justify-start text-center '>
                <p className='font-bold md:text-[100px] text-[80px] lg:text-[150px] xl:text-[200px] leading-[150px] text-violet-700'>404</p>
                <p className='md:text-[100px] text-4xl lg:leading-[150px] text-violet-700'>Page not found</p>
                <p className='leading-[100px] text-gray-500 lg:mt-0 mt-10'>Sorry for your inconvenience, this page is not available. Go <Link to='/' className='underline text-blue-700 hover:text-blue-900 duration-200 ease-in-out hover:font-bold'>Home</Link></p>
            </div>
            <hr className='mx-20 mt-5' />
            <div className=' flex items-center justify-center' onClick={() => navigate('/')}>
                <img src="/assets/logo.svg" alt="logo" className="h-10 cursor-pointer" draggable={false} />
            </div>
        </div>
    )
}

export default PageNotFound