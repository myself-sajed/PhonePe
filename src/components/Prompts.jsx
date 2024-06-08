import { Checkbox, FormControl, FormControlLabel, IconButton } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPrompt } from '../redux/slices/promptSlice'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';

const Prompts = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()



    return (
        <div className="bg-[#00004e6e] fixed top-0 bottom-0 z-10 right-0 left-0 flex justify-center items-center">
            <div className="bg-white rounded-xl p-3 w-[500px]">
                <div className='flex items-center justify-center gap-5 m-2'>
                    <div className='flex item-center justify-center gap-3'>
                        <AccountBalanceRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '35px' }} />
                        <p className='font-sans text-3xl text-violet-900'>Banking</p>
                    </div>
                    <IconButton
                        onClick={() => {
                            dispatch(setPrompt(false))
                            navigate('/')
                        }} >
                        <CloseRoundedIcon sx={{ 'color': '#562f99', 'fontSize': '20px' }} />
                    </IconButton>
                </div>
                <hr />
                <div className='flex items-center justify-center w-full'>
                    <FormControl>
                        <FormControlLabel
                            value="end"
                            control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
                            label="Mark it as Primary"
                            labelPlacement="end"
                        />
                    </FormControl>
                </div>
            </div>
        </div>
    )
}

export default Prompts