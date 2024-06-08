import React from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import { IconButton } from '@mui/material';
import EnterUPIID from './EnterUPIID';
import ChooseBank from './ChooseBank';
import FetchedBalance from './FetchedBalance';
import { useDispatch, useSelector } from 'react-redux';
import { setComponent, setIsBalanceModalOpen, setIsUPIModalOpen } from '../redux/slices/checkBalance';
import Loader from './Loader';
import Failed from './Failed';
import { useNavigate } from 'react-router-dom';
import Help from './Help';

const UPIModal = () => {
    const dispatch = useDispatch()
    const component = useSelector(state => state.checkBalance.component)
    const navigate = useNavigate()

    return (
        <div className="bg-[#00004e6e] fixed top-0 bottom-0 z-10 right-0 left-0 flex justify-center items-center">
            <div className="bg-white rounded-xl p-3 w-[500px]">
                <div className='flex items-center justify-center gap-5 m-2'>
                    <div className='flex item-center justify-center gap-3'>
                        <AccountBalanceWalletRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '35px' }} />
                        <p className='font-sans text-xl md:text-3xl text-violet-900'>Send to Contact number <Help /> </p>
                    </div>
                    <IconButton
                        onClick={() => {
                            dispatch(setIsUPIModalOpen(false))
                            navigate('/')
                        }} >
                        <CloseRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '20px' }} />
                    </IconButton>
                </div>
                <hr />
                <div className="mb-2">


                    {
                        component === 'upiid' ?
                            <EnterUPIID button1='Decline' button2='Send Money' />
                            : component === 'failed' ? <Failed /> : <Loader title={'Processing your payment'} />
                    }



                </div>
                <hr />
                <div className='my-3 flex items-center justify-center'>
                    <img src="/assets/upilogo.svg" alt="upi" className='h-14' />
                </div>

            </div>
        </div>
    )
}

export default UPIModal