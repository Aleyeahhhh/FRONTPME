import React, { useState } from 'react';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import CloseIcon from '@mui/icons-material/Close';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MuiTooltip from '@mui/material/Tooltip';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// import UserEdit from './UserEdit';
// material-ui
import { MenuItem, Select } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import { useTheme } from '@mui/material/styles';
import {
    Divider,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    Stack,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    Modal,
    Button,
    TextField
} from '@mui/material';

// project imports
// import Avatar from 'ui-component/extended/Avatar';

import { useDispatch } from 'store';
import { getUsersListStyle1 } from 'store/slices/user';

// assets
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
// import Draggable from 'react-draggable';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
// import UserEdit from './UserEdit';

// const avatarImage = require.context('assets/images/users', true);

// ==============================|| USER LIST 1 ||============================== //

// function PaperComponent(props) {
//     return (
//         <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
//             <Paper {...props} />
//         </Draggable>
//     );
// }

const UserList = () => {
    const [UserSelected, setUserSelected] = useState();
    // const [selectEntreprise, setSelectEntreprise] = React.useState([]);

    // mods
    const [data, setData] = React.useState([]);
    const [dataEntreprise, setdataEntreprise] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openn, setOpenn] = React.useState(false);
    const [selectedUserData, setSelectedUserData] = useState(null);
    // const [selectedValues, setSelectedValues] = useState([]);

    // const [checked, setChecked] = React.useState(true);

    const [formdata, setFormdata] = useState({
        // initialise modal/form values
        nom: '',
        prenom: '',
        email: '',
        description: '',
        profile_id: ''
    });
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseentr = () => {
        setOpenn(false);
    };
    // const handleOpen = () => {
    //     setOpen(true);
    // };

    const handleUserEdit = (fieldName) => (event) => {
        // updating the data state
        setFormdata(() => ({
            ...formdata,
            [fieldName]: event.target.value
        }));
    };
    const handleSubmit = (id_user) => {
        axios
            .put(`http://127.0.0.1:5000/users/update/${id_user}`, formdata)
            .then((res) => {
                console.log(res.data);
                setOpen(false);
                setFormdata({
                    // reinitialise modal/form values
                    nom: '',
                    prenom: '',
                    email: '',
                    description: '',
                    profile_id: ''
                });
                setData((prevData) => {
                    const updatedData = prevData.map((user) => (user.id_user === id_user ? { ...user, ...formdata } : user));
                    return updatedData;
                });
            })
            .catch((err) => {
                console.log('error', err);
            });
    };
    const profileOptions = [
        { value: 1, label: 'Adminstrateur' },
        { value: 2, label: 'Validateur' }
        // Add more profile options as needed
    ];
    const handleEditClick = (userData) => {
        setSelectedUserData(userData); // Set the clicked user's data
        setFormdata({
            nom: userData.nom || '',
            prenom: userData.prenom || '',
            email: userData.email || '',
            description: userData.description || '',
            profile_id: userData.profile_id || ''
        });
        setOpen(true); // Open the modal
    };
    const handleClickOpenDetails = (user) => {
        setOpenn(true);
        setUserSelected(user);
    };
    //
    // end mods
    const theme = useTheme();
    const dispatch = useDispatch();
    const profileMap = {
        1: 'Adminstrateur',
        2: 'Validateur'
    };

    const accessToken = localStorage.getItem('accessToken');

    React.useEffect(() => {
        // Fetch user data from the backend URL
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:5000/users/getusers');
                console.log('Fetched Data:', response.data); // Log the response data

                if (Array.isArray(response.data.users)) {
                    setData(response.data.users); // Assuming response.data is an array of user objects
                } else {
                    console.error('Response data is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        async function fetchDataEntreprise() {
            console.log('1');
            try {
                const response = await axios.get('http://127.0.0.1:5000/entreprise/get_entreprise', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log('Fetched Data:', response.data); // Log the response data

                if (Array.isArray(response.data.entreprises)) {
                    setdataEntreprise(response.data.entreprises); // Assuming response.data is an array of user objects
                } else {
                    console.error('Response data is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchData(); // Call the function to fetch data when the component mounts
        fetchDataEntreprise();
    }, [accessToken]);

    console.log('setdataEntreprise', dataEntreprise);

    React.useEffect(() => {
        dispatch(getUsersListStyle1());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleDelete = (id_user) => {
        axios
            .delete(`http://127.0.0.1:5000/users/delete/${id_user}`)
            .then((res) => {
                console.log('user supprimé avec succès.', res.data);
                setData((prevData) => prevData.filter((user) => user.id_user !== id_user));
            })
            .catch((err) => {
                console.error('Erreur lors de la suppression  :', err);
            });
    };

    const handleChangeCheckbox = (e, user) => {
        const { value } = e.target;
        console.log('checking the value', value, user);

        // if (checked) {
        //     setSelectedValues((prevValues) => [...prevValues, value]);
        // } else {
        //     setSelectedValues((prevValues) => prevValues.filter((val) => val !== value));
        // }

        // const selectedEnterprisesArray = selectedValues.map(Number);

        const requestData = {
            id_user: user,
            enterprises: [value]
        };
        console.log('requesting data', requestData);
        axios
            .post('http://127.0.0.1:5000/users/assign_user_to_enterprises', requestData)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log('error', err);
            });
    };
    return (
        <TableContainer>
            {/* mods */}
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
                        title="Editer utilisateur"
                        content={false}
                        secondary={
                            <MuiTooltip title="close">
                                <IconButton onClick={handleClose} size="large">
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </MuiTooltip>
                        }
                    >
                        <CardContent>
                            <TextField
                                value={formdata.nom}
                                onChange={handleUserEdit('nom')}
                                fullWidth
                                label="Nom"
                                placeholder="Nom"
                                style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                                value={formdata.prenom}
                                onChange={handleUserEdit('prenom')}
                                fullWidth
                                label="Prénom"
                                placeholder="Prénom"
                                style={{ marginBottom: '1rem' }}
                            />
                            <TextField
                                value={formdata.email}
                                onChange={handleUserEdit('email')}
                                fullWidth
                                label="Adresse E-mail"
                                placeholder="Adresse E-mail"
                                style={{ marginBottom: '1rem' }}
                            />
                            <Select
                                value={formdata.profile_id}
                                onChange={handleUserEdit('profile_id')}
                                fullWidth
                                label="Profile"
                                style={{ marginBottom: '1rem' }}
                            >
                                {profileOptions.map((profile, index) => (
                                    <MenuItem key={index} value={profile.value}>
                                        {profile.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            <TextField
                                value={formdata.description}
                                onChange={handleUserEdit('description')}
                                fullWidth
                                label="Description"
                                placeholder="Description"
                                style={{ marginBottom: '1rem' }}
                            />
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <AnimateButton>
                                    <Button onClick={() => handleSubmit(selectedUserData.id_user)} variant="outlined">
                                        modifier utilisateur
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </CardActions>
                    </MainCard>
                </div>
            </Modal>
            {/* end mods */}
            <Modal open={openn} onClose={handleCloseentr} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <div>
                    <MainCard
                        sx={{
                            position: 'absolute',
                            width: { xs: 280, lg: 450 },
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                        title="Affectation"
                        content={false}
                        secondary={
                            <MuiTooltip title="close">
                                <IconButton onClick={handleCloseentr} size="large">
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </MuiTooltip>
                        }
                    >
                        <Divider />
                        <Grid item xs={12} md={4}>
                            <SubCard title="Liste des entreprises">
                                <Grid container spacing={2}>
                                    {dataEntreprise.map((dataEntr) => {
                                        return (
                                            <Grid item key={dataEntr?.id_Entreprise}>
                                                <p>{dataEntr?.nom}</p>
                                                <Checkbox
                                                    onChange={(e) => handleChangeCheckbox(e, UserSelected)}
                                                    value={dataEntr?.id_Entreprise}
                                                    // checked={selectedEnterprises[UserSelected]?.includes(dataEntr?.id_Entreprise)}
                                                    color="primary"
                                                    sx={{
                                                        color: theme.palette.success.main,
                                                        '&.Mui-checked': { color: theme.palette.success.main }
                                                    }}
                                                />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </SubCard>
                        </Grid>
                    </MainCard>
                </div>
            </Modal>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ pl: 3 }}>#</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Prénom</TableCell>
                        <TableCell>Adresse E-mail</TableCell>
                        <TableCell>Profile</TableCell>
                        <TableCell align="center" sx={{ pr: 3 }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.map((row, index) => (
                            <TableRow hover key={index}>
                                <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                                <TableCell>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs zeroMinWidth>
                                            <Typography align="left" variant="subtitle1" component="div">
                                                {row?.nom}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell>{row?.prenom}</TableCell>
                                <TableCell>{row?.email}</TableCell>
                                <TableCell>
                                    <span
                                        className={`badge ${
                                            row.profile_id === 1 ? 'bg-info text-dark' : row.profile_id === 2 ? 'bg-warning text-dark' : ''
                                        } text-dark`}
                                    >
                                        {' '}
                                        {profileMap[row?.profile_id]}
                                    </span>
                                </TableCell>
                                <TableCell align="center" sx={{ pr: 3 }}>
                                    <Stack direction="row" justifyContent="center" alignItems="center">
                                        <Tooltip placement="top" title="Details" key={row.id_user}>
                                            <IconButton
                                                color="primary"
                                                aria-label="details"
                                                size="large"
                                                onClick={() => handleClickOpenDetails(row.id_user)}
                                            >
                                                <ChatBubbleTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip placement="top" title="Supprimer">
                                            <IconButton
                                                onClick={() => handleDelete(row.id_user)}
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
                                        <Tooltip placement="top" title="Modifier" key={row.id_user}>
                                            <IconButton
                                                color="secondary"
                                                size="large"
                                                aria-label="edit"
                                                onClick={() => handleEditClick(row)}
                                            >
                                                <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserList;
