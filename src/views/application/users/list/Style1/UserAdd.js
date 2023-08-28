import React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { CardContent, CardActions, Divider, IconButton, Modal, Button, Grid, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import CloseIcon from '@mui/icons-material/Close';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MuiTooltip from '@mui/material/Tooltip';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
const UserAdd = () => {
    const [open, setOpen] = useState(false);
    const [formdata, setFormdata] = useState({
        // initialise modal/form values
        nom: '',
        prenom: '',
        email: '',
        description: '',
        profile_id: ''
    });
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleUserAdd = (fieldName) => (event) => {
        // updating the data state
        setFormdata(() => ({
            ...formdata,
            [fieldName]: event.target.value
        }));
    };
    const handleSubmit = () => {
        axios
            .post('http://127.0.0.1:5000/users/register', formdata)
            .then((res) => {
                console.log(res.data);
                setOpen(false);
                setFormdata({
                    // reinitialise modal/form values
                    nom: '',
                    prenom: '',
                    email: '',
                    description: '',
                    profile_id: ''
                });
            })
            .catch((err) => {
                console.log('error', err);
            });
    };
    const profileOptions = [
        { value: 1, label: 'Adminstrateur' },
        { value: 2, label: 'Validateur' }
        // Add more profile options as needed
    ];

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
                        title="Ajouter un nouveau utilisateur"
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
                                onChange={handleUserAdd('nom')}
                                fullWidth
                                label="Nom"
                                placeholder="Nom"
                                style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                                value={formdata?.prenom}
                                onChange={handleUserAdd('prenom')}
                                fullWidth
                                label="Prénom"
                                placeholder="Prénom"
                                style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                                value={formdata?.email}
                                onChange={handleUserAdd('email')}
                                fullWidth
                                label="Adresse E-mail"
                                placeholder="Adresse E-mail"
                                style={{ marginBottom: '1rem' }}
                            />
                            <Select
                                value={formdata?.profile_id}
                                onChange={handleUserAdd('profile_id')}
                                fullWidth
                                label="Profile"
                                style={{ marginBottom: '1rem' }}
                            >
                                {profileOptions.map((profile) => (
                                    <MenuItem key={profile.value} value={profile.value}>
                                        {profile.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            <TextField
                                value={formdata?.description}
                                onChange={handleUserAdd('description')}
                                fullWidth
                                label="Description"
                                placeholder="Description"
                                style={{ marginBottom: '1rem' }}
                            />
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <AnimateButton>
                                    <Button onClick={handleSubmit} variant="outlined">
                                        Ajouter utilisateur
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </CardActions>
                    </MainCard>
                </div>
            </Modal>
            <MuiTooltip title="Ajouter Contrat" placement="right">
                <Fab color="primary" aria-label="add" onClick={handleOpen}>
                    <AddIcon />
                </Fab>
            </MuiTooltip>
        </Box>
    );
};
export default UserAdd;
