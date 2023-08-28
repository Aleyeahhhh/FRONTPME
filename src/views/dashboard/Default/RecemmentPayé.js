import PropTypes from "prop-types";
import React from "react";
import { useTheme, styled } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import PriceCheckRoundedIcon from "@mui/icons-material/PriceCheckRounded";
import SkeletonEarningCard from "ui-component/cards/Skeleton/EarningCard";
import { useNavigate } from "react-router-dom";
// ... (import statements)
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.dark.dark
      : theme.palette.secondary.dark,
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background:
      theme.palette.mode === "dark"
        ? `linear-gradient(210.04deg, ${theme.palette.secondary.dark} -50.94%, rgba(144, 202, 249, 0) 95.49%)`
        : theme.palette.secondary[800],
    borderRadius: "50%",
    top: -85,
    right: -95,
    [theme.breakpoints.down("sm")]: {
      top: -105,
      right: -140,
    },
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background:
      theme.palette.mode === "dark"
        ? `linear-gradient(140.9deg, ${theme.palette.secondary.dark} -14.02%, rgba(144, 202, 249, 0) 85.50%)`
        : theme.palette.secondary[800],
    borderRadius: "50%",
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down("sm")]: {
      top: -155,
      right: -70,
    },
  },
}));

// Create a function to generate random amounts
const generateRandomAmount = () => {
  return (Math.random() * 1000).toFixed(2); // Generate a random amount between 0 and 1000
};

const RecemmentPayé = ({ isLoading }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleListIconClick = () => {
    // Redirect to the specified link
    navigate("/dashboard/Reminder");
  };

  const RecemmentPayéIcon = styled(PriceCheckRoundedIcon)`
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 30px;
    cursor: pointer;
  `;

  // Create an array of 5 factures with random amounts
  const factures = Array.from({ length: 6 }, (_, index) => ({
    id: index,
    amount: generateRandomAmount(),
  }));

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 1.5 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 500,
                marginBottom: 1.25,
              }}
            >
              Les Factures Récemment Payées
            </Typography>
          </Box>
          <RecemmentPayéIcon onClick={handleListIconClick} />
          {/* Map through the factures array */}
          {factures.map((facture, index) => (
            <Box key={facture.id} sx={{ p: 1.25 }}>
              <Grid container direction="column">
                {/* Display the facture number */}
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      mb: 0.1,
                    }}
                  >
                    Facture n°{index + 1}
                  </Typography>
                </Grid>
                {/* Display the facture amount */}
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      mr: 0.1,
                      mt: 0.1,
                      mb: 0.1,
                    }}
                  >
                    ${facture.amount}
                  </Typography>
                </Grid>
                {/* ... (rest of the code) */}
              </Grid>
            </Box>
          ))}
        </CardWrapper>
      )}
    </>
  );
};

RecemmentPayé.propTypes = {
  isLoading: PropTypes.bool,
};

export default RecemmentPayé;
