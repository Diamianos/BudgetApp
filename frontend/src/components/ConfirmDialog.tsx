import React from 'react'
import { Button } from '@mui/material';
import {Dialog} from '@mui/material';
import {DialogActions} from '@mui/material';
import {DialogContent} from '@mui/material';
import {DialogTitle} from '@mui/material';
import { Folder } from '../folders/Folder';

interface ConfirmDialogProps{
    folder: Folder
    title: string,
    children: string;
    open: boolean;
    setOpen: (setOpen: boolean) => void;
    onConfirm: (folder:Folder) => void;
}

function ConfirmDialog(props: ConfirmDialogProps) {
    const { folder, title, children, open, setOpen, onConfirm } = props;
    return (
        <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="confirm-dialog">
            <DialogTitle id="confirm-dialog">{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpen(false);
                        onConfirm(folder);
                    }}
                    color="error"
                    >Yes
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setOpen(false)}
                    color="primary"
                    >No
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog