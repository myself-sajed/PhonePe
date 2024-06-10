import React from 'react'

const OneTransaction = ({ transaction }) => {
    return (
        <div>

            <div className="flex items-center justify-between gap-4 my-1 cursor-pointer hover:bg-violet-100 p-2 rounded-lg ease-in-out duration-200">
                <div className='flex items-center gap-4'>
                    <img src={transaction.details.photoURL} alt="" className="rounded-[100px] border border-violet-900 md:h-14 h-10" />
                    <div className='flex flex-col '>
                        <p className='text-base sm:text-lg md:text-xl'>{transaction.details.actionFrom}</p>
                        <p className='text-xs sm:text-sm md:text-base'>{transaction.details.name}</p>
                    </div>
                </div>
                <div className='flex flex-col items-end justify-end'>
                    {transaction.details.actionFrom === 'Sent to' ? <p className='font-bold text-red-700 sm:text-xl text-lg md:text-2xl'>-₹{(transaction.details.amountToPay).toLocaleString()}</p> : <p className='font-bold text-green-900 sm:text-xl text-lg md:text-2xl'>+₹{(transaction.details.amountToPay).toLocaleString()}</p>}
                    <p className='text-xs md:text-sm'>{transaction.date}</p>
                </div>
            </div>
            <hr />

        </div>
    )
}

export default OneTransaction