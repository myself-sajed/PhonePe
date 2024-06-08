import React, { useEffect, useState } from 'react'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import AutoModeRoundedIcon from '@mui/icons-material/AutoModeRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SideTile from './SideTile';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { db } from '../firebase';
import { doc, onSnapshot, } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import Loader from './Loader';
import { Avatar } from '@mui/material';
import toast from 'react-hot-toast';
import BeenhereRoundedIcon from '@mui/icons-material/BeenhereRounded';


const Sidebar = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);


    // fetching current user details
    // sameer : YkiPF933bFSmFZyfxxVO
    // sajed : jbROIbXYpUWOAVc9O3k5
    useEffect(() => {
        const unsub = onSnapshot(
            doc(db, "users", "jbROIbXYpUWOAVc9O3k5"), // this is the id of shaikhsajed
            { includeMetadataChanges: true },
            (doc) => {
                dispatch(setUser({ id: doc.id, data: doc.data() }));
            })
    }, [])

    const changeBankConfig = (bank) => {
        // change bank config
        console.log(bank);
    }

    // copyUPIID
    const copyUPIID = () => {
        navigator.clipboard.writeText(user.data.upiId);
        toast.success('UPI ID copied to clipboard')
    }


    return (
        <div>
            {

                user !== null ? <div className="w-96">

                    {/* PROFILE */}
                    <p className='mb-3'>Your <span className='text-[#6739b7] font-bold'>PhonePe</span> Profile</p>
                    <div className='-2 -[#6739b7] p-3 rounded-3xl'>
                        <Avatar src={user.data.photoURL} sx={{ width: 140, height: 140 }} alt="dp" className="mx-auto text-lg " />

                        <div className='flex items-center justify-center gap-1'>
                            <p className="text-center font-bold text-[#6739b7]">{user && user.data.name}</p>
                            <VerifiedRoundedIcon sx={{ 'fontSize': '17px' }} className='text-green-700' />

                        </div>
                        <p className="text-center font-sm text-gray-600">{user && user.data.mobile}</p>
                        <p className="text-center font-sm text-gray-600">{user && user.data.email}</p>
                        <p className="text-center mx-10 font-sm text-violet-800 cursor-pointer mt-2 hover:font-bold hover:text-violet-900 ease-in-out duration-100 bg-violet-200 p-1 rounded-lg" onClick={copyUPIID}>{user && user.data.upiId}</p>
                    </div>

                    {/* Bank Accounts */}
                    <div className='mt-5 '>
                        <p className="text-violet-900 bg-violet-100 p-2 rounded-full">Linked Bank Account(s)</p>
                        <div className='mt-3 -2 -[#6739b7] p-3 rounded-3xl'>

                            {
                                user && user.data.banks.map((bank, index) => {
                                    return (
                                        <div key={index}>
                                            <div className='cursor-pointer m-2 hover:bg-violet-100 p-2 rounded-2xl ease-in-out duration-300' onClick={() => { changeBankConfig(bank) }}>
                                                <div className='flex items-start justify-between'>
                                                    <img src={user && bank.bankPhotoURL} alt="idbi" className='h-16' />
                                                    <div className='flex items-start justify-start flex-col'>
                                                        <p className="text-center font-sm text-gray-600">{user && bank.bankName}</p>
                                                        <p className="text-center font-sm text-gray-600">XXXX {user && bank.bankAcNo}</p>

                                                        {
                                                            bank.isPrimary ? <p className="text-center font-md gap-1 text-blue-600 flex items-center justify-start ">Primary<BeenhereRoundedIcon sx={{ 'fontSize': '15px', 'marginTop': '5px' }} /></p> : null
                                                        }

                                                    </div>
                                                </div>

                                            </div>
                                            <hr />
                                        </div>

                                    )
                                })
                            }





                        </div>
                    </div>

                    {/* Settings */}
                    <div className='my-5'>
                        <p className='text-violet-900 bg-violet-100 p-2 rounded-full'>Settings</p>
                        <div className='mt-3 -2 -[#6739b7] p-3 rounded-3xl'>

                            <SideTile icon={<AlternateEmailRoundedIcon />} topic='UPI Settings' subtopic='Set default to send & receive money' /> <hr />
                            <SideTile icon={<QrCodeScannerRoundedIcon />} topic='QR Codes' subtopic='View your QR Code' /> <hr />
                            <SideTile icon={<AutoModeRoundedIcon />} topic='Autopay Settings' subtopic='Manage your Autopay Settings' /> <hr />
                            <SideTile icon={<NotificationsNoneRoundedIcon />} topic='Reminders' subtopic='Never miss another bill payment' />

                        </div>
                    </div>


                    {/* Preferences */}
                    <div className='my-5'>
                        <p className='text-violet-900 bg-violet-100 p-2 rounded-full'>Preferences</p>
                        <div className='mt-3 -2 -[#6739b7] p-3 rounded-3xl'>

                            <SideTile icon={<TranslateRoundedIcon />} topic='Languages' subtopic='Chosen Language : English' /> <hr />

                            <SideTile icon={<DescriptionRoundedIcon />} topic='Bill Notifications' subtopic='Recieve alerts when bill is generated' /> <hr />

                            <SideTile icon={<LogoutRoundedIcon />} topic='Log Out' subtopic='You will be logged out of PhonePe' /> <hr />

                        </div>
                    </div>
                </div>

                    : <div className="w-96"><Loader title='Fetching User Details' /></div>

            }

        </div>
    )
}

export default Sidebar