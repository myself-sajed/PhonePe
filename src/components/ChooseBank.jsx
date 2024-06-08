import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setComponent } from '../redux/slices/checkBalance'
import { toast } from 'react-hot-toast'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const ChooseBank = ({ setSelectBank }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    return (
        <div>
            <p className='my-2 text-center'>Choose an account to check balance</p>
            <div>


                {
                    user && user.data.banks.map((bank, index) => {
                        return (
                            <div key={index} className="flex items-center my-3 justify-around cursor-pointer bg-violet-100 duration-200 ease-in-out hover:bg-violet-200 rounded-lg p-2"
                                onClick={() => {
                                    dispatch(setComponent('upiid'))
                                    setSelectBank(bank)
                                }}>
                                <img src={user && bank.bankPhotoURL} alt="bank" className="h-12" />
                                <span className='text-lg' >{user && bank.bankName}</span>
                            </div>
                        )
                    })

                }

                <div className="flex items-center my-3 justify-center gap-2 cursor-pointer  duration-200 ease-in-out border-2 hover:bg-violet-50 border-dashed border-violet-100 hover:border-violet-200 rounded-lg p-3"
                    onClick={() => { toast.error('Sorry, this facility is currently unavailable.') }}>
                    <AddCircleOutlineRoundedIcon sx={{ 'fontSize': '25px' }} className='text-gray-500' />
                    <span className='text-xl text-gray-500'>Add a Bank Account</span>
                </div>
            </div>
        </div>
    )
}

export default ChooseBank