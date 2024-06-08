import { CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setComponent } from '../redux/slices/checkBalance'

const Loader = ({ title, selectedBank, enteredUpiId, setIsAuth }) => {
    const dispatch = useDispatch()


    useEffect(() => {
        if (title === 'Fetching Balance') {

            if (parseInt(enteredUpiId) === selectedBank.upiPin) {
                console.log('Successfully matched')
                setTimeout(() => {
                    setIsAuth(true)
                    dispatch(setComponent('balance'))
                }, 2000)
            }
            else {
                console.log('Failed to match')
                setTimeout(() => {
                    setIsAuth(false)
                    dispatch(setComponent('balance'))
                }, 2000)
            }

        }
    })

    return (
        <div className="flex flex-col items-center justify-center my-8 gap-3">
            <CircularProgress sx={{ 'color': '#562f99' }} />
            <div className="text-center">
                <p className="text-xl text-violet-900">{title}</p>
                <p className="text-sm text-gray-500">Please do not refresh or close the browser.</p>
            </div>
        </div>
    )
}

export default Loader