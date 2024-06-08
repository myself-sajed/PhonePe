import React, { useEffect, useState } from 'react'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import Tile from './Tile';
import MobileFriendlyRoundedIcon from '@mui/icons-material/MobileFriendlyRounded';
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import WbIncandescentRoundedIcon from '@mui/icons-material/WbIncandescentRounded';
import CreditScoreRoundedIcon from '@mui/icons-material/CreditScoreRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AssuredWorkloadRoundedIcon from '@mui/icons-material/AssuredWorkloadRounded';
import PropaneTankRoundedIcon from '@mui/icons-material/PropaneTankRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import TwoWheelerRoundedIcon from '@mui/icons-material/TwoWheelerRounded';
import ElectricCarRoundedIcon from '@mui/icons-material/ElectricCarRounded';
import BloodtypeRoundedIcon from '@mui/icons-material/BloodtypeRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import ConnectingAirportsRoundedIcon from '@mui/icons-material/ConnectingAirportsRounded';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import SoupKitchenRoundedIcon from '@mui/icons-material/SoupKitchenRounded';
import TrainRoundedIcon from '@mui/icons-material/TrainRounded';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
import HistoryToggleOffRoundedIcon from '@mui/icons-material/HistoryToggleOffRounded';
import { useNavigate } from 'react-router-dom';
import CheckBalanceModal from './CheckBalanceModal';
import { useDispatch, useSelector } from 'react-redux';
import { setIsBalanceModalOpen } from '../redux/slices/checkBalance';

const Rightbar = () => {

    const isBalanceModalOpen = useSelector(state => state.checkBalance.isBalanceModalOpen)
    const navigate = useNavigate()
    const dispatch = useDispatch()



    return (
        <div className='w-full mb-10'>



            {/* HERO VIDEO */}
            <div className='flex justify-around w-full'>

                <div className='flex flex-col items-start justify-start mt-6 gap-0 leading-[100px]'>
                    <p className='text-[#5b32a1] font-bold font-sans text-[100px]'>Simple</p>
                    <p className='text-[#7843d4] font-bold font-sans text-[100px]'>Fast</p>
                    <p className='text-[#894ef0] font-bold font-sans text-[100px]'>&</p>
                    <p className='text-[#a36dff] font-bold font-sans text-[100px]'>Secure</p>
                </div>

                <video width="450" height="340" loop muted autoPlay>
                    <source src="/assets/v1.mp4" type="video/mp4" />
                    Your browser does not support the html video tag.
                </video>

            </div>
            <br /><br />
            {/* TILES */}
            <div>
                {/* SERVICES */}

                <div className='flex justify-center gap-2'>
                    <img src="/assets/logo.svg" alt="phonepe" className="h-16" />
                    <p className='text-center font-bold mt-4 text-3xl text-[#562f99]'> Services </p>
                </div>

                {/* TRANSFER MONEY */}
                <div className='mx-10 mb-10'>
                    <p className='bg-[#6e49ad] rounded-lg p-1 text-center my-4 text-white'>Transfer Money</p>

                    <div className='flex items-center justify-center gap-8'>

                        <div onClick={() => navigate('/services/transfer-money/to-mobile-number')} ><Tile icon={<PersonRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='To Mobile Number' /></div>

                        <div onClick={() => navigate('/services/transfer-money/to-bank-upi')}><Tile icon={<AccountBalanceRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='To Bank / UPI ID' /></div>

                        <div onClick={() => navigate('/services/transfer-money/to-self-account')}><Tile icon={<RepeatRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='To Self Account' /></div>

                        <div onClick={() => dispatch(setIsBalanceModalOpen(true))}><Tile icon={<AccountBalanceWalletRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Check Bank Balance' /></div>

                        <div onClick={() => { navigate('/services/history') }}><Tile icon={<HistoryToggleOffRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Transaction History' /></div>


                    </div>
                </div>

                {/* RECHARGE */}
                <div className='mx-10'>
                    <p className='bg-[#6e49ad] rounded-lg p-1 text-center my-4 text-white'>Recharge & Pay Bills</p>

                    <div className='flex items-center justify-center gap-8 flex-wrap'>

                        <Tile icon={<MobileFriendlyRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Mobile Recharge' />

                        <Tile icon={<LiveTvRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='DTH Bill' />

                        <Tile icon={<WbIncandescentRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Electricity Bill' />

                        <Tile icon={<CreditScoreRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Credit Card Bill' />

                        <Tile icon={<HomeRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Rent Payment' />

                        <Tile icon={<AssuredWorkloadRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Loan Repayment' />

                        <Tile icon={<PropaneTankRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Book a Cylinder' />

                        <Tile icon={<ArrowForwardRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='See All' />


                    </div>
                </div>
                {/* RECHARGE */}
                <div className='mx-10'>
                    <p className='bg-[#6e49ad] rounded-lg p-1 text-center my-4 text-white'>Insurance</p>

                    <div className='flex items-center justify-center gap-8 flex-wrap'>

                        <Tile icon={<HealthAndSafetyRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Health ++' />

                        <Tile icon={<TwoWheelerRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Bike' />

                        <Tile icon={<ElectricCarRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Car' />

                        <Tile icon={<BloodtypeRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Personal Accident' />

                        <Tile icon={<VolunteerActivismRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Term Life' />

                        <Tile icon={<ConnectingAirportsRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='International Travel' />

                        <Tile icon={<PublishedWithChangesRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Insurance Renewal' />

                        <Tile icon={<ArrowForwardRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='See All' />


                    </div>
                </div>

                {/* Donation MONEY */}
                <div className='mx-10 mb-10'>
                    <p className='bg-[#6e49ad] rounded-lg p-1 text-center my-4 text-white'>Donation</p>

                    <div className='flex items-center justify-center gap-8'>

                        <Tile icon={<LocalHospitalRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='World Health Day' />

                        <Tile icon={<SchoolRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Girl Child Education' />

                        <Tile icon={<SoupKitchenRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Donate Meals' />

                        <Tile icon={<ArrowForwardRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='See All' />


                    </div>
                </div>

                {/* Switch */}
                <div className='mx-10 mb-10'>
                    <p className='bg-[#6e49ad] rounded-lg p-1 text-center my-4 text-white'>Switch</p>

                    <div className='flex items-center justify-center gap-8'>

                        <Tile icon={<TrainRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Trains' />

                        <Tile icon={<FlightTakeoffRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Flights' />

                        <Tile icon={<DirectionsBusRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='Bus' />

                        <Tile icon={<ArrowForwardRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '40px' }} />} name='See All' />


                    </div>
                </div>

            </div>
        </div>
    )
}

export default Rightbar