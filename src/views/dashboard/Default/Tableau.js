// material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
// project imports
import axios from "axios";
import ListeEnAttente from "./EnAttente";
import EnRetard from "./EnRetard.js";
import NonEchu from "./NonEchu";
import Echu from "./Echu";
import MainCard from "ui-component/cards/MainCard";
import RevenueCard from "ui-component/cards/RevenueCard";
import UserCountCard from "ui-component/cards/UserCountCard";
import { gridSpacing } from "store/constant";
import ReportCard from "ui-component/cards/ReportCard";
// assets
import IconNumberCard from "ui-component/cards/IconNumberCard";
import {
  IconAddressBook,
  IconAlertTriangle,
  IconShare,
  IconAccessPoint,
  IconCircles,
  IconCreditCard,
  IconFileDollar,
  IconFileInvoice,
  IconMailForward,
  IconExclamationCircle,
  IconHourglassHigh,
} from "@tabler/icons";
import FolderOpenTwoToneIcon from "@mui/icons-material/FolderOpenTwoTone";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import AccountCircleTwoTone from "@mui/icons-material/AccountCircleTwoTone";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import BugReportTwoToneIcon from "@mui/icons-material/BugReportTwoTone";

// ==============================|| ANALYTICS DASHBOARD ||============================== //

const Analytics = () => {
  const theme = useTheme();
  const matchDownXs = useMediaQuery(theme.breakpoints.down("sm"));
  const cardBorder = {
    borderRadius: "4px",
    border: `1px solid ${
      theme.palette.mode === "dark"
        ? theme.palette.dark.main
        : theme.palette.grey[300]
    }`,
  };
  const blockSX = {
    p: 2,
    borderLeft: "1px solid ",
    borderBottom: "1px solid ",
    borderLeftColor:
      theme.palette.mode === "dark"
        ? theme.palette.dark.main
        : theme.palette.grey[200],
    borderBottomColor:
      theme.palette.mode === "dark"
        ? theme.palette.dark.main
        : theme.palette.grey[200],
  };
  const [activeContracts, setActiveContracts] = useState("Loading...");

  useEffect(() => {
    console.log("useEffect is running"); // Debugging log

    axios
      .get("http://127.0.0.1:5000/contract/closest_expiring_contract")
      .then((response) => {
        console.log("Received response:", response); // Debugging log
        const data = response.data;
        if (data.status === "success") {
          setContractInfo({
            primary: `Prochain Contrat Echu: ${data.contract.date_fin}`,
            secondary: `(Client: ${data.contract.nom})`,
          });
        } else {
          setContractInfo({
            primary: "Pas de contrat",
            secondary: "Pas de nom",
          });
        }
      })
      .catch((error) => {
        console.error("Une erreur est survenue:", error); // Debugging log
        setContractInfo({
          primary: "une erreur est survenue",
          secondary: "Erreur",
        });
      });
  }, []);
  const [contractInfo, setContractInfo] = useState({
    primary: "Loading...",
    secondary: "Loading...",
  });
  useEffect(() => {
    console.log("useEffect is running"); // Debugging log

    axios
      .get("http://127.0.0.1:5000/contract/active_contracts")
      .then((response) => {
        console.log("Received response:", response); // Debugging log
        const data = response.data;
        if (data.status === "success") {
          setActiveContracts(data.active_contracts_count);
        } else {
          setActiveContracts("Error");
        }
      })
      .catch((error) => {
        console.log("There was an error fetching the active contracts:", error); // Debugging log
        setActiveContracts("Error");
      });
  }, []);
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} lg={12} sm={6}>
        <IconNumberCard
          title="Contrats actifs"
          primary={activeContracts}
          color={theme.palette.success.main}
          iconPrimary={IconAddressBook}
        />
      </Grid>
      <Grid item xs={12} lg={12} sm={6}>
        <ReportCard
          primary={contractInfo.primary}
          secondary={contractInfo.secondary}
          color={theme.palette.error.dark}
          iconPrimary={IconAddressBook}
        />
      </Grid>
      <Grid item xs={12} lg={12} md={6}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} lg={6}>
            <RevenueCard
              primary="Recemment Payé"
              secondary="$30,000"
              content="$15,000 ce mois"
              iconPrimary={MonetizationOnTwoToneIcon}
              color="#057823"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <RevenueCard
              primary="Relances Envoyées"
              secondary="486"
              content="6 cette semaine"
              iconPrimary={IconMailForward}
              color="#bac21f"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={12} md={6}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard
              content={false}
              sx={{
                "& svg": {
                  width: 50,
                  height: 50,
                  color: theme.palette.secondary.main,
                  borderRadius: "14px",
                  p: 1.25,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? theme.palette.background.default
                      : "primary.light",
                },
              }}
            >
              <Grid container alignItems="center" spacing={0}>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    justifyContent={matchDownXs ? "space-between" : "center"}
                  >
                    <Grid item>
                      <IconFileInvoice stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        1000
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        Factures
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    justifyContent={matchDownXs ? "space-between" : "center"}
                  >
                    <Grid item>
                      <IconAlertTriangle stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        122
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        En attente de paiement
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={0}>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    justifyContent={matchDownXs ? "space-between" : "center"}
                  >
                    <Grid item>
                      <IconFileDollar stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        25,000 DT
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        Non régularisées
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    justifyContent={matchDownXs ? "space-between" : "center"}
                  >
                    <Grid item>
                      <IconHourglassHigh stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        137
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        En attente de validation
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          <Grid item xs={12}>
            <UserCountCard
              primary="Factures en retard de paiement"
              secondary="66"
              iconPrimary={AccountCircleTwoTone}
              color="#d0342c"
            />
          </Grid>
          <Grid item xs={12}>
            <UserCountCard
              primary="Montant en retard de paiement"
              secondary="14,000 DT"
              iconPrimary={IconExclamationCircle}
              color="#d0342c"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Analytics;
