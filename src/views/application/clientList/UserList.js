import React,{useState,useEffect} from 'react';
import axios from 'axios';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    
   
    IconButton,
   
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    
} from '@mui/material';

// project imports
//import Avatar from 'ui-component/extended/Avatar';

//import { useDispatch, useSelector } from 'store';
//import { getUsersListStyle1 } from 'store/slices/user';

// assets
//import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';

//const avatarImage = require.context('assets/images/users', true);

// ==============================|| USER LIST 1 ||============================== //

const ClientsData = () => {
    const [data, setPeo] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        
            axios
                .get('http://localhost:5000/client/get_client')
                .then((res) => {
                    console.log("zzzzzzzzzz",res.data.clients.client);
                    setPeo(res.data.clients.client);
                })
                .catch((err) => {
                    console.log(err);
                });
      
    }, []);

    return (
        <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ pl: 3 }}>#</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>adresse</TableCell>
                    <TableCell>contact</TableCell>
                    <TableCell>#entreprise</TableCell>
                    <TableCell>frequence_relance</TableCell>
                    <TableCell>email_destinataire</TableCell>
                    <TableCell>email_copies</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="center" sx={{ pr: 3 }}>
                        Actions
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {data &&
                data?.map((row,index) => (
                    
                    <TableRow key={index} >
                        
                        
                        <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                        <TableCell>{/* ID */}</TableCell>
                            <TableCell>{row.nom}</TableCell>
                            <TableCell>{row.adresse}</TableCell>
                            <TableCell>{row.contact}</TableCell>
                            <TableCell>{row.id_Entreprise}</TableCell>
                            <TableCell>{row.frequence_relance}</TableCell>
                            <TableCell>{row.email_destinataire}</TableCell>
                            <TableCell>{row.email_copies}</TableCell>
                            <TableCell>{/* Date */}</TableCell>
                        <TableCell align="center" sx={{ pr: 3 }}>
                            {/* Bouton "Message" */}
                            <Tooltip placement="top" title="Message">
                                <IconButton color="primary" aria-label="message" size="large">
                                    <ChatBubbleTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                </IconButton>
                            </Tooltip>
                            {/* Bouton "Block" */}
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
                        </TableCell>
                    </TableRow>
                ))}
        </TableBody>
        </Table>
    </TableContainer>
    

    );
};

export default ClientsData;
