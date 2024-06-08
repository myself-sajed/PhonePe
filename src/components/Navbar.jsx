import React from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useDispatch, useSelector } from 'react-redux';
import { setIsBalanceModalOpen } from '../redux/slices/checkBalance';
import CheckBalanceModal from './CheckBalanceModal';
import UPIModal from './UPIModal';
import Prompts from './Prompts';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const isBalanceModalOpen = useSelector(state => state.checkBalance.isBalanceModalOpen)
    const isUPIModalOpen = useSelector(state => state.checkBalance.isUPIModalOpen)
    const isPromptOpen = useSelector(state => state.prompt.isPromptOpen)

    return (
        <div className='bg-[#c8c8ff] mt-5 rounded-full'>
            <div className="flex items-center justify-between px-4 py-1">
                <img src="/assets/logo.svg" className='h-14 cursor-pointer' alt="logo" />
                {/* <div className='flex items-center border-2 border-[#7f47e0] hover:border-[#6032af] ease-in-out duration-200 p-2 rounded-2xl'>
                    <SearchRoundedIcon sx={{ 'color': '#3e1b7a' }} />
                    <input type="search" size='50' className='outline-none border-none bg-transparent text-[#3e1b7a]' />
                </div> */}
                <div className='flex items-center justify-between font-sans font-bold gap-3 text-[#6739b7] '>
                    <Link to='/' className="hover:text-[#3e1b7a] cursor-pointer">Home</Link>
                    <Link to='/stores' className="hover:text-[#3e1b7a] cursor-pointer">Stores</Link>
                    <Link to='/insurance' className="hover:text-[#3e1b7a] cursor-pointer">Insurance</Link>
                    <Link to='/wealth' className="hover:text-[#3e1b7a] cursor-pointer">Wealth</Link>
                    <Link to='/services/history' className="hover:text-[#3e1b7a] cursor-pointer">History</Link>
                    <Link to='/about' className="hover:text-[#3e1b7a] cursor-pointer">About</Link>

                </div>

                {/* MODAL BALANCE */}
                {
                    isBalanceModalOpen ? <CheckBalanceModal /> : null
                }

                {/* MODAL UPI */}
                {
                    isUPIModalOpen ? <UPIModal /> : null
                }

                {
                    isPromptOpen ? <Prompts /> : null
                }


            </div>
        </div>
    )
}

export default Navbar