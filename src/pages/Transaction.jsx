import { Accordion, AccordionDetails, AccordionSummary, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import Tile from '../components/Tile';
import ConnectWithoutContactRoundedIcon from '@mui/icons-material/ConnectWithoutContactRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setComponent, setIsBalanceModalOpen } from '../redux/slices/checkBalance';
import { doc, getDoc, getDocFromCache } from "firebase/firestore";
import { db } from '../firebase';
import Loader from '../components/Loader';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import toast from 'react-hot-toast';



const Transaction = () => {

    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch()
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const { transactionURL } = useParams()
    const user = useSelector(state => state.user.user)
    const [transactionData, setTransactionData] = useState(null)
    const [success, setSuccess] = useState(true)

    // fetching details according to transactionURL
    useEffect(() => {

        async function fetcher() {
            const docRef = doc(db, "users", user.id);

            // Get a document, forcing the SDK to fetch from the offline cache.
            try {
                const doc = await getDoc(docRef);
                console.log('List of all the transactions so far ', doc.data().transactions);
                const theTransaction = doc.data().transactions.find((transaction) => transaction.transactionURL === transactionURL)

                console.log('Transaction for this page is', theTransaction);

                if (theTransaction) {
                    setTransactionData(theTransaction)
                } else {
                    setSuccess(false)
                    setTimeout(() => { navigate('/') }, 2000)
                }



            } catch (e) {
                console.log("Error getting cached document:", e);
            }
        }
        fetcher()
    }, [])

    const location = useLocation()


    const navigate = useNavigate()

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return (
        <div className="w-full">

            {
                transactionData ?
                    <>

                        {/* SUCCESSFUL */}
                        <div className='flex justify-between items-center bg-green-800 p-2 rounded-lg'>
                            <ArrowBackRoundedIcon sx={{ 'fontSize': '40px' }} className='text-white cursor-pointer' onClick={() => { navigate(-1) }} />
                            <p className='text-2xl text-white'>Transaction Successful</p>
                            <p className='text-lg text-white'>On {transactionData.date}</p>
                        </div>




                        {/* // transition of success or failure */}

                        {
                            location.state ?
                                <div className="my-3">
                                    <div div className='flex items-center justify-center my-2 mt-10' >

                                        {
                                            location.state ? <img src="/assets/success.png" draggable="false" alt="gif" className='h-24 animate-bounce' /> : null


                                        }
                                    </div >

                                    {
                                        location.state ? <p className="text-3xl text-center text-[#2c8059] duration-100 animate-bounce"><b>Rs. {(location.state.amountToPay).toLocaleString()}</b> sent Securely to <b>{location.state.receiverName}</b></p> : null


                                    }

                                </div > : null
                        }


                        <div className='mt-2 p-2'>
                            <p className='font-bold my-3'>{transactionData.details.actionFrom}</p>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center justify-start gap-3'>

                                    <img src={transactionData.details.photoURL} alt="thor" className="img-responsive rounded-[100px] border border-violet-900 h-14 " />
                                    <div>
                                        <p className='text-xl'>{transactionData.details.name}</p>
                                        <p className='text-md'>{transactionData.details.mobile}</p>
                                    </div>

                                </div>
                                {/* <p className='font-bold text-2xl text-red-900'>₹18900</p> */}
                                <p className='font-bold text-2xl text-violet-900'>₹{(transactionData.details.amountToPay).toLocaleString()}</p>
                            </div>
                            <div className='p-1 border-t border-b mt-4 flex items-center justify-start gap-2'>
                                <p className='font-sm text-gray-700'>Banking Name  :  <b>{transactionData.details.name}</b></p>
                                <VerifiedRoundedIcon sx={{ 'fontSize': '17px' }} className='text-green-700' />

                            </div>
                            <div className='mt-4'>

                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
                                    sx={{ 'boxShadow': 'none', 'borderRadius': '5px' }}>
                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                        <div className='flex items-center justify-between w-full'>
                                            <div className='flex items-center justify-start gap-3'>
                                                <FormatListBulletedRoundedIcon />
                                                <span className="font-bold tesxt lg">Transaction Details</span>
                                            </div>
                                            <KeyboardArrowDownRoundedIcon />
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div>
                                            <div>
                                                <p className='font-sm mt-3'>Transaction ID</p>
                                                <div className='flex items-center justify-start gap-3'>
                                                    <p className='font-bold text-2xl text-violet-900'>T{transactionData.transactionId}</p>
                                                    <IconButton onClick={() => {
                                                        navigator.clipboard.writeText(transactionData.transactionId);
                                                        toast.success('Transaction ID copied to clipboard')
                                                    }}><ContentCopyRoundedIcon className='text-violet-900' /></IconButton>
                                                </div>
                                            </div>
                                            <div>
                                                {/* <p className='font-sm my-3'>Credit to</p> */}
                                                <p className='font-sm my-3'>{transactionData.details.bankAction}</p>
                                                <div>
                                                    <div className='flex items-start justify-start gap-16'>
                                                        <div className='flex items-start justify-start gap-3'>
                                                            <img src={transactionData.details.bankOfAction.bankPhotoURL} alt={transactionData.details.bankOfAction.bankName} className='h-6' />
                                                            <p className='font-bold'>***********{transactionData.details.bankOfAction.bankAcNo}</p>
                                                        </div>
                                                        {/* <p className='font-bold text-lg text-red-900'>₹18900</p> */}
                                                        {
                                                            transactionData.details.bankAction === 'Debited from' ?
                                                                <p className='font-bold text-lg text-red-700'>
                                                                    -₹{(transactionData.details.amountToPay).toLocaleString()}</p>
                                                                :
                                                                <p className='font-bold text-lg text-green-900'>
                                                                    +₹{(transactionData.details.amountToPay).toLocaleString()}</p>
                                                        }


                                                    </div>
                                                    {/* <div className='flex items-center justify-start gap-2 ml-14'>
                                                        <p>UTR : 83428903840280348</p>
                                                        <IconButton><ContentCopyRoundedIcon sx={{ 'fontSize': '15px', 'color': 'black', 'marginTop': '2px' }} className='cursor-pointer' /></IconButton>
                                                    </div> */}
                                                </div>
                                            </div>

                                            <div>

                                            </div>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <hr />
                                <div className='flex items-center justify-center gap-3 my-3'>

                                    {/* <Tile icon={<ReplayRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '30px' }} />} name='Repeat Payment' /> */}

                                    <div onClick={() => dispatch(setIsBalanceModalOpen(true))}>

                                        <Tile icon={<AccountBalanceRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '30px' }} />} name='Check Balance' />
                                    </div>

                                    <div onClick={() => { navigate('/services/history') }}>
                                        <Tile icon={<CompareArrowsRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '30px' }} />} name='View the History' />
                                    </div>

                                    <Tile icon={<ShareRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '30px' }} />} name='Share Receipt' />
                                </div>

                                <div className='bg-violet-100 p-2 rounded-full hover:bg-violet-200 cursor-pointer duration-200 ease-in-out flex items-center justify-between'>
                                    <div className='flex items-center justify-start gap-3'>
                                        <ConnectWithoutContactRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '30px' }} />
                                        <p className='text-violet-900'>Contact PhonePe Support</p>
                                    </div>
                                    <ArrowForwardRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '30px' }} />
                                </div>
                            </div>
                        </div>

                    </>
                    :
                    <div>
                        <Loader title="Fetching Transaction Details" />
                    </div>

            }




        </div>
    )
}

export default Transaction