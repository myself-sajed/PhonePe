import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import CheckBalanceModal from './CheckBalanceModal';
import UPIModal from './UPIModal';
import Prompts from './Prompts';
import { Link } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Avatar, IconButton } from '@mui/material';
import Sidebar from './Sidebar';

const Navbar = ({ number }) => {
    const isBalanceModalOpen = useSelector(state => state.checkBalance.isBalanceModalOpen)
    const isUPIModalOpen = useSelector(state => state.checkBalance.isUPIModalOpen)
    const isPromptOpen = useSelector(state => state.prompt.isPromptOpen)
    const [open, setOpen] = useState(false)
    const user = useSelector(state => state.user.user);


    return (
        <div className='bg-[#c8c8ff] fixed top-0 left-0 z-30 w-full'>
            <div className="flex items-center justify-between px-4 py-1">
                <div className="flex items-center gap-5">
                    {user && <div data-bs-toggle="offcanvas" href="#sidebarPanel" role="button" aria-controls="sidebarPanel" className="lg:hidden block">
                        <IconButton>
                            <Avatar src={user.data.photoURL} sx={{ width: 30, height: 30 }} alt="dp" className="mx-auto text-lg lg:hidden block" />
                        </IconButton>
                    </div>}

                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="sidebarPanel" aria-labelledby="sidebarPanelLabel">
                        <div className="offcanvas-body relative">
                            <div className="absolute right-4 top-5">
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><CloseRoundedIcon /></button>
                            </div>
                            <Sidebar number={number} className='mt-[3.5rem]' />
                        </div>
                    </div>
                    <img src="/assets/logo.svg" className='md:h-14 h-10 cursor-pointer' alt="logo" />
                </div>

                <NavItems className="hidden md:flex items-center justify-between" />
                <div className="block md:hidden relative">
                    <IconButton onClick={() => setOpen((isOpen) => !isOpen)}>
                        {
                            open ? <CloseRoundedIcon /> : <MenuRoundedIcon />
                        }
                    </IconButton>
                    {
                        open && <div className="z-30 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 p-2 right-2 top-7">
                            <NavItems setOpen={setOpen} className="md:hidden flex flex-col items-start" />
                        </div>
                    }
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

function NavItems({ className, setOpen }) {
    return <div className={`${className} font-sans font-bold gap-3 text-[#6739b7]`}>
        <Link onClick={() => setOpen(false)} to='/' className="hover:text-[#3e1b7a] cursor-pointer">Home</Link>
        <Link onClick={() => setOpen(false)} to='/stores' className="hover:text-[#3e1b7a] cursor-pointer">Stores</Link>
        <Link onClick={() => setOpen(false)} to='/insurance' className="hover:text-[#3e1b7a] cursor-pointer">Insurance</Link>
        <Link onClick={() => setOpen(false)} to='/wealth' className="hover:text-[#3e1b7a] cursor-pointer">Wealth</Link>
        <Link onClick={() => setOpen(false)} to='/services/history' className="hover:text-[#3e1b7a] cursor-pointer">History</Link>
        <Link onClick={() => setOpen(false)} to='/about' className="hover:text-[#3e1b7a] cursor-pointer">About</Link>
    </div>
}