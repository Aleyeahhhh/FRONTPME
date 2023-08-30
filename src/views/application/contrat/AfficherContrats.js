import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from 'contexts/GlobalContext';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
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
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';

const AfficherContrats = ({ contracts, page, rowsPerPage }) => {
    const { singlEntreprise } = useContext(GlobalContext);
    const [entre, setEntre] = useState();
    const theme = useTheme();
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const contractsToShow = contracts.slice(startIndex, endIndex);

    function TableCellContent({ id_client }) {
        const [entreprise, setEntreprise] = useState(null);
        useEffect(() => {
            axios
                .get('http://localhost:5000/client/get_entreprise_by_client_id/' + id_client)
                .then((res) => {
                    // console.log(res.data);
                    setEntreprise(res.data);
                })
                .catch((err) => {
                    console.log('error', err);
                });
        }, [id_client]);
        return (
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Avatar alt="Entreprise 1" src={entreprise?.entreprise_lien_logo} />
                </Grid>
                <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="subtitle1" component="div">
                        {entreprise?.entreprise_name}
                    </Typography>
                    <Typography align="left" variant="subtitle2" noWrap>
                        {entreprise?.entreprise_email}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
    const compareDates = (datetoCompare) => {
        const today = new Date();
        const targetDate = new Date(datetoCompare);
        return targetDate.getTime() > today.getTime();
    };

    // mods

    useEffect(() => {
        contractsToShow.forEach((row) => {
            axios
                .get('http://localhost:5000/client/get_entreprise_by_client_id/' + row.id_client)
                .then((res) => {
                    console.log(res.data);
                    setEntre(res.data);
                })
                .catch((err) => {
                    console.log('error', err);
                });
        });
    }, [contractsToShow.id_client]);

    useEffect(() => {
        console.log(contracts);
    }, []);

    useEffect(() => {
        console.log(singlEntreprise);
    }, [singlEntreprise]);
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ pl: 3 }}>Entreprise</TableCell>
                        <TableCell>Date de debut</TableCell>
                        <TableCell>Date de din</TableCell>
                        <TableCell>Condition financiéres</TableCell>
                        <TableCell>Prochaine action</TableCell>
                        <TableCell>Date prochaine action</TableCell>
                        <TableCell>Date rappele negociation</TableCell>
                        <TableCell align="center" sx={{ pr: 3 }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contractsToShow &&
                        contractsToShow.map((row, index) => {
                            // entre is enmty/undefined wel singlEntreprise tjini far8a 9a3da
                            if (entre?.entreprise_name !== singlEntreprise?.nom)
                                return (
                                    <TableRow hover key={index}>
                                        {compareDates(row?.date_fin) && (
                                            <>
                                                <TableCell>
                                                    <TableCellContent id_client={row.id_client} />
                                                </TableCell>
                                                <TableCell>{row.date_debut}</TableCell>
                                                <TableCell>{row.date_fin}</TableCell>
                                                <TableCell>{row.conditions_financieres}</TableCell>
                                                <TableCell>{row.prochaine_action}</TableCell>
                                                <TableCell>{row.date_prochaine_action}</TableCell>
                                                <TableCell>{row.date_rappel}</TableCell>
                                                <TableCell align="center" sx={{ pr: 3 }}>
                                                    <Stack direction="row" justifyContent="center" alignItems="center">
                                                        <Tooltip placement="top" title="Message">
                                                            <IconButton color="primary" aria-label="delete" size="large">
                                                                <ChatBubbleTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip placement="top" title="Block">
                                                            <IconButton
                                                                color="primary"
                                                                sx={{
                                                                    color: theme.palette.orange.dark,
                                                                    borderColor: theme.palette.orange.main,
                                                                    '&:hover ': { background: theme.palette.orange.light }
                                                                }}
                                                                size="large"
                                                            >
                                                                <BlockTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Stack>
                                                </TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default AfficherContrats;
