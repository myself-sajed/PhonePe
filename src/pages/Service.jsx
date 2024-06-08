import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Avatar, IconButton, RadioGroup } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import Loader from '../components/Loader'
import toast from 'react-hot-toast';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import EnterUPIID from '../components/EnterUPIID';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import { setComponent, setDetails, setIsUPIModalOpen } from '../redux/slices/checkBalance';
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../firebase';
import { DoNotTouchTwoTone } from '@mui/icons-material';
import { setPaymentDetails } from '../redux/slices/detailSlice';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import RepeatIcon from '@mui/icons-material/Repeat';
import Help from '../components/Help';

const Service = () => {

    const [loader, setLoader] = useState(null)
    const [showBanks, setShowBanks] = useState(false)
    const [showButton, setShowButton] = useState(true)
    const [showUPI, setShowUPI] = useState(false)
    const [showRadio, setShowRadio] = useState(true)
    const amountRef = useRef('')
    const numRef = useRef()
    // const { service } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    // details of receiver
    const [receiver, setReceiver] = useState(null)
    const [selectedBank, setSelectedBank] = useState(user.data.banks[0].bankName)

    // fetch user using phone number
    let index = 1;
    const fetchUser = async (phone) => {
        const querySnapshot = await getDocs(collection(db, "users"));

        querySnapshot.forEach((doc) => {

            if (doc.data().mobile.toString() === phone) {
                if (doc.data().mobile === user.data.mobile) {
                    setReceiver('self')
                    setLoader(false)
                }
                else {
                    setReceiver({ id: doc.id, data: doc.data() })
                    setLoader(false)
                }
            }
            else if (querySnapshot.size === index) {
                if (receiver !== 'self' && receiver === null) {
                    setLoader(false)
                    setReceiver('notfound')
                }
            }
            else {
                index++;
            }


        });


    }



    // Handle input number of receiver
    const handleInput = () => {
        // only 10 number are valid in input field
        if (numRef.current.value.length > 10) {
            numRef.current.value = numRef.current.value.slice(0, 10)
            setLoader(false)

        }
        else if (numRef.current.value.length === 10) {
            // setLoader(false)
            fetchUser(numRef.current.value)

        }
        else if (numRef.current.value.length === 0) {
            setLoader(null)
            setShowBanks(false)
            setReceiver(null)
        }
        else {
            setLoader(true)
            setShowBanks(false)
            setReceiver(null)
        }
    }

    // handle amount input
    const handleAmountInput = (e) => {


        if (amountRef.current.value.length > 0 && amountRef.current.value > 0) {
            setShowBanks(true)

            if (amountRef.current.value > 100000) {
                toast.error('Amount cannot be more than 1,00,000')
                setShowBanks(false)

            }

        }
        else {
            setShowBanks(false)
            dispatch(setIsUPIModalOpen(false))
            setShowButton(true)
        }

    }

    // Handle pay now
    const handlePayNow = () => {
        if (numRef.current.value.length !== 10) {
            toast.error('Please enter receiver Mobile Number')
        } else if (!amountRef.current.value.length > 0) {
            toast.error('Please enter Amount to Pay')
        }
        else {
            document.getElementById('amountInput').setAttribute('disabled', '')
            document.getElementById('numberInput').setAttribute('disabled', '')
            setShowRadio(false)
            setShowButton(false)
            dispatch(setIsUPIModalOpen(true))
            dispatch(setComponent('upiid'))




            // details to send
            const paymentDetails = {



                receiverId: receiver.id,
                receiverPhotoURL: receiver.data.photoURL,
                receiverName: receiver.data.name,
                receiverMobile: receiver.data.mobile,
                receiverBank: receiver.data.banks.find(bank => bank.isPrimary === true),
                amountToPay: parseInt(amountRef.current.value),
                selectedBank: user.data.banks.find(bank => bank.bankName === selectedBank),
                senderId: user.id,
                senderPhotoURL: user.data.photoURL,
                senderName: user.data.name,
                senderMobile: user.data.mobile,

                forSender: {
                    id: receiver.id,
                    photoURL: receiver.data.photoURL,
                    name: receiver.data.name,
                    actionFrom: 'Sent to',
                    mobile: receiver.data.mobile,
                    hisBank: receiver.data.banks.find(bank => bank.isPrimary === true),
                    amountToPay: parseInt(amountRef.current.value),
                    bankAction: 'Debited from',
                    bankOfAction: user.data.banks.find(bank => bank.bankName === selectedBank),
                },

                forReceiver: {
                    id: receiver.id,
                    photoURL: user.data.photoURL,
                    actionFrom: 'Received from',
                    name: user.data.name,
                    mobile: user.data.mobile,
                    hisBank: user.data.banks.find(bank => bank.bankName === selectedBank),
                    amountToPay: parseInt(amountRef.current.value),
                    bankAction: 'Credited to',
                    bankOfAction: receiver.data.banks.find(bank => bank.isPrimary === true),
                }

            }

            // share details to EnterUPIID component
            dispatch(setPaymentDetails(paymentDetails))

        }
    }

    useEffect(() => {
        numRef.current.focus()
        document.addEventListener("wheel", function (event) {
            if (document.activeElement.type === "number") {
                document.activeElement.blur();
            }
        });
    }, [])

    return (
        <div className='w-full'>

            {/* HEADER */}
            <div className="flex items-center justify-start gap-3 mb-2">
                <IconButton onClick={() => { navigate(-1) }}>
                    <ArrowBackRoundedIcon className="text-violet-900" sx={{ 'fontSize': '40px' }} />
                </IconButton>
                <p className="text-2xl md:text-3xl text-violet-900">Transfer money to Mobile Number <Help /></p>

            </div>
            <hr />
            <div className='ml-3 mt-3'>
                <div>
                    <div className='flex items-center justify-start gap-1'>
                        <RadioButtonCheckedRoundedIcon sx={{ 'fontSize': '15px', }} />
                        <p className="text-lg text-black">Mobile Number of Receiver</p>
                    </div>
                    <div className="flex items-end justify-start gap-2 mt-2">
                        <LocalPhoneRoundedIcon sx={{ 'fontSize': '30px', 'fontStyle': 'bold' }} className='text-violet-900' />

                        <input type="number" className='border-b-2  ease-in-out duration-500 px-3 py-1 outline-none border-b-violet-500 md:text-3xl font-bold focus:border-b-violet-900 text-violet-900' onChange={handleInput} ref={numRef} id='numberInput' />

                    </div>
                    <p className='text-sm text-gray-500 mt-2 mb-5'>Make sure you enter correct Mobile Number</p>
                </div>

                {/* receiver DETAILS */}

                <div className='mt-3 mb-5'>


                    {loader === false ?
                        receiver && receiver !== 'self' && receiver !== 'notfound' ?
                            <div className=''>
                                <div className='flex items-center justify-start gap-4 mt-2 bg-violet-900 p-2 rounded-lg w-full md:w-1/2'>
                                    <Avatar src={receiver.data.photoURL} sx={{ 'height': '45px', 'width': '45px' }} alt="thor" className='rounded-full' />
                                    <div className='flex-col items-start gap-0'>
                                        <div className='flex items-center justify-center gap-1'>
                                            <b className='text-white'>{receiver.data.name}</b>
                                            <VerifiedRoundedIcon sx={{ 'fontSize': '17px' }} className='text-white' />
                                        </div>
                                        <p className='leading-1 text-md text-white'>Receiver</p>
                                    </div>
                                </div>
                            </div>
                            : receiver === 'self' ?


                                <div className='bg-red-100 rounded-lg p-2 w-full md:w-1/2'>
                                    <div className='flex items-center justify-start gap-2'>
                                        <RepeatIcon className='text-red-500' />
                                        <p className='text-xl text-red-500'><b>{user.data.name}</b>, You can't Send Money to yourself.</p>
                                    </div>
                                    <p className='text-sm text-gray-500 ml-1'>Please check the Mobile Number and try again...</p>
                                </div>


                                :
                                receiver === 'notfound' ?
                                    <div className='bg-red-100 rounded-lg p-2 w-1/2'>
                                        <div className='flex items-center justify-start gap-2'>
                                            <QuestionMarkIcon className='text-red-500' />
                                            <p className='text-2xl text-red-500'>User not found.</p>
                                        </div>
                                        <p className='text-sm text-gray-500'><Link to='/https://www.phonepe.com/' className='text-blue-800 hover:underline ml-1'>Invite</Link> this user to <span className='text-[#6739b7] font-bold'>PhonePe</span>  and earn best Rewards and Gifts </p>
                                    </div>
                                    : null

                        : null}

                    {loader === true ?
                        <div className='flex item-start justify-start'>
                            <Loader title={'Fetching receiver Details'} />
                        </div> : null}

                </div>


                {/* PAY NOW */}
                <div className='mt-10'>
                    {
                        receiver && receiver !== 'self' && receiver !== null ? <div>
                            <div className='flex items-center justify-start gap-1'>
                                <RadioButtonCheckedRoundedIcon sx={{ 'fontSize': '15px', }} />
                                <p className="text-lg text-black">Amount to Pay </p>
                            </div>


                            <div className='flex items-center justify-start gap-1 mt-2'>
                                <CurrencyRupeeRoundedIcon sx={{ 'fontSize': '30px', 'fontStyle': 'bold' }} className='text-green-900' />

                                <input type="number" onChange={handleAmountInput} id='amountInput'
                                    ref={amountRef}
                                    className='border-b-green-700 focus:border-b-green-900 ease-in-out duration-500 border-b-2 outline-none text-violet-900 font-bold px-3 py-1 md:text-3xl' size={10} />

                            </div>
                            <p className='text-sm text-gray-500 mt-2 mb-5'>Make sure you enter accurate Amount</p>

                        </div> : null
                    }

                    {/* AVAILABLE BANKS */}
                    {
                        showBanks ? <div className='mt-3' >
                            <FormControl id='radio' disabled={!showRadio}>
                                <FormLabel className='text-black'>Choose Bank Account</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={user.data.banks[0].bankName}
                                    value={selectedBank}
                                    name="radio-buttons-group"
                                    onChange={(e) => {
                                        setSelectedBank(e.target.value)
                                    }}

                                >

                                    {
                                        user.data.banks.map((bank, index) => {
                                            return (
                                                <div key={index} className='flex items-center justify-start gap-2 my-2'>
                                                    <img src={bank.photoURL} className="img-responsive h-7 mr-2" alt="" />
                                                    <FormControlLabel value={bank.bankName} control={<Radio />} label={bank.bankName} />
                                                </div>
                                            )
                                        })
                                    }




                                </RadioGroup>
                            </FormControl>
                        </div>
                            : null
                    }


                </div>

                {/* UPI ID */}


                {
                    showUPI ? <>
                        <div className='flex items-center justify-start gap-1 mt-8'>
                            <RadioButtonCheckedRoundedIcon sx={{ 'fontSize': '15px', }} />
                            <p className="text-lg text-black">UPI ID </p>


                        </div>
                        <div className='flex items-center justify-start'>
                            <EnterUPIID button1='Decline' button2='Send Money' />
                        </div>
                    </> : null
                }




                <div className='mt-5'>

                    {
                        showButton ? <button className="ease-in-out duration-200 flex items-center gap-3  bg-green-800 hover:bg-green-900 p-3 rounded-full text-white" onClick={handlePayNow}>Proceed<ArrowForwardRoundedIcon /></button> : null
                    }

                </div>
            </div>
        </div>
    )
}

export default Service