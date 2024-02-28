import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "@mui/material/Typography";

function CustomerDelete(deleteProps) {
    const [openDialog, setDialog] = useState(false);
    const handleOpenDialog = () => {
        setDialog(true);
    };
    const handleCloseDialog = () => {
        setDialog(false);
    };
    const deleteCustomer = (id) => {
        console.log(deleteProps);
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'delete'
        });
        deleteProps.stateRefresh();
    }
    return (
        <React.Fragment>
            <Button variant='contained' onClick={handleOpenDialog}>삭제</Button>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                PaperProps={
                    {
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            handleOpenDialog();
                            handleCloseDialog();
                        },
                    }
                }
            >
                <DialogTitle>
                    고객 정보 삭제
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 고객 정보가 삭제됩니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={(e) => { deleteCustomer(deleteProps.id) }}>삭제</Button>
                    <Button variant='contained' color='secondary' onClick={handleCloseDialog}>닫기</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );

}

export default CustomerDelete;