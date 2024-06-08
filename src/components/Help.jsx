import * as React from 'react';
import Popover from '@mui/material/Popover';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { Tooltip } from '@mui/material';



export default function Help({ screen }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className='inline'>
            <Tooltip placement="top" title="Click to get help">
                <HelpOutlineRoundedIcon className='cursor-pointer' onClick={handleClick} aria-describedby={id} sx={{ fontSize: "20px", marginLeft: '5px' }} />
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div className='p-2'>
                    <p className='mb-2 text-muted'>Use following mock Phone Numbers & UPI IDs</p>
                    <div className='bg-gray-100 rounded p-2'>
                        <p className='font-semibold'>1. 7773936878 (Shaikh Sajed)</p>
                        <p>(i) IDBI UPI PIN: <b>6878</b></p>
                        <p>(ii) HDFC UPI PIN: <b>7773</b></p>
                    </div>
                    <div className='bg-gray-100 rounded p-2 mt-2'>
                        <p className='font-semibold'>2. 8007119278 (Sameer Pathan)</p>
                        <p>(i) HDFC UPI PIN: <b>8007</b></p>
                    </div>
                </div>
            </Popover>
        </div>
    );
}


