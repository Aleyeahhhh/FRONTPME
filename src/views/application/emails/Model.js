import React, { useState, useEffect } from 'react';
import axios from 'axios';
// material-ui
import { Button, Typography, Grid, Modal, TextField, IconButton, CardContent, Divider, CardActions } from '@mui/material';

// project imports
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MainCard from 'ui-component/cards/MainCard';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import { TextareaAutosize } from '@mui/base';
import { styled } from '@mui/system';

const Model = () => {
    const [modelle, setModelle] = useState();
    const [open, setOpen] = useState(false);

    const geturl = 'http://localhost:5000/Email/';
    const posturl = 'http://localhost:5000/Email/create';

    React.useEffect(() => {
        console.log(open);
    }, [open]);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = () => {
        axios
            .get(geturl)
            .then((res) => {
                console.log(res.data);
                setModelle(res.data);
            })
            .catch((err) => {
                console.log('error', err);
            });
    };
    // use effect waliha fonction tetaamelelha call once the page loads w naamlelha call wa9teli el save edits button clicked
    const handleSaveEdit = () => {
        axios
            .post(posturl)
            .then((res) => {
                console.log(res.data);
                setModelle(res.data);
                setOpen(false);
                useEffect(() => {
                    handleEdit();
                }, []);
            })
            .catch((err) => {
                console.log('error', err);
            });
    };

    // ignore the following ..styling textarea

    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75'
    };

    const grey = {
        50: '#f6f8fa',
        100: '#eaeef2',
        200: '#d0d7de',
        300: '#afb8c1',
        400: '#8c959f',
        500: '#6e7781',
        600: '#57606a',
        700: '#424a53',
        800: '#32383f',
        900: '#24292f'
    };
    const StyledTextarea = styled(TextareaAutosize)(
        ({ theme }) => `
        width: 320px;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px 12px 0 12px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
   
        &:hover {
          border-color: ${blue[400]};
        }
      
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
        }
      
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `
    );
    return (
        <MainCard title="Email de rappele Facture">
            <Modal
                disableScrollLock
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    <MainCard
                        sx={{
                            position: 'absolute',
                            width: { xs: 280, lg: '40vw' },
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                        title="Modifier les details de cette email"
                        content={false}
                        secondary={
                            <IconButton onClick={handleClose} size="large">
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                    >
                        <CardContent>
                            <StyledTextarea
                                // value={entreprise?.nom}
                                // onChange={handleEntrepriseChange('nom')}
                                maxRows={25}
                                minRows={25}
                                aria-label="Email context"
                                placeholder="Entree votre nouveau model de mail"
                                style={{ marginBottom: '1rem', width: '100%' }}
                            />
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <AnimateButton>
                                    <Button onClick={handleSaveEdit} variant="outlined">
                                        Save Changes
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </CardActions>
                    </MainCard>
                </div>
            </Modal>
            <Grid item xs={12} md={9} lg={7}>
                <Typography>{modelle}</Typography>
            </Grid>
            <CardActions>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Fab color="primary" aria-label="add" onClick={handleOpen}>
                        <ModeEditTwoToneIcon />
                    </Fab>
                </Grid>
            </CardActions>
        </MainCard>
    );
};

export default Model;
