import React, { useState, useEffect } from 'react';
import axios from 'axios';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, InputAdornment, Menu, MenuItem, OutlinedInput, Pagination, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import { IconSearch } from '@tabler/icons';
import AfficherContrats from './AfficherContrats';
import AjoutContrat from './AjoutContrat';

const Contrat = () => {
    const theme = useTheme();
    const [data, setData] = useState([]);
    // const [anchorEl, setAnchorEl] = useState(null);
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    useEffect(() => {
        axios
            .get('http://localhost:5000/contract/get_contract')
            .then((res) => {
                console.log(res.data.contracts);
                setData(res.data.contracts);
            })
            .catch((err) => {
                console.log('err', err);
            });
    }, []);
    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">Contrats en Cours</Typography>
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
            <AfficherContrats contracts={data} page={page} rowsPerPage={rowsPerPage} />
            <Grid item xs={12} sx={{ p: 3 }}>
                <Grid container justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Pagination
                            count={Math.ceil(data.length / rowsPerPage)}
                            color="primary"
                            page={page}
                            onChange={(value) => setPage(value)}
                        />
                    </Grid>
                    <Grid item>
                        <AjoutContrat />
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Contrat;
