import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { Avatar, CardContent, CardActions, Divider, IconButton, Modal, Button, Grid, Stack, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import CloseIcon from '@mui/icons-material/Close';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MuiTooltip, { tooltipClasses } from '@mui/material/Tooltip';

import { useState } from 'react';
import ResetPassword from 'views/pages/authentication/authentication3/ResetPassword3';
// fel call t7ott <AjoutPaiment id_fac=index/>
const AjoutPaiment = (id_fac) => {
    const [open, setOpen] = useState(false);
    const [formdata, setFormdata] = useState({
        // initialise modal/form values
        id_facture: id_fac,
        montant: ''
    });
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handlePaimentAdd = (fieldName) => (event) => {
        // updating the data state
        setFormdata(() => ({
            ...formdata,
            [fieldName]: event.target.value
        }));
    };
    const handleSubmit = () => {
        axios
            .post('http://localhost:5000/paiement/create', formdata)
            .then((res) => {
                console.log(res.data);
                setOpen(false);
                setFormdata({
                    // reinitialise modal/form values
                    id_facture: id_fac,
                    montant: ''
                });
            })
            .catch((err) => {
                console.log('error', err);
            });
    };
    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <div>
                    <MainCard
                        sx={{
                            position: 'absolute',
                            width: { xs: 280, lg: 450 },
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                        title="Ajouter un nouveau Paiment"
                        content={false}
                        secondary={
                            <MuiTooltip title="close">
                                <IconButton onClick={handleClose} size="large">
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </MuiTooltip>
                        }
                    >
                        <CardContent>
                            <TextField
                                type="number"
                                value={formdata?.montant}
                                onChange={handlePaimentAdd('montant')}
                                fullWidth
                                label="montant"
                                placeholder="montant payer"
                                style={{ marginBottom: '1rem' }}
                            />
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <AnimateButton>
                                    <Button onClick={handleSubmit} variant="outlined">
                                        Ajouter Paiment
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </CardActions>
                    </MainCard>
                </div>
            </Modal>

            <MuiTooltip title="add paiment">
                <IconButton aria-label="add" size="large" onClick={handleOpen}>
                    <AddIcon />
                </IconButton>
            </MuiTooltip>
            {/* <MuiTooltip title="add paiment">
                <Fab color="primary" aria-label="add" onClick={handleOpen}>
                    <AddIcon />
                </Fab>
            </MuiTooltip> */}
        </Box>
    );
};
export default AjoutPaiment;
