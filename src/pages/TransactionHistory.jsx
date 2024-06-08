import React, { useEffect, useState } from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import FilterModal from '../components/FilterModal';
import OneTransaction from '../components/OneTransaction';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';

const TransactionHistory = () => {

    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)
    let transactions = user.data.transactions.slice().sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })
    const [sliceUpto, setSliceUpto] = useState(7)
    const arrayLength = transactions.length


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {

    })

    return (
        <div className='w-full relative overflow-auto overflow-x-hidden change__scrollbar transactionH' >



            <div className='mx-3'>
                <div className="flex justify-between items-center">
                    <div className='flex items-center justify-start gap-3'>
                        <ArrowBackRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} className='cursor-pointer' onClick={() => { navigate(-1) }} />

                        <p className='text-3xl text-violet-900'>Transaction History</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center justify-start gap-2 border-2 border-violet-900 rounded-full p-1 cursor-pointer'>
                            <span className='text-violet-900'>Month</span>
                            <KeyboardArrowDownRoundedIcon className='text-violet-900' />
                        </div>
                        <div className='flex items-center justify-start gap-2 border-2 border-violet-900 rounded-full p-1 cursor-pointer'>
                            <span className='text-violet-900'>Categories</span>
                            <KeyboardArrowDownRoundedIcon className='text-violet-900' />
                        </div>
                        <div className='flex items-center justify-start gap-2 border-2 border-violet-900 rounded-full p-1 cursor-pointer'>
                            <span className='text-violet-900'>Filters</span>
                            <KeyboardArrowDownRoundedIcon className='text-violet-900' />
                        </div>
                    </div>

                </div>

                {
                    transactions.length > 0 ?
                        <div className='mt-4'>

                            {
                                transactions.slice(0, sliceUpto).map((transaction, index) => {
                                    return (
                                        <div key={index} onClick={() => navigate(`/services/transaction/${transaction.transactionURL}`)}>
                                            <OneTransaction transaction={transaction} />
                                        </div>
                                    )
                                }
                                )
                            }



                            {
                                arrayLength >= sliceUpto ?
                                    <div className="flex items-center gap-3 mx-auto cursor-pointer hover:bg-slate-300 justify-center mt-5 bg-slate-200 rounded-xl p-2 w-1/2" onClick={() => { setSliceUpto(sliceUpto + 7) }}>
                                        <ExpandCircleDownRoundedIcon className='text-slate-500' />
                                        <p className='text-slate-500 font-bold'>Load More Transactions</p>
                                    </div> : null
                            }

                        </div>
                        :
                        <div className='mt-4'>
                            <div className='flex flex-col items-center justify-center'>
                                <img src="/assets/Empty-bro.svg" alt="empty" className="h-[340px]" />
                                <p className='text-6xl text-gray-700'>No Transactions Yet</p>
                                <Link to='/services/transfer-money/to-mobile-number' className='text-xl text-blue-900 bg-blue-100 p-2 rounded-xl mt-3 hover:bg-blue-200 ease-in-out duration-200 flex items-center justify-start gap-2'>Make your first Transaction <ArrowForwardRoundedIcon className='text-blue-900' /></Link>
                            </div>
                        </div>

                }
            </div>


        </div>
    )
}

export default TransactionHistory