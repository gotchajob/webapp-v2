import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogContentText, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';

export default function useSnackbarDialog() {
    const [open, setOpen] = useState<boolean>(false);

    const [content, setContent] = useState<string>('');

    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');

    const showSnackbarDialog = (message: string, severity: 'success' | 'error' | 'warning' | 'info' = 'info') => {
        setContent(message);
        setSeverity(severity);
        setOpen(true);
    };

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [open]);

    const SnackbarDialog = () => (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
                style: { borderRadius: 8, minWidth: 300 }
            }}
        >
            <IconButton
                size="small"
                onClick={() => setOpen(false)}
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 1,
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
            <DialogContent
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px 32px',
                    position: 'relative',
                }}
            >
                <Alert severity={severity} sx={{ flexGrow: 1, width: '100%', padding: '16px 24px' }}>
                    <Typography variant="body2" align="center">
                        {content}
                    </Typography>
                </Alert>
            </DialogContent>
        </Dialog>
    );

    return { showSnackbarDialog, SnackbarDialog };
};

