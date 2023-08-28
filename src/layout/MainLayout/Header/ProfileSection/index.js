import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SimpleModal from 'views/forms/plugins/Modal/SimpleModal';
import FriendsCard from 'ui-component/cards/FriendsCard';

// material-ui
import GlobalContext from 'contexts/GlobalContext';
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    CardContent,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    Typography
} from '@mui/material';

// third-party
import { FormattedMessage } from 'react-intl';
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import SubCard from 'ui-component/cards/SubCard';

import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import useAuth from 'hooks/useAuth';
import User1 from 'assets/images/users/user-round.svg';

// assets
import { IconLogout, IconSettings, IconUser } from '@tabler/icons';
import useConfig from 'hooks/useConfig';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const { selectedEnterprise, setSelectedEnterprise, userProfile, setUserProfile, setSinglEntreprise } = useContext(GlobalContext);
    const theme = useTheme();
    const { borderRadius } = useConfig();
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);

    const anchorRef = useRef(null);
    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        } else {
            <SimpleModal />;
        }
        // else show Modal for input add entreprise
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/entreprise/get_entreprise')
            .then((res) => {
                console.log('user profile', res.data.entreprises);
                setUserProfile(res.data.entreprises);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={User1}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                        alt="user-account"
                    />
                }
                label={<IconSettings stroke={1.5} size="24px" color={theme.palette.primary.main} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />

            <Popper
                placement="bottom"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 14]
                        }
                    }
                ]}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions in={open} {...TransitionProps}>
                            <Paper>
                                {open && (
                                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                        <Box sx={{ p: 2, pb: 0 }}>
                                            <Stack>
                                                <Stack direction="row" spacing={0.5} alignItems="center">
                                                    {userProfile && (
                                                        <>
                                                            <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                                                Bienvenue dans
                                                            </Typography>
                                                            <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                                                {userProfile[selectedEnterprise]?.nom}
                                                            </Typography>
                                                        </>
                                                    )}
                                                </Stack>
                                            </Stack>
                                        </Box>

                                        <PerfectScrollbar
                                            style={{
                                                height: '100%',
                                                maxHeight: 'calc(100vh - 250px)',
                                                overflowX: 'hidden'
                                            }}
                                        >
                                            <Box sx={{ p: 2, pt: 0 }}>
                                                <Card
                                                    sx={{
                                                        bgcolor:
                                                            theme.palette.mode === 'dark'
                                                                ? theme.palette.dark[800]
                                                                : theme.palette.primary.light,
                                                        my: 2
                                                    }}
                                                >
                                                    {userProfile &&
                                                        userProfile.map((item, index) => {
                                                            return (
                                                                <ListItemButton
                                                                    onClick={() => {
                                                                        setSelectedEnterprise(index);
                                                                        setSinglEntreprise(item);
                                                                        navigate('/user/account-profile/profile3/' + index);
                                                                        // window.location.reload(true);
                                                                    }}
                                                                    key={index}
                                                                >
                                                                    <ListItemText
                                                                        primary={
                                                                            <Typography variant="body1">
                                                                                <FormattedMessage id={item.nom} />
                                                                            </Typography>
                                                                        }
                                                                    />
                                                                </ListItemButton>
                                                            );
                                                        })}
                                                </Card>

                                                <Divider />
                                                <List
                                                    component="nav"
                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: 350,
                                                        minWidth: 300,
                                                        backgroundColor: theme.palette.background.paper,
                                                        borderRadius: '10px',
                                                        [theme.breakpoints.down('md')]: {
                                                            minWidth: '100%'
                                                        },
                                                        '& .MuiListItemButton-root': {
                                                            mt: 0.5
                                                        }
                                                    }}
                                                >
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        selected={selectedIndex === 0}
                                                        onClick={(event) => handleListItemClick(event, 0, '/user/account-profile/profile3')}
                                                    >
                                                        <ListItemIcon>
                                                            <IconSettings stroke={1.5} size="20px" />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                <Typography variant="body2">
                                                                    <FormattedMessage id="account-settings" />
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItemButton>
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        selected={selectedIndex === 1}
                                                        onClick={(event) => handleListItemClick(event, 1, '/user/social-profile/posts')}
                                                    >
                                                        <ListItemIcon>
                                                            <IconUser stroke={1.5} size="20px" />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                <Grid container spacing={1} justifyContent="space-between">
                                                                    <Grid item>
                                                                        <Typography variant="body2">
                                                                            <FormattedMessage id="social-profile" />
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Chip
                                                                            label="02"
                                                                            size="small"
                                                                            color="warning"
                                                                            sx={{ '& .MuiChip-label': { mt: 0.25 } }}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            }
                                                        />
                                                    </ListItemButton>
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        selected={selectedIndex === 4}
                                                        onClick={handleLogout}
                                                    >
                                                        <ListItemIcon>
                                                            <IconLogout stroke={1.5} size="20px" />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                <Typography variant="body2">
                                                                    <FormattedMessage id="logout" />
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItemButton>
                                                </List>
                                            </Box>
                                        </PerfectScrollbar>
                                    </MainCard>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
