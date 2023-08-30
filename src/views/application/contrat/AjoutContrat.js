import React from 'react';
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
const AjoutContrat = () => {
    const [open, setOpen] = useState(false);
    const [formdata, setFormdata] = useState({
        // initialise modal/form values
        id_client: '',
        date_debut: '',
        date_fin: '',
        conditions_financieres: '',
        prochaine_action: '',
        date_prochaine_action: '',
        date_rappel: '',
        fichier_pdf: 'fichierpdf'
    });
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleContratAdd = (fieldName) => (event) => {
        // updating the data state
        setFormdata(() => ({
            ...formdata,
            [fieldName]: event.target.value
        }));
    };
    const handleSubmit = () => {
        axios
            .post('http://localhost:5000/contract/create', formdata)
            .then((res) => {
                console.log(res.data);
                setOpen(false);
                setFormdata({
                    // reinitialise modal/form values
                    id_client: '',
                    date_debut: '',
                    date_fin: '',
                    conditions_financieres: '',
                    prochaine_action: '',
                    date_prochaine_action: '',
                    date_rappel: '',
                    fichier_pdf: 'fichierpdf'
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
                        title="Ajouter un nouveau Contrat"
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
                                value={formdata?.id_client}
                                onChange={handleContratAdd('id_client')}
                                fullWidth
                                label="id_client"
                                placeholder="id_client"
                                style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                                value={formdata?.date_debut}
                                onChange={handleContratAdd('date_debut')}
                                fullWidth
                                label="date_debut"
                                placeholder="YYYY-MM-DD"
                                style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                                value={formdata?.date_fin}
                                onChange={handleContratAdd('date_fin')}
                                fullWidth
                                label="date_fin"
                                placeholder="YYYY-MM-DD"
                                style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                                value={formdata?.conditions_financieres}
                                onChange={handleContratAdd('conditions_financieres')}
                                fullWidth
                                label="conditions_financieres"
                                placeholder="condition_financiere"
                                style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                                value={formdata?.prochaine_action}
                                onChange={handleContratAdd('prochaine_action')}
                                fullWidth
                                label="prochaine_action"
                                placeholder="prochaine_action"
                                style={{ marginBottom: '1rem' }}
                            />

                            <TextField
                                label="date_prochaine_action"
                                value={formdata?.date_prochaine_action}
                                fullWidth
                                onChange={handleContratAdd('date_prochaine_action')}
                                placeholder="YYYY-MM-DD"
                                style={{ marginBottom: '1rem' }}
                            />

                            <TextField
                                label="date_rappel"
                                value={formdata?.date_rappel}
                                fullWidth
                                onChange={handleContratAdd('date_rappel')}
                                placeholder="YYYY-MM-DD"
                                style={{ marginBottom: '1rem' }}
                            />
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <AnimateButton>
                                    <Button onClick={handleSubmit} variant="outlined">
                                        Ajouter contrat
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </CardActions>
                    </MainCard>
                </div>
            </Modal>
            <MuiTooltip title="Ajouter Contrat">
                <Fab color="primary" aria-label="add" onClick={handleOpen}>
                    <AddIcon />
                </Fab>
            </MuiTooltip>
        </Box>
    );
};
export default AjoutContrat;
