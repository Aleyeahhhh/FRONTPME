import { useState, forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import ReactDOM from "react-dom";
// material-ui
import { useTheme } from "@mui/material/styles";
import {
  DialogTitle,
  Menu,
  MenuItem,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Link,
  Slide,
  TextField,
  Typography,
} from "@mui/material";

// third-party
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// project imports
import { gridSpacing } from "store/constant";

// assets
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import AttachmentTwoToneIcon from "@mui/icons-material/AttachmentTwoTone";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { IconArrowsDiagonal2 } from "@tabler/icons";
import MyComponent from "./DateNego";

// animation
const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

// ==============================|| MAIL COMPOSE DIALOG ||============================== //

const ComposeDialog = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const [composeDialogOpen, setComposeDialogOpen] = useState(false);
  const [composeDialogContent, setComposeDialogContent] = useState(null);

  const handleComposeDialogOpen = (content) => {
    setComposeDialogContent(content);
    setComposeDialogOpen(true);
  };

  const handleComposeDialogClose = () => {
    setComposeDialogOpen(false);
    setComposeDialogContent(null);
  };
  const [ccBccValue, setCcBccValue] = useState(false);
  const handleCcBccChange = () => {
    setCcBccValue((prev) => !prev);
  };

  let composePosition = {};

  const [position, setPosition] = useState(true);
  if (!position) {
    composePosition = {
      "& .MuiDialog-container": {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        "& .MuiPaper-root": {
          mb: 0,
          borderRadius: "12px 12px 0px 0px",
          maxWidth: 595,
        },
      },
    };
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ width: "100%" }}
        size="large"
        startIcon={<AddCircleOutlineTwoToneIcon />}
      >
        Composer
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        sx={composePosition}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0.5rem",
          }}
        >
          <Button
            aria-controls="dropdown-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Choisir Modèle
          </Button>
          <Menu
            id="dropdown-menu"
            anchorEl={anchorEl}
            anchorReference="anchorEl"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Rappel de paiement</MenuItem>
            <Box sx={{ display: "relative" }}>
              {/* Compose Dialog */}
              <Dialog
                open={composeDialogOpen}
                onClose={handleComposeDialogClose}
                maxWidth="md"
                fullWidth
              >
                <DialogTitle>Compose Email</DialogTitle>
                <DialogTitle>
                  {composeDialogContent} {/* Render composeDialogContent */}
                </DialogTitle>
              </Dialog>
            </Box>
            <MenuItem onClick={handleClose}>Facture</MenuItem>
            <MenuItem onClick={handleClose}>Validation de la facture</MenuItem>
            <MenuItem onClick={handleClose}>Rappel d'action</MenuItem>
            <MenuItem onClick={handleClose}>
              Rappel de date de négociation de contrat
            </MenuItem>
          </Menu>
        </Box>

        {open && (
          <DialogContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignItems="center" spacing={0}>
                  <Grid item sm zeroMinWidth>
                    <Typography component="div" align="left" variant="h4">
                      Nouveau Message
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={() => setPosition(!position)}
                      size="large"
                    >
                      <IconArrowsDiagonal2 />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleCloseDialog} size="large">
                      <HighlightOffTwoToneIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="flex-end" spacing={0}>
                  <Grid item>
                    <Link
                      component={RouterLink}
                      to="#"
                      color={
                        theme.palette.mode === "dark" ? "primary" : "secondary"
                      }
                      onClick={handleCcBccChange}
                      underline="hover"
                    >
                      CC & BCC
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="To" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Subject" />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: ccBccValue ? "block" : "none" }}
              >
                <Collapse in={ccBccValue}>
                  {ccBccValue && (
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12}>
                        <TextField fullWidth label="CC" />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth label="BCC" />
                      </Grid>
                    </Grid>
                  )}
                </Collapse>
              </Grid>

              {/* quill editor */}
              <Grid
                item
                xs={12}
                sx={{
                  "& .quill": {
                    bgcolor:
                      theme.palette.mode === "dark" ? "dark.main" : "grey.50",
                    borderRadius: "12px",
                    "& .ql-toolbar": {
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "dark.light"
                          : "grey.100",
                      borderColor:
                        theme.palette.mode === "dark"
                          ? theme.palette.dark.light + 20
                          : "grey.400",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    },
                    "& .ql-container": {
                      borderColor:
                        theme.palette.mode === "dark"
                          ? `${theme.palette.dark.light + 20} !important`
                          : `${theme.palette.grey[400]} !important`,
                      borderBottomLeftRadius: "12px",
                      borderBottomRightRadius: "12px",
                      "& .ql-editor": {
                        minHeight: 125,
                      },
                    },
                  },
                }}
              >
                <ReactQuill theme="snow" />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconButton size="large">
                      <UploadFileIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton size="large">
                      <AttachmentTwoToneIcon />
                    </IconButton>
                  </Grid>
                  <Grid item sx={{ flexGrow: 1 }} />
                  <Grid item>
                    <Button variant="contained">Reply</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default ComposeDialog;
