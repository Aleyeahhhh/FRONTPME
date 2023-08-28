import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { MenuItem, Select } from '@mui/material';
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const JWTRegister = ({ ...others }) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [checked, setChecked] = React.useState(true);
    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState();
    const { register } = useAuth();

    const changePassword = (value) => {
        const temp = strengthIndicatorNumFunc(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };
    // register = () => {
    //     console.log('fsdfd');
    // };
    useEffect(() => {
        changePassword('123456');
    }, []);
    const profileOptions = [
        { value: 1, label: 'Adminstrateur' },
        { value: 2, label: 'Validateur' }
        // Add more profile options as needed
    ];
    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Inscription avec une adresse e-mail</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    nom: '',
                    prenom: '',
                    email: '',
                    description: '',
                    profile_id: 1,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    nom: Yup.string().required('Nom *'),
                    prenom: Yup.string().required('Prénom *'),
                    email: Yup.string().email('Doit être un e-mail valide').max(255).required('Email *'),
                    description: Yup.string().required('Description *')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        await register(values.nom, values.prenom, values.email, values.description, values.profile_id);
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);

                            // Send POST request to the backend API
                            if (isSuccess) {
                                try {
                                    const response = await axios.post('http://127.0.0.1:5000/users/register', {
                                        nom: values.nom,
                                        prenom: values.prenom,
                                        email: values.email,
                                        description: values.description,
                                        profile_id: values.profile_id
                                    });

                                    if (response.ok) {
                                        // Handle success
                                        console.log('User registered successfully');
                                    } else {
                                        // Handle error
                                        console.error('Failed to register user');
                                    }
                                } catch (error) {
                                    console.error('Error sending request:', error);
                                }
                            }
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Prénom"
                                    margin="normal"
                                    name="prenom"
                                    type="text"
                                    value={values.prenom}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nom"
                                    margin="normal"
                                    name="nom"
                                    type="text"
                                    value={values.nom}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                        </Grid>
                        {touched.nom && errors.nom && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                                {errors.nom}
                            </FormHelperText>
                        )}
                        {touched.prenom && errors.prenom && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                                {errors.prenom}
                            </FormHelperText>
                        )}
                        <FormControl fullWidth error={Boolean(touched.description && errors.description)}>
                            <InputLabel htmlFor="outlined-adornment-description">Description</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-description"
                                type="text"
                                value={values.description}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="description"
                                sx={{ ...theme.typography.customInput }}
                                label="Description"
                            ></OutlinedInput>
                        </FormControl>
                        {touched.description && errors.description && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                                {errors.description}
                            </FormHelperText>
                        )}
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Adresse e-mail </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address"
                                sx={{ ...theme.typography.customInput }}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{
                                                    backgroundColor: level?.white,
                                                    display: 'center'
                                                }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem"></Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        <FormControl fullWidth>
                            <InputLabel htmlFor="outlined-adornment-profile">Profile</InputLabel>
                            <Select
                                id="outlined-adornment-profile"
                                value={values.profile_id}
                                onChange={handleChange}
                                name="profile_id"
                                label="Profile"
                            >
                                {profileOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Accepter &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Termes et conditions.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => setIsSuccess(true)}
                                >
                                    Ajouter utilisateur
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default JWTRegister;
