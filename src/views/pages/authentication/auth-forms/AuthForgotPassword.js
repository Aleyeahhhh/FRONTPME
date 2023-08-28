// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';

// ========================|| FIREBASE - FORGOT PASSWORD ||======================== //

const AuthForgotPassword = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const [isSuccess, setIsSuccess] = useState(false);

    const { resetPassword } = useAuth();

    return (
        <Formik
            initialValues={{
                email: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    await resetPassword(values.email);
                    if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);

                        // Send POST request to the backend API
                        if (isSuccess) {
                            try {
                                const response = await axios.post('http://127.0.0.1:5000/users/forgot_password', {
                                    email: values.email
                                });

                                if (response.ok) {
                                    // Handle success
                                    console.log('Password reset email sent successfully');
                                    console.log('response', response.data);
                                } else {
                                    // Handle error
                                    console.error('Failed');
                                    console.log('response', response.data.reset_token);
                                    localStorage.setItem('resetToken', response.data.reset_token);
                                }
                            } catch (error) {
                                console.error('Error sending request:', error);
                            }
                        }
                    }
                    // WARNING: do not set any formik state here as formik might be already destroyed here. You may get following error by doing so.
                    // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
                    // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
                    // github issue: https://github.com/formium/formik/issues/2430
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
                    <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-forgot">Adresse e-mail </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-forgot"
                            type="email"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Email Address / Username"
                            inputProps={{}}
                        />
                        {touched.email && errors.email && (
                            <FormHelperText error id="standard-weight-helper-text-email-forgot">
                                {errors.email}
                            </FormHelperText>
                        )}
                    </FormControl>

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
                                Envoyer
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default AuthForgotPassword;
