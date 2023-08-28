import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { IconSearch } from "@tabler/icons";
import {
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import Avatar from "ui-component/extended/Avatar";

const AffichageFactures = ({ factures, page, rowsPerPage }) => {
  const theme = useTheme();
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const facturesToShow = factures.slice(startIndex, endIndex);

  function TableCellContent({ id_facture }) {
    const [facture, setFacture] = useState(null);

    useEffect(() => {
      axios
        .get("http://localhost:5000/facture/" + id_facture)
        .then((res) => {
          console.log(res.data);
          setFacture(res.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }, [id_facture]);
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar alt="Facture 1" src={facture?.id_facture} />
        </Grid>
        <Grid item xs zeroMinWidth>
          <Typography align="left" variant="subtitle1" component="div">
            {facture?.facture_id}
          </Typography>
        </Grid>
      </Grid>
    );
  }
};
export default AffichageFactures;
