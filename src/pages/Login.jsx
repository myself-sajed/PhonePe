import React, { useEffect, useRef, useState } from 'react'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import Axios from 'axios';


const Login = ({ setAuth }) => {

    const [otpStep, setOtpStep] = useState(false)
    const [otp, setOtp] = useState('')
    const numRef = useRef('')
    const [loader, setLoader] = useState(null)
    const [user, setUser] = useState(null)
    const [number, setNumber] = useState(null)
    const [serverOTP, setServerOTP] = useState(null)

    // fetch user using phone number
    let index = 1;
    const fetchUser = async (phone) => {
        const querySnapshot = await getDocs(collection(db, "users"));

        querySnapshot.forEach((doc) => {

            if (doc.data().mobile.toString() === phone) {
                setUser(true)
                setLoader(false)
                setNumber(phone)
            }
            else if (querySnapshot.size === index) {
                setUser(false)
                setLoader(false)

            }
            else {
                index++;
            }


        });



    }

    // handle mobile no input
    const handleInput = () => {
        // only 10 number are valid in input field
        if (numRef.current.value.length > 10) {
            numRef.current.value = numRef.current.value.slice(0, 10)
            setLoader(false)

        }
        else if (numRef.current.value.length === 10) {
            setLoader(true)
            console.log(typeof numRef.current.value);
            fetchUser(numRef.current.value)

        }
        else if (numRef.current.value.length === 0) {
            setLoader(null)
            setUser(null)
        }
        else {
            setLoader(true)
            setUser(null)
        }
    }


    // Send OTP
    const sendOTP = async () => {
        console.log('Number', number);
        console.log('send otp');
        if (!user) {
            toast.error('The Entered number is not Registered on PhonePe')
            return
        }
        else {

            // axios call for generating random otp
            Axios.get('http://localhost:4000/api/generateOTP').then(res => {
                if (res.data.message === 'ok') {
                    console.log(res.data.otp);
                    setServerOTP(res.data.otp)
                    toast.success('Your OTP is ' + res.data.otp);
                    setOtpStep(true)
                }
                else {
                    toast.error('Something went wrong')
                }
            })

        }
    }

    // Verify OTP
    const verifyOTP = () => {
        if (!otp) {
            toast.error('Please enter OTP')
            return
        }
        else {
            if (otp.length < 6) {
                toast.error('Otp must be 6 digit')
                return
            }
            else {
                if (otp.toString() === serverOTP.toString()) {
                    toast.success('Verified! Logging you in...')
                    setAuth(true)
                }
                else {
                    toast.error('Incorrect OTP')
                }
            }
        }
    }



    return (
        <div className="h-screen w-screen">
            <div className='flex items-center mx-20 justify-start gap-32 absolute top-0 bottom-52 right-0 left-0'>
                <div>
                    <div>
                        <p className='text-9xl font-bold text-violet-900'>Karte Ja.</p>
                        <p className='text-9xl font-bold text-violet-600'>Badhte Ja.</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-start gap-3  rounded-xl'>
                    <div>
                        <img src="/assets/logo.svg" alt="logo" className="h-20" />
                        <hr />
                    </div>

                    {/* // HEADING */}
                    {otpStep ?
                        <p className="text-sm text-violet-500">Enter OTP we just sent you</p> :

                        <div className="flex item-center justify-center">

                            <div>
                                {
                                    loader ?
                                        <CircularProgress sx={{ 'height': '10px', 'color': '#5f259f' }} />
                                        :
                                        user === true ?


                                            <p className="text-sm text-violet-500 flex items-center justify-start gap-1">User found on <span className='text-violet-900 font-bold'>PhonePe</span>. You may proceed.<VerifiedRoundedIcon sx={{ 'fontSize': '17px' }} className='text-green-700' /></p>


                                            : user === false ?
                                                <p className='text-sm text-red-500'>User is not registered with <span className='text-violet-900 font-bold'>PhonePe</span>. <Link to='/register' className='text-blue-900  hover:font-bold duration-200 ease-in-out'>Register Now</Link>.</p>
                                                : <p className="text-sm text-violet-500">Enter mobile registered with <span className='text-violet-900 font-bold'>PhonePe</span>.</p>
                                }
                            </div>
                        </div>
                    }


                    {/* // INPUT */}
                    {!otpStep ?

                        <input placeholder="Enter Mobile Number" maxLength="10" type="text" className='border-2 outline-none border-violet-900 rounded-full p-2 text-center bg-transparent text-violet-900 font-bold text-xl' id='numID' onChange={handleInput} ref={numRef} />

                        :

                        <input placeholder="Enter 6 digit OTP" maxLength="6" type="text" className='border-2 outline-none border-violet-900 rounded-full p-2 text-center bg-transparent text-violet-900 font-bold text-xl' value={otp} onChange={(e) => {
                            setOtp(e.target.value);
                            if (otp.length >= 6) {
                                return false
                            }
                        }} />}

                    {/* // BUTTON */}
                    {!otpStep ?

                        <button className='text-violet-900 mt-3 bg-violet-100 rounded-full border-violet-900 hover:bg-violet-200 duration-200 ease-in-out border flex px-3 py-2 font-bold gap-2 items-center' onClick={sendOTP}>Get OTP <ArrowForwardIosRoundedIcon fontSize='10px' /> </button>

                        :


                        <div className="flex items-center justify-between gap-2">
                            <button className='text-violet-900 mt-3 bg-violet-100 rounded-full border-violet-900 hover:bg-violet-200 duration-200 ease-in-out border flex px-3 py-2 font-bold gap-2 items-center' onClick={() => {
                                setOtpStep(false);

                            }}><ArrowBackIosNewRoundedIcon fontSize='10px' /> Back</button>


                            <button className='text-violet-900 mt-3 bg-violet-100 rounded-full border-violet-900 hover:bg-violet-200 duration-200 ease-in-out border flex px-3 py-2 font-bold gap-2 items-center' onClick={verifyOTP} >Verify<ArrowForwardRoundedIcon /> </button>


                        </div>


                    }


                    <p className="text-sm text-gray-500">By continuing, you agree to our <span className='text-violet-900 font-bold'>Terms of Service</span> and <span className='text-violet-900 font-bold'>Privacy Policy</span></p>
                </div>
            </div>
            <div className="flex items-center justify-center absolute border-t bottom-10 right-0 left-0">

                <div className="flex item-center justify-center gap-20 mt-10">
                    <img src="/assets/foot1.png" draggable={false} alt="" className="h-7" />
                    <img src="/assets/foot2.png" draggable={false} alt="" className="h-7" />
                </div>
            </div>
        </div>
    )
}

export default Login