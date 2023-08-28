import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from 'contexts/GlobalContext';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';
import Avatar from 'ui-component/extended/Avatar';
const AfficherEntreprise = () => {
    const { userProfile } = useContext(GlobalContext);
    const theme = useTheme();
    // const startIndex = (page - 1) * rowsPerPage;
    // const endIndex = startIndex + rowsPerPage;
    // const contractsToShow = userProfile.slice(startIndex, endIndex);
    useEffect(() => {
        console.log('hhhheeeeee', userProfile);
    }, [userProfile]);
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ pl: 3 }}>Entreprise</TableCell>
                        <TableCell>Adresse entreprise</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Adresse email</TableCell>
                        <TableCell>Numero telephone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userProfile && userProfile.length > 0 ? (
                        userProfile.map((row, index) => (
                            <TableRow hover key={index}>
                                <>
                                    <TableCell>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Avatar alt="logo" src={row.lien_logo} />
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Typography align="left" variant="subtitle1" component="div">
                                                    {row.nom}
                                                </Typography>
                                                <Typography align="left" variant="subtitle2" noWrap>
                                                    {row.email}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>{row.adresse}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.tel}</TableCell>
                                </>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5}>No data available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default AfficherEntreprise;
