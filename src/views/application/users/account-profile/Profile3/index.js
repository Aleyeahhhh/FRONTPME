import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// material-ui
import { Box } from '@mui/material';

// project imports
import Profile from './Profile';
import MainCard from 'ui-component/cards/MainCard';

// tabs
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

// ==============================|| PROFILE 3 ||============================== //
const Profile3 = () => {
    const [value, setValue] = useState(0);
    return (
        <MainCard title="Details de L'entreprise">
            <TabPanel value={value} index={0}>
                <Profile />
            </TabPanel>
        </MainCard>
    );
};

export default Profile3;
