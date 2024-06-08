import React from 'react'

const SideTile = ({ icon, topic, subtopic }) => {
    return (
        <div className='flex items-center justify-start gap-3 m-2 cursor-pointer hover:bg-violet-100 p-2 rounded-2xl ease-in-out duration-300'>
            {icon}
            <div className='flex flex-col items-start justify-start'>
                <p >{topic}</p>
                <p className="text-sm text-gray-600">{subtopic}</p>
            </div>
        </div>
    )
}

export default SideTile