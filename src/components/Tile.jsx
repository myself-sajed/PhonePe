import React from 'react'


const Tile = ({ icon, name }) => {
    return (
        <div className='flex flex-col w-32 h-32 justify-center border items-center border-violet-100  p-4 rounded-lg cursor-pointer hover:border-violet-200 hover:bg-violet-100 ease-in-out duration-200' >
            {icon}
            <span className='text-center text-violet-900'>{name}</span>
        </div>
    )
}

export default Tile