import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
  Pagination,
  Typography,
} from "@mui/material";
import { IconSearch } from "@tabler/icons";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";

const Facture = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/facture/")
      .then((res) => {
        console.log(res.data);
        setData(res.data.AffichageFactures); // Adjust the data access
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <MainCard
      title={
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={gridSpacing}
        >
          <Grid item>
            <Typography variant="h3">Factures</Typography>
          </Grid>
          <Grid item>
            <OutlinedInput
              id="input-search-list-style1"
              placeholder="Search"
              startAdornment={
                <InputAdornment position="start">
                  <IconSearch stroke={1.5} size="16px" />
                </InputAdornment>
              }
              size="small"
            />
          </Grid>
        </Grid>
      }
      content={false}
    >
      <Grid item xs={12} sx={{ p: 3 }}>
        <Pagination
          // count={Math.ceil(data.length / rowsPerPage)}
          color="primary"
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </Grid>
    </MainCard>
  );
};

export default Facture;
