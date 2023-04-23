import React from 'react';
import "./Modal.css";
import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux'

const SuccessPopup = (props) => {
    return (
        <Dialog open={true} className="dialogWrapper">
            <DialogTitle>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1, width: "400px" }}>
                        <center><b>{"Successfully Done"}</b></center>
                    </Typography>

                </div>
            </DialogTitle>
            <DialogContent dividers>
                <center><Button variant="contained" onClick={props.handleClose} color="success" style={{ float: 'right', marginLeft: '10px' }}>OK</Button></center>
            </DialogContent>
            
        </Dialog>
    );
}

export default SuccessPopup;