import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { Avatar, CardContent, CardActions, Divider, IconButton, Modal, Button, Grid, Stack, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import CloseIcon from '@mui/icons-material/Close';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MuiTooltip, { tooltipClasses } from '@mui/material/Tooltip';

const AjouterEntreprise = () => {
    const [open, setOpen] = useState(false);
    const [formdata, setFormdata] = useState({
        // initialise modal/form values
        nom: '',
        adresse: '',
        description: '',
        email: '',
        tel: '',
        lien_logo: ''
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
            .post('http://localhost:5000/entreprise/create', formdata)
            .then((res) => {
                console.log(res.data);
                setOpen(false);
                setFormdata({
                    // reinitialise modal/form values
                    nom: '',
                    adresse: '',
                    description: '',
                    email: '',
                    tel: '',
                    lien_logo: ''
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
                        title="Ajouter un nouveau entreprise"
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
                                value={formdata?.nom}
                                onChange={handleContratAdd('nom')}
                                fullWidth
                                label="nom"
                                placeholder="Nom entreprise"
                                style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                                value={formdata?.adresse}
                                onChange={handleContratAdd('adresse')}
                                fullWidth
                                label="adresse"
                                placeholder="Adresse de l'entreprise"
                                style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                                value={formdata?.description}
                                onChange={handleContratAdd('description')}
                                fullWidth
                                label="description"
                                placeholder="Description de l'entreprise"
                                style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                                value={formdata?.email}
                                onChange={handleContratAdd('email')}
                                fullWidth
                                label="email"
                                placeholder="Adresse email"
                                style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                                value={formdata?.tel}
                                onChange={handleContratAdd('tel')}
                                fullWidth
                                label="tel"
                                placeholder="numéro telephone"
                                style={{ marginBottom: '1rem' }}
                            />

                            <TextField
                                label="lien_logo"
                                value={formdata?.lien_logo}
                                fullWidth
                                onChange={handleContratAdd('lien_logo')}
                                placeholder="lien du logo"
                                style={{ marginBottom: '1rem' }}
                            />
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <AnimateButton>
                                    <Button onClick={handleSubmit} variant="outlined">
                                        Ajouter Entreprise
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </CardActions>
                    </MainCard>
                </div>
            </Modal>
            <MuiTooltip title="Ajouter Contrat">
                <Fab color="primary" aria-label="add" onClick={handleOpen} style={{ position: 'fixed', bottom: '4vh', right: '2vw' }}>
                    <AddIcon />
                </Fab>
            </MuiTooltip>
        </Box>
    );
};
export default AjouterEntreprise;
