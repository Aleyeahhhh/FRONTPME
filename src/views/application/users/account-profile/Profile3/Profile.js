// project imports
import MainCard from 'ui-component/cards/MainCard';
import React, { useContext } from 'react';

// assets
import CloseIcon from '@mui/icons-material/Close';
// material-ui
import { Avatar, CardContent, CardActions, Divider, IconButton, Modal, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
// import useAuth from 'hooks/useAuth';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import axios from 'axios';
// assets
import Avatar1 from 'assets/images/users/avatar-1.png';
import { useParams } from 'react-router-dom';
import { set } from 'lodash';
import GlobalContext from 'contexts/GlobalContext';

// ==============================|| PROFILE 3 - PROFILE ||============================== //

const Profile = () => {
    const { selectedEnterprise, setSelectedEnterprise, userProfile, singlEntreprise, setSinglEntreprise } = useContext(GlobalContext);
    // const { index } = useParams();

    const [open, setOpen] = useState(false);
    const [avataropen, setAvataropen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [entreprise, setEntreprise] = useState({
        nom: '',
        adresse: '',
        description: '',
        email: '',
        tel: '',
        lien_logo: ''
    });
    const [modifyentreprise, setModifyentreprise] = useState({
        nom: '',
        adresse: '',
        description: '',
        email: '',
        tel: '',
        lien_logo: ''
    });
    useEffect(() => {
        console.log(avataropen);
    }, [avataropen]);
    const handleOn = () => {
        setAvataropen(true);
    };
    const handleOff = () => {
        setAvataropen(false);
    };

    React.useEffect(() => {
        console.log(open);
    }, [open]);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        console.log(singlEntreprise);
    }, [singlEntreprise]);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };
    // changes

    const handleSave = () => {
        axios
            .put('http://localhost:5000/entreprise/update/' + selectedEnterprise, modifyentreprise)
            .then((res) => {
                console.log(res.data);
                setIsEditing(false);
                setAvataropen(false);
            })
            .catch((err) => {
                console.log('Error', err);
            });
    };
    //                     the default value of the text fields once the page loads METHOD1

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:5000/entreprise/get_entreprise')
    //         .then((res) => {
    //             console.log(res.data.entreprises);
    //             setSinglEntreprise(res.data.entreprises[selectedEnterprise]);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [selectedEnterprise]);

    //                     the default value of the text fields once the page loads METHOD2

    // useEffect(() => {
    //     setSinglEntreprise(userProfile[selectedEnterprise]);
    // }, [selectedEnterprise]);

    const handleEntrepriseModify = (fieldName) => (event) => {
        // updating the data state
        setModifyentreprise(() => ({
            ...modifyentreprise,
            [fieldName]: event.target.value
        }));
    };

    const handleEntrepriseChange = (fieldName) => (event) => {
        // updating the data state
        setEntreprise(() => ({
            ...entreprise,
            [fieldName]: event.target.value
        }));
    };
    const handleEntrepriseAdd = () => {
        axios
            .post('http://localhost:5000/entreprise/create', entreprise)
            .then((response) => {
                console.log('Response:', response.data);
                setOpen(false);
                setEntreprise({
                    nom: '',
                    adresse: '',
                    description: '',
                    email: '',
                    tel: '',
                    lien_logo: ''
                });
            })
            .catch((err) => {
                console.log('error has occured', err);
            });
    };
    // deleting entreprise
    const handleDelete = () => {
        axios
            .delete('http://localhost:5000/entreprise/delete/' + selectedEnterprise)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log('error', err);
            });
    };

    return (
        <Grid container spacing={gridSpacing}>
            {open ? (
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
                                <IconButton onClick={handleClose} size="large">
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            }
                        >
                            <CardContent>
                                <TextField
                                    value={entreprise?.nom}
                                    onChange={handleEntrepriseChange('nom')}
                                    fullWidth
                                    label="nom"
                                    placeholder="Nom de l'entreprise"
                                    style={{ marginBottom: '1rem' }}
                                />
                                <TextField
                                    value={entreprise?.adresse}
                                    onChange={handleEntrepriseChange('adresse')}
                                    fullWidth
                                    label="adresse"
                                    placeholder="Adresse de l'entreprise"
                                    style={{ marginBottom: '1rem' }}
                                />
                                <TextField
                                    value={entreprise?.description}
                                    onChange={handleEntrepriseChange('description')}
                                    fullWidth
                                    label="description"
                                    placeholder="Description de l'entreprise"
                                    style={{ marginBottom: '1rem' }}
                                />
                                <TextField
                                    value={entreprise?.email}
                                    onChange={handleEntrepriseChange('email')}
                                    fullWidth
                                    label="email"
                                    placeholder="example@email.com"
                                    style={{ marginBottom: '1rem' }}
                                />
                                <TextField
                                    value={entreprise?.tel}
                                    onChange={handleEntrepriseChange('tel')}
                                    fullWidth
                                    label="tel"
                                    placeholder="Telephone de l'entreprise"
                                    style={{ marginBottom: '1rem' }}
                                />

                                <TextField
                                    onChange={handleEntrepriseChange('lien_logo')}
                                    fullWidth
                                    label="lien_logo"
                                    placeholder="logo_URL de l'entreprise"
                                    style={{ marginBottom: '1rem' }}
                                />
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <AnimateButton>
                                        <Button onClick={handleEntrepriseAdd} variant="outlined">
                                            Ajouter entreprise
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </CardActions>
                        </MainCard>
                    </div>
                </Modal>
            ) : (
                avataropen && (
                    <Modal
                        open={avataropen}
                        onClose={handleOff}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <MainCard
                            sx={{
                                position: 'absolute',
                                width: { xs: 280, lg: 450 },
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                            title="Mettre a jour le logo de cet entreprise"
                            content={false}
                            secondary={
                                <IconButton onClick={handleOff} size="large">
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            }
                        >
                            <CardContent>
                                <Grid item md={12}>
                                    {singlEntreprise && (
                                        <TextField
                                            onChange={handleEntrepriseModify('lien_logo')}
                                            style={{ width: '100%' }}
                                            id="outlined-basic8"
                                            fullWidth
                                            label="lien_logo"
                                            defaultValue={singlEntreprise?.lien_logo}
                                        />
                                    )}
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <AnimateButton>
                                        <Button onClick={handleSave} variant="outlined">
                                            Enregistrer logo
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </CardActions>
                        </MainCard>
                    </Modal>
                )
            )}
            <Grid item sm={6} md={4}>
                <SubCard title="Profile Picture" contentSX={{ textAlign: 'center' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Avatar alt="User 1" src={Avatar1} sx={{ width: 100, height: 100, margin: '0 auto' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" align="center">
                                Télécharger/Changer Le Logo De L'entreprise
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <AnimateButton>
                                <Button variant="contained" size="small" onClick={handleOn}>
                                    Update Logo
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </SubCard>
                {/* adding some spacing here */}
                <div style={{ height: '2.8vh' }}></div>
                {/*  -  */}
                <SubCard>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'top'
                        }}
                    >
                        <AnimateButton>
                            <Button style={{ marginTop: '5px' }} variant="contained" onClick={handleOpen}>
                                Ajouter un nouveau entreprise
                            </Button>
                        </AnimateButton>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'end'
                        }}
                    >
                        <AnimateButton>
                            <Button style={{ marginTop: '10px' }} variant="contained" onClick={handleDelete}>
                                supprimer cet entreprise
                            </Button>
                        </AnimateButton>
                    </div>
                </SubCard>
            </Grid>
            <Grid item sm={6} md={8}>
                <SubCard title="Modifier Les Détails De l'entreprise">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            {singlEntreprise && (
                                <TextField
                                    key={selectedEnterprise}
                                    onChange={handleEntrepriseModify('nom')}
                                    disabled={!isEditing}
                                    id="outlined-basic1"
                                    fullWidth
                                    label="nom"
                                    defaultValue={singlEntreprise?.nom}
                                />
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                key={selectedEnterprise}
                                onChange={handleEntrepriseModify('email')}
                                disabled={!isEditing}
                                id="outlined-basic6"
                                fullWidth
                                label="email"
                                defaultValue={singlEntreprise?.email}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            {singlEntreprise && (
                                <TextField
                                    key={selectedEnterprise}
                                    onChange={handleEntrepriseModify('description')}
                                    disabled={!isEditing}
                                    id="outlined-basic4"
                                    fullWidth
                                    label="description"
                                    defaultValue={singlEntreprise?.description}
                                />
                            )}
                        </Grid>
                        <Grid item md={6} xs={12}>
                            {singlEntreprise && (
                                <TextField
                                    key={selectedEnterprise}
                                    onChange={handleEntrepriseModify('adresse')}
                                    disabled={!isEditing}
                                    id="outlined-basic5"
                                    fullWidth
                                    label="adresse"
                                    defaultValue={singlEntreprise?.adresse}
                                />
                            )}
                        </Grid>
                        <Grid item md={6} xs={12}>
                            {singlEntreprise && (
                                <TextField
                                    key={selectedEnterprise}
                                    onChange={handleEntrepriseModify('tel')}
                                    disabled={!isEditing}
                                    id="outlined-basic7"
                                    fullWidth
                                    label="tel"
                                    // defaultValue="4578-420-410 "
                                    defaultValue={singlEntreprise?.tel}
                                />
                            )}
                        </Grid>
                        <Grid item md={6} xs={12}>
                            {singlEntreprise && (
                                <TextField
                                    key={selectedEnterprise}
                                    onChange={handleEntrepriseModify('creation_date')}
                                    disabled={true}
                                    id="outlined-basic8"
                                    fullWidth
                                    label="creation_date"
                                    defaultValue={singlEntreprise?.creation_date}
                                />
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row">
                                <AnimateButton>
                                    <Button variant="contained" onClick={toggleEdit}>
                                        Change Details
                                    </Button>
                                </AnimateButton>
                                <div style={{ marginRight: '34vw' }}></div>
                                <AnimateButton>
                                    <Button disabled={!isEditing} variant="contained" onClick={handleSave}>
                                        Save Changes
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default Profile;
