// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AjoutPaiment from './AjoutPaiment';
// ==============================||  °o°  ||============================== //

const Facture = () => (
    <Grid container spacing={gridSpacing} justifyContent="center">
        <Grid item xs={12} md={9} lg={7}>
            <AjoutPaiment />
        </Grid>
    </Grid>
);

export default Facture;
