import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Grid } from "@mui/material";
ChartJS.register(ArcElement, Tooltip, Legend);
// Sample data for demonstration
const sampleInvoices = [
  { amount: 100, dueDate: new Date("2023-07-01") },
  { amount: 200, dueDate: new Date("2023-09-15") },
  { amount: 150, dueDate: new Date("2023-08-20") },
];

const FinancialDatagram = () => {
  const [totalDueAndOutstanding, setTotalDueAndOutstanding] = useState(0);
  const [totalNotDueAndNotRegularized, setTotalNotDueAndNotRegularized] =
    useState(0);
  const [data, setData] = useState({
    labels: ["Due and Outstanding", "Not Due and Not Regularized"],
    datasets: [
      {
        data: [totalDueAndOutstanding, totalNotDueAndNotRegularized],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  });

  useEffect(() => {
    const currentDate = new Date();

    let dueAndOutstandingTotal = 0;
    let notDueAndNotRegularizedTotal = 0;

    sampleInvoices.forEach((invoice) => {
      if (invoice.dueDate < currentDate) {
        dueAndOutstandingTotal += invoice.amount;
      } else {
        notDueAndNotRegularizedTotal += invoice.amount;
      }
    });

    setTotalDueAndOutstanding(dueAndOutstandingTotal);
    setTotalNotDueAndNotRegularized(notDueAndNotRegularizedTotal);
  }, []);

  useEffect(() => {
    setData({
      labels: ["Echu et non regularisé", "Non echu et non regularisé"],
      datasets: [
        {
          data: [totalDueAndOutstanding, totalNotDueAndNotRegularized],
          backgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    });
  }, [totalDueAndOutstanding, totalNotDueAndNotRegularized]);

  return (
    <Grid lg={9} style={{ marginLeft: 50 }}>
      <div>
        <Doughnut data={data} />
      </div>
    </Grid>
  );
};

export default FinancialDatagram;
