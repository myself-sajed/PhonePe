import React, { useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import { IconButton } from '@mui/material';
import EnterUPIID from './EnterUPIID';
import ChooseBank from './ChooseBank';
import FetchedBalance from './FetchedBalance';
import { useDispatch, useSelector } from 'react-redux';
import { setComponent, setIsBalanceModalOpen } from '../redux/slices/checkBalance';
import Loader from './Loader';
import Help from './Help';

const CheckBalanceModal = ({ setModal }) => {

    const component = useSelector(state => state.checkBalance.component)
    const dispatch = useDispatch()
    const [selectedBank, setSelectBank] = useState(null)
    const [enteredUpiId, setEnteredUpiId] = useState(null)
    const [isAuth, setIsAuth] = useState(false)



    return (
        <div className="bg-[#00004e6e] fixed top-0 bottom-0 z-10 right-0 left-0 flex justify-center items-center">
            <div className="bg-white rounded-xl p-3 w-[500px]">
                <div className='flex items-center justify-center gap-5 m-2'>
                    <div className='flex item-center justify-center gap-3'>
                        <AccountBalanceWalletRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '35px' }} />
                        <p className='font-sans text-xl md:text-3xl text-violet-900'>Check Bank Balance <Help /> </p>
                    </div>
                    <IconButton
                        onClick={() => {
                            dispatch(setIsBalanceModalOpen(false))
                            dispatch(setComponent('banks'))
                        }} >
                        <CloseRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '20px' }} />
                    </IconButton>
                </div>
                <hr />
                <div className="mb-2">


                    {
                        component === 'banks' ? <ChooseBank setSelectBank={setSelectBank} /> : component === 'upiid' ?
                            <EnterUPIID selectedBank={selectedBank} setEnteredUpiId={setEnteredUpiId} button1='Back' button2='Check Balace' /> : component === 'loader' ? <Loader title={'Fetching Balance'} enteredUpiId={enteredUpiId} selectedBank={selectedBank} setIsAuth={setIsAuth} /> : <FetchedBalance isAuth={isAuth} selectedBank={selectedBank} setModal={setModal} />
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

export default CheckBalanceModal