import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Notification({ noti, handleCloseNoti }) {
    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={noti.open}
                autoHideDuration={4000}
                onClose={handleCloseNoti}
            >
                <Alert onClose={handleCloseNoti} severity={noti.type} sx={{ width: '100%' }}>
                    {noti.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Notification
