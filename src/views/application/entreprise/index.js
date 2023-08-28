import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, InputAdornment, Menu, MenuItem, OutlinedInput, Pagination, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import GlobalContext from 'contexts/GlobalContext';

// assets
import { IconSearch } from '@tabler/icons';
import AfficherEntreprise from './AfficherEntreprise';
import AjouterEntreprise from './AjouterEntreprise';
// ==============================|| USER LIST STYLE 1 ||============================== //

const Entreprise = () => {
    const { userProfile } = useContext(GlobalContext);

    // const theme = useTheme();
    // const [anchorEl, setAnchorEl] = useState(null);
    // const [page, setPage] = useState(1);
    // const rowsPerPage = 10;
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:5000/entreprise/get_entreprise')
    //         .then((res) => {
    //             console.log(res.data.entreprises);
    //             setData(res.data.entreprises);
    //         })
    //         .catch((err) => {
    //             console.log('err', err);
    //         });
    // }, []);
    // useEffect(() => {
    //     console.log('aaaaaaaaaaaaaaaaaaaaaaaaa', data);
    // }, [data]);
    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">Entreprises crée</Typography>
                    </Grid>
                    <Grid item>
                        <OutlinedInput
                            id="input-search-list-style1"
                            placeholder="Search"
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="16px" />
                                </InputAdornment>
                            }
                            size="small"
                        />
                    </Grid>
                </Grid>
            }
            content={false}
        >
            {/*  entreprises={data} page={page} rowsPerPage={rowsPerPage}  */}
            <AfficherEntreprise />
            <Grid item xs={12} sx={{ p: 3 }}>
                <Grid container justifyContent="space-between" spacing={gridSpacing}>
                    {/* <Grid item>
                        <Pagination
                            count={Math.ceil(data.length / rowsPerPage)}
                            color="primary"
                            page={page}
                            onChange={(event, value) => setPage(value)}
                        />
                    </Grid> */}
                    <Grid item>
                        <AjouterEntreprise />
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Entreprise;
