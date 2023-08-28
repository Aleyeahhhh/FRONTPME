import PropTypes from "prop-types";
import { memo } from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  linearProgressClasses,
} from "@mui/material";

// assets
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";

// styles
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 30,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.dark.light : "#fff",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.primary.dark
        : theme.palette.primary.main,
  },
}));

const CardStyle = styled(Card)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? theme.palette.dark.main
      : theme.palette.primary.light,
  marginBottom: "22px",
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: "157px",
    height: "157px",
    background:
      theme.palette.mode === "dark"
        ? theme.palette.dark.dark
        : theme.palette.primary[200],
    borderRadius: "50%",
    top: "-105px",
    right: "-96px",
  },
}));

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

function LinearProgressWithLabel({ value, ...others }) {
  const theme = useTheme();

  return (
    <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
      <Grid item>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography
              variant="h6"
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.dark.light
                    : theme.palette.primary[800],
              }}
            >
              Progress
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="inherit">{`${Math.round(
              value
            )}%`}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <BorderLinearProgress
          variant="determinate"
          value={value}
          {...others}
          aria-label="progress of theme"
        />
      </Grid>
    </Grid>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number,
};

// ==============================|| SIDEBAR - MENU CARD ||============================== //

const MenuCard = () => {
  const theme = useTheme();
};

export default memo(MenuCard);
