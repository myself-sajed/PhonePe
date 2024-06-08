import React from 'react'
import { useDispatch } from 'react-redux'
import { setComponent, setIsBalanceModalOpen, setIsUPIModalOpen } from '../redux/slices/checkBalance'

const Failed = () => {

    const dispatch = useDispatch()

    return (
        <div className='w-full'>
            <div className="flex items-center flex-col">
                <img src="/assets/cancel.png" className="h-16 mt-5 animate-bounce" alt="" />
                <div className='mt-5 mx-10'>
                    <p className="text-3xl mb-3 text-red-500 text-center font-bold ">Insufficient funds in your Bank Account</p>
                    <p className="text-sm text-gray-500 text-center">Please, make sure you have enough balance and retry again. </p>
                </div>
                <div className='flex items-center justify-center mt-5 mb-3'>
                    <button className="border-2 rounded-xl p-2 border-violet-900 text-violet-900 hover:bg-violet-100 font-bold w-full px-20 mt-4 text-center"
                        onClick={() => {
                            dispatch(setIsUPIModalOpen(false))
                            dispatch(setComponent('banks'))
                        }}>Dismiss</button>
                </div>

            </div>
        </div>
    )
}

export default Failed