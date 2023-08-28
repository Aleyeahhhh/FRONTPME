import PropTypes from "prop-types";
import React from "react";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

// third-party

// project imports
import MainCard from "ui-component/cards/MainCard";
import SkeletonTotalOrderCard from "ui-component/cards/Skeleton/EarningCard";

// assets
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import { useNavigate } from "react-router-dom";

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const CardWrapper = styled(MainCard)(({ theme }) => ({
  // ... (styles for CardWrapper)
}));
const EnAttenteIcon = styled(DescriptionRoundedIcon)`
  position: relative;
  top: -30px;
  left: 310px;
  font-size: 30px;
  cursor: pointer;
`;

const ListeEnAttente = ({ isLoading }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [timeValue, setTimeValue] = React.useState(false);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };
  const handleListIconClick = () => {
    // Redirect to the specified link
    navigate("/dashboard/Pending");
  };
  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid item xs={12}>
              <Grid item>
                <Button
                  disableElevation
                  variant={timeValue ? "contained" : "text"}
                  size="small"
                  sx={{ color: "inherit" }}
                  onClick={(e) => handleChangeTime(e, true)}
                >
                  Non-Validé
                </Button>
                <Button
                  disableElevation
                  variant={!timeValue ? "contained" : "text"}
                  size="small"
                  sx={{ color: "inherit" }}
                  onClick={(e) => handleChangeTime(e, false)}
                >
                  Validé
                </Button>
              </Grid>
              <EnAttenteIcon fontSize="inherit" onClick={handleListIconClick} />
              <Typography
                variant="h4"
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 500,
                }}
              >
                Factures en attente de validation
              </Typography>
              <Grid container direction="column">
                <Grid item>
                  <Grid container justifyContent="space-between">
                    <Grid item></Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ mb: 0.75 }}>
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      <Grid container alignItems="center">
                        <Grid item>
                          {timeValue ? (
                            <Typography
                              sx={{
                                fontSize: "1.5rem",
                                fontWeight: 500,
                                mr: 1,
                                mt: 1.75,
                                mb: 0.75,
                              }}
                            >
                              Facture n°1 $780.07 Facture n°2 $748.93 Facture
                              n°3 $101.62 Facture n°4 $604.27 Facture n°5 $2.86
                            </Typography>
                          ) : (
                            <Typography
                              sx={{
                                fontSize: "1.5rem",
                                fontWeight: 500,
                                mr: 1,
                                mt: 1.75,
                                mb: 0.75,
                              }}
                            >
                              Facture n°1 $877.16 Facture n°2 $564.27 Facture
                              n°3 $26.90 Facture n°4 $813.34
                            </Typography>
                          )}
                        </Grid>
                        <Grid item>
                          <Avatar
                            sx={{
                              ...theme.typography.smallAvatar,
                              cursor: "pointer",
                              backgroundColor: theme.palette.primary[200],
                              color: theme.palette.primary.dark,
                            }}
                          >
                            <FileCopyRoundedIcon
                              fontSize="inherit"
                              sx={{ transform: "rotate3d(1, 1, 1, 45deg)" }}
                            />
                          </Avatar>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

ListeEnAttente.propTypes = {
  isLoading: PropTypes.bool,
};

export default ListeEnAttente;
