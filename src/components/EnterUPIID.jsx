import React, { useEffect, useRef } from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setComponent, setIsBalanceModalOpen, setIsUPIModalOpen } from '../redux/slices/checkBalance';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc, updateDoc, doc, query, where, getDocs, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { ref, onValue, get, child } from "firebase/database";
import { setPaymentDetails } from '../redux/slices/detailSlice';



const EnterUPIID = ({ button1, button2, selectedBank, setEnteredUpiId }) => {

    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const ref4 = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const details = useSelector(state => state.paymentDetails.paymentDetails)
    const transactionURL = uuidv4()
    const user = useSelector(state => state.user.user)
    const transactionId = `${new Date().getTime()}${Math.floor(Math.random() * 10000000)}`




    function changeInput(e, nextRef, currentRef,) {
        if (currentRef.current.value === '') {
            currentRef.current.focus();
        }
        else {
            nextRef.current.focus()
        }
    }

    const backDecline = () => {

        const btn = document.getElementById('backBtn')
        if (btn.innerText === 'Back') {
            dispatch(setComponent('banks'))
        } else if (btn.innerText === 'Decline') {
            dispatch(setComponent('banks'))
            dispatch(setIsUPIModalOpen(false))
            dispatch(setIsBalanceModalOpen(false))
            navigate(-1)

        }
    }

    async function doTask(e) {

        const taskBtn = document.getElementById('taskBtn')

        if (ref1.current.value === '' || ref2.current.value === '' || ref3.current.value === '' || ref4.current.value === '') {
            toast.error('Please enter correct UPI ID')
        }
        else if (taskBtn.innerText === 'Send Money') {

            // get inputs as number
            const upiId = ref1.current.value + ref2.current.value + ref3.current.value + ref4.current.value


            if (parseInt(upiId) === details.selectedBank.upiPin) {

                dispatch(setComponent('loader'))

                // TODO: Do all the stuff after UPI Id is successful.
                // 1. Save transaction to database of reciever cum sender
                const userRef = doc(db, "users", user.id);
                const receiverRef = doc(db, "users", details.receiverId);
                const docSnap = await getDoc(userRef);
                const receiverDocSnap = await getDoc(receiverRef);


                try {
                    // user transaction updation
                    if (docSnap.exists()) {


                        // find the bank whose amount to be deducted
                        let bankArray = [...docSnap.data().banks]
                        bankArray.forEach(async (bank, index) => {
                            if (bank.bankAcNo === details.selectedBank.bankAcNo) {

                                // Check if the sufficient amount is there


                                if (bankArray[index].bankBalance >= details.amountToPay) {
                                    bankArray[index].bankBalance = bankArray[index].bankBalance - details.amountToPay

                                    await updateDoc(userRef, {
                                        transactions: [...docSnap.data().transactions,
                                        {
                                            details: details.forSender,
                                            status: 'success',
                                            date: new Date().toLocaleString(),
                                            transactionType: 'UPI',
                                            transactionURL: transactionURL,
                                            transactionId

                                        }
                                        ].sort(function (x, y) {
                                            return y.date - x.date;
                                        })
                                    })

                                    // update sender bank balance
                                    await updateDoc(userRef, {
                                        banks: bankArray
                                    })


                                    // receiver transaction updation
                                    if (receiverDocSnap.exists()) {
                                        await updateDoc(receiverRef, {
                                            transactions: [...receiverDocSnap.data().transactions,
                                            {
                                                details: details.forReceiver,
                                                status: 'success',
                                                date: new Date().toLocaleString(),
                                                transactionType: 'UPI',
                                                type: 'Sent To',
                                                transactionURL: transactionURL,
                                                transactionId
                                            }
                                            ].sort(function (x, y) {
                                                return y.date - x.date;
                                            })
                                        });

                                        // find the bank whose value is to be credit
                                        let bankArray = [...receiverDocSnap.data().banks]


                                        // find the bank with isPrimary key and change that bank's balance
                                        bankArray.forEach(async (bank, index) => {
                                            if (bank.isPrimary === true) {

                                                bankArray[index].bankBalance = bankArray[index].bankBalance + details.amountToPay
                                                // update receiver bank balance
                                                await updateDoc(receiverRef, {
                                                    banks: bankArray
                                                })
                                            }


                                        })

                                        dispatch(setIsUPIModalOpen(false))
                                        dispatch(setComponent('banks'))


                                        //  4. Navigation
                                        navigate(`/services/transaction/${transactionURL}`, { state: details })


                                        // 2. Acknowledge Transaction status
                                        toast.success(`Money sent successfully to ${details.receiverName} of Rs. ${details.amountToPay}`)

                                        dispatch(setPaymentDetails(null))

                                    } else {
                                        dispatch(setIsUPIModalOpen(false))
                                        dispatch(setComponent('banks'))
                                    }
                                }
                                else {
                                    navigate('/')
                                    dispatch(setComponent('failed'))
                                    toast.error('Insufficient balance ')
                                }

                            }
                        })

                    }

                } catch (error) {
                    console.log(error)
                }

            }






            else {
                toast.error('Please enter correct UPI ID')
            }
        }
        else {

            // for check balance facility
            dispatch(setComponent('loader'))
            const enteredUpiId = `${ref1.current.value}${ref2.current.value}${ref3.current.value}${ref4.current.value}`

            setEnteredUpiId(enteredUpiId)

        }

    }

    useEffect(() => {
        ref1.current.focus()
    }, [])

    return (
        <div>
            <p className='my-2 text-center'>Please enter UPI ID</p>
            <div className='flex items-center justify-center mt-3'>

                <input type="password" size='1' maxLength='1' className='border-4 text-center text-violet-700 text-xl rounded-lg p-1 m-2 border-violet-700 outline-none focus:border-violet-900 focus:text-violet-900 ease-in-out duration-300' ref={ref1}
                    onChange={(e) => { changeInput(e, ref2, ref1,) }} />



                <input type="password" size='1' maxLength='1' className='border-4 text-center text-violet-700 text-xl rounded-lg p-1 m-2 border-violet-700 outline-none focus:border-violet-900 focus:text-violet-900 ease-in-out duration-300' ref={ref2}
                    onChange={(e) => { changeInput(e, ref3, ref2,) }}
                    onKeyDown={(e) => {
                        if (e.key === 'Backspace') {
                            ref2.current.value = ''
                            ref1.current.focus()
                        }
                    }

                    }
                />

                <input type="password" size='1' maxLength='1' className='border-4 text-center text-violet-700 text-xl rounded-lg p-1 m-2 border-violet-700 outline-none focus:border-violet-900 focus:text-violet-900 ease-in-out duration-300' ref={ref3}
                    onChange={(e) => { changeInput(e, ref4, ref3, ref2) }}
                    onKeyDown={(e) => {
                        if (e.key === 'Backspace') {
                            ref3.current.value = '';
                            ref2.current.focus();
                        }
                    }}
                />


                <input type="password" size='1' maxLength='1' className='border-4 text-center text-violet-700 text-xl rounded-lg p-1 m-2 border-violet-700 outline-none focus:border-violet-900 focus:text-violet-900 ease-in-out duration-300' ref={ref4}
                    onKeyDown={(e) => {
                        if (e.key === 'Backspace') {
                            ref4.current.value = ''
                            ref3.current.focus()
                        }
                    }}
                />

            </div>
            <p className="text-sm text-center text-gray-400">Please do not share your UPI ID with anyone.</p>

            {/* UPI OF CORRESPONDING BANK */}
            {
                selectedBank && <div className='flex items-center justify-center gap-1 border-t border-b m-2 p-2'>
                    <img src={selectedBank.bankPhotoURL} alt={selectedBank.bankName} className='h-8' />
                    <p>{selectedBank.bankName}</p>
                </div>
            }
            {
                details && <div className='flex items-center justify-center gap-1 border-t border-b m-2 p-2'>
                    <img src={details.selectedBank.bankPhotoURL} alt={details.selectedBank.bankName} className='h-8' />
                    <p>{details.selectedBank.bankName}</p>
                </div>
            }

            <div className='flex items-center justify-center gap-3 mt-4 mb-4'>
                <button className="flex items-center border-2 rounded-xl p-2 border-red-500 text-red-500 hover:bg-red-50 font-bold" id='backBtn' onClick={() => backDecline()}><ArrowBackRoundedIcon />{button1}</button>

                <button className="flex items-center border-2 gap-1 rounded-xl p-2 border-violet-900 text-violet-900 hover:bg-violet-100 font-bold"
                    onClick={() => { doTask() }} id='taskBtn'>{button2}<ArrowForwardRoundedIcon /></button>
            </div>

        </div>
    )
}

export default EnterUPIID