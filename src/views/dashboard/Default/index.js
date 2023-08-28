import { useEffect, useState } from "react";

// material-ui
import { Grid, Button, CardActions, CardContent, Divider } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";

// project imports

import Analytics from "./Tableau";
import FinancialDatagram from "./FinancialDiagram";
import TaskList from "./TaskList";

import KPI from "./KPI";

import { gridSpacing } from "store/constant";

import { useNavigate } from "react-router-dom";
import { height, width } from "@mui/system";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const navigate = useNavigate();
  const handleListIconClick = () => {
    // Redirect to the specified link
    navigate("/dashboard/listedestaches");
  };
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} lg={8} md={6}>
        <MainCard title="Liste des tâches" content={false}>
          <CardContent sx={{ p: 0 }}>
            <TaskList />
          </CardContent>
          <Divider />

          <CardActions sx={{ justifyContent: "flex-end" }}>
            <span onClick={handleListIconClick}>
              <Button variant="text" size="small">
                Modifier tâches
              </Button>
            </span>
          </CardActions>
        </MainCard>
        <Grid item lg={12} style={{ marginTop: "40px", marginLeft: "10px" }}>
          {/* <KPI isLoading={isLoading} /> */}
          <KPI />
        </Grid>
      </Grid>
      <Grid item lg={4}>
        <Analytics isLoading={isLoading} />
        <FinancialDatagram />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
