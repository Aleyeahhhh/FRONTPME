// material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
// project imports
import axios from "axios";

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
  IconFileDollar,
  IconFileInvoice,
  IconMailForward,
  IconExclamationCircle,
  IconHourglassHigh,
} from "@tabler/icons";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import AccountCircleTwoTone from "@mui/icons-material/AccountCircleTwoTone";

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
        const data = response.data;
        if (data.statut === "success") {
          // Note: Changed "status" to "statut"
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
        console.error("Une erreur est survenue:", error);
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
    axios
      .get("http://127.0.0.1:5000/contract/active_contracts")
      .then((response) => {
        const data = response.data;
        if (data.statut === "success") {
          setActiveContracts(data.active_contracts_count);
        } else {
          setActiveContracts("Error");
        }
      })
      .catch((error) => {
        console.log("There was an error fetching the active contracts:", error);
        setActiveContracts("Error");
      });
  }, []);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalTTC, setTotalTTC] = useState(null);
  const [totalData, setTotalData] = useState(null);
  const [totalLoading, setTotalLoading] = useState(true);
  const [totalError, setTotalError] = useState(null);
  const [waitingData, setWaitingData] = useState(null);
  const [waitingLoading, setWaitingLoading] = useState(true);
  const [waitingError, setWaitingError] = useState(null);
  const [count, setCount] = useState(null);
  const [total, setTotal] = useState(0);
  const [retard, setRetard] = useState(0);
  const [sum, setSum] = useState(0);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/facture/total_factures_count")
      .then((response) => {
        const data = response.data;
        if (data.statut === "success") {
          setTotalData(data.total_factures_count);
        } else {
          setTotalError("Failed to fetch total data");
        }
      })
      .catch((e) => {
        setTotalError(`Error: ${e.message}`);
        console.error(
          "There was an error fetching the total factures count",
          e
        );
      })
      .finally(() => {
        setTotalLoading(false);
      });
  }, []);

  // Fetch waiting factures count
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/facture/count_waiting_factures")
      .then((response) => {
        const data = response.data;
        if (data) {
          setWaitingData(data.count);
        } else {
          setWaitingError("Failed to fetch waiting data");
        }
      })
      .catch((e) => {
        setWaitingError(`Error: ${e.message}`);
        console.error(
          "There was an error fetching the waiting factures count",
          e
        );
      })
      .finally(() => {
        setWaitingLoading(false);
      });
  }, []);
  useEffect(() => {
    // Fetch total_ttc_non_payee_partiellement data
    axios
      .get("http://127.0.0.1:5000/facture/non_regularisee")
      .then((response) => {
        const data = response.data;
        if (data.statut === "success") {
          setTotalTTC(data.total_ttc_non_payee_partiellement);
          setLoading(false);
        } else {
          setError("Failed to fetch data");
          setLoading(false);
        }
      })
      .catch((e) => {
        setError(`Error: ${e.message}`);
        setLoading(false);
        console.error("There was an error fetching the data", e);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get("http://localhost:5000/facture/NON_VALIDE")
      .then((response) => {
        setCount(response.data.count_non_valide_factures);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    const apiUrl = "http://localhost:5000/paiement/recemment_paye";

    axios
      .get(apiUrl)
      .then((response) => {
        setTotal(response.data.total_paid_current_month);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    const apiUrl = "http://localhost:5000/facture/late_factures_count";

    axios
      .get(apiUrl)
      .then((response) => {
        setRetard(response.data.late_factures_count);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    // Replace this URL with the actual URL of your Flask API endpoint
    const apiUrl =
      "http://localhost:5000/facture/sum_of_total_ttc_for_late_factures";

    axios
      .get(apiUrl)
      .then((response) => {
        setSum(response.data.sum_of_total_ttc);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
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
          <Grid item xs={12} lg={12}>
            <RevenueCard
              primary="Recemment Payé"
              secondary={total}
              content="DINARS"
              iconPrimary={MonetizationOnTwoToneIcon}
              color="#057823"
            />
          </Grid>
          {/* <Grid item xs={12} lg={6}>
            <RevenueCard
              primary="Relances Envoyées"
              secondary="486"
              content="6 cette semaine"
              iconPrimary={IconMailForward}
              color="#bac21f"
            />
          </Grid> */}
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
                        {totalLoading ? (
                          <div>Loading total...</div>
                        ) : (
                          <div> {totalData}</div>
                        )}
                        {totalError && <div>{totalError}</div>}
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
                        <div>
                          {" "}
                          {waitingLoading ? (
                            <div>Loading waiting...</div>
                          ) : (
                            <div> {waitingData}</div>
                          )}
                          {waitingError && <div>{waitingError}</div>}
                        </div>
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
                        <div>
                          {loading ? (
                            <p>Loading...</p>
                          ) : error ? (
                            <p>Error: {error}</p>
                          ) : (
                            <p>{totalTTC} DT </p>
                          )}
                        </div>
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
                        {loading ? (
                          <p>Loading...</p>
                        ) : error ? (
                          <p>Error: {error}</p>
                        ) : (
                          <p>{count} </p>
                        )}
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
              secondary={retard}
              iconPrimary={AccountCircleTwoTone}
              color="#d0342c"
            />
          </Grid>
          <Grid item xs={12}>
            <UserCountCard
              primary="Montant en retard de paiement"
              secondary={sum}
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
