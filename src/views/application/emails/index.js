// material-ui
import { Grid } from '@mui/material';

// project imports
import Model from './Model';
import { gridSpacing } from 'store/constant';
import Renego from './Renego';

// ==============================|| FORMS WIZARD ||============================== //

const Emails = () => (
    <Grid container spacing={gridSpacing} justifyContent="center">
        <Grid item xs={12} md={9} lg={7}>
            <Model />
        </Grid>
    </Grid>
);

export default Emails;
