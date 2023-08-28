import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

import axios from 'axios';
// project imports
import SubCard from 'ui-component/cards/SubCard';
// import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// ==============================|| PROFILE 1 - MY ACCOUNT ||============================== //

const MyAccount = () => {
    const [data, setData] = useState({
        nom: '',
        prenom: '',
        email: '',
        description: '',
        creation_date: '',
        profile_id: ''
    });
    const accessToken = localStorage.getItem('accessToken');
    React.useEffect(() => {
        // Fetch user data from the backend URL
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:5000/users/currentuser', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log('Fetched Data:', response.data); // Log the response data

                setData(response.data.user); // Assuming response.data is an array of user objects
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchData(); // Call the function to fetch data when the component mounts
    }, [accessToken]);
    // React.useEffect(() => {
    //     console.log(data);
    // });
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard title="Details ">
                    <form noValidate autoComplete="off">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <TextField id="outlined-basic5" fullWidth label="Nom" key={data?.nom} value={data?.nom} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField id="outlined-basic5" fullWidth label="Prenom" key={data?.prenom} value={data?.prenom} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField id="outlined-basic6" fullWidth label="Adresse Email " key={data?.email} value={data?.email} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-basic5"
                                    fullWidth
                                    label="Description"
                                    key={data?.description}
                                    value={data?.description}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField id="outlined-basic5" fullWidth label="Profile" key={data?.profile_id} value={data?.profile_id} />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-basic5"
                                    fullWidth
                                    label="Date création"
                                    key={data?.creation_date}
                                    value={data?.creation_date}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </SubCard>
            </Grid>
            <Grid item xs={12}></Grid>
        </Grid>
    );
};

export default MyAccount;
