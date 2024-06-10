import React, { useEffect } from 'react'
import checkBalance, { setComponent, setIsBalanceModalOpen } from '../redux/slices/checkBalance'
import { useDispatch } from 'react-redux'
import { doc, setDoc } from "firebase/firestore";
import toast from 'react-hot-toast'
import { db } from '../firebase';

const FetchedBalance = ({ selectedBank, isAuth }) => {

    const dispatch = useDispatch()


    useEffect(() => {
        if (isAuth) {
            toast.success('Balance fetched successfully')
        } else {
            toast.error('Failed to fetch balance')
        }
    }, [])


    return (
        <div>


            <div className="my-3 w-full">
                <div div className='flex items-center justify-center my-2' >

                    {
                        isAuth ? <img src="/assets/success.png" draggable="false" alt="gif" className='h-16 animate-pulse' /> : <img src="/assets/cancel.png" draggable="false" alt="gif" className='h-16 animate-pulse' />
                    }
                </div >

                {
                    isAuth ? <p className="text-xl text-center text-[#2c8059] animate-pulse">Balance fetched successfully</p> : <p className="text-xl text-red-500 text-center animate-pulse">Failed to fetch balance</p>
                }
            </div >
            <div className='my-3'>

                {
                    isAuth ? <>
                        <h1 className="text-violet-900 text-[50px] text-center font-bold">
                            ₹ {selectedBank.bankBalance.toLocaleString()}</h1>
                        <div className='flex items-center justify-center gap-1 mt-3'>
                            <img src={selectedBank.bankPhotoURL} alt="idbi" className="img-responsive h-7" />
                            <span className='text-xl'>{selectedBank.bankName}</span>
                        </div>

                    </>

                        :
                        <>

                            <p className="text-center text-lg text-red-700">Wrong UPI ID entred</p>
                            <p className='text-sm text-center text-gray-500'>Please try again...</p>

                        </>
                }

                <div className="flex items-center justify-center my-4">



                    {
                        isAuth ? <button className="border-2 rounded-xl p-2 border-violet-900 text-violet-900 hover:bg-violet-100 font-bold w-full mx-20 mt-4 text-center"
                            onClick={() => {
                                dispatch(setIsBalanceModalOpen(false))
                                dispatch(setComponent('banks'))
                            }}>Done</button>
                            :
                            <button className="border-2 rounded-xl p-2 border-violet-900 text-violet-900 hover:bg-violet-100 font-bold w-full mx-20 mt-4 text-center"
                                onClick={() => {
                                    dispatch(setComponent('banks'))
                                }}>Retry</button>
                    }

                </div>
            </div>


        </div >
    )
}

export default FetchedBalance