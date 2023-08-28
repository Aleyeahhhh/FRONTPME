import React from "react";
import { Grid } from "@mui/material";
import ToDoList from "./Listedestaches";

const ToDoListInd = () => (
  <Grid item xs={12} lg={4} md={6}>
    <ToDoList />
  </Grid>
);

export default ToDoListInd;
