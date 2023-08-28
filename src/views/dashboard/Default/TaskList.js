import React, { useEffect, useState } from "react";
import axios from "axios";
// material-ui
import {
  Avatar,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// project imports
import Chip from "ui-component/extended/Chip";

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // store tasks
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const navigate = useNavigate();
  const handleListIconClick = () => {
    // Redirect to the specified link
    navigate("/dashboard/listedestaches");
  };
  useEffect(() => {
    // Function to fetch all tasks
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/tasklist/tasks"
        ); // Replace with your Flask API endpoint
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Une erreur est servenue: ", error);
      }
    };

    fetchTasks();
  }, []);
  const addNewTask = async (task, badgeText, badgeType) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/tasklist/add_task",
        {
          task,
          badgeText,
          badgeType,
        }
      );
      console.log("Task added: ", response.data);
    } catch (error) {
      console.error("Une erreur est survenue: ", error);
    }
  };

  return (
    <TableContainer sx={{ maxHeight: 340 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 3 }}>Tâche</TableCell>
            <TableCell>Date crée</TableCell>
            <TableCell align="right" sx={{ pr: 3 }}>
              Priorité
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.slice(0, 20).map((row, index) => (
            <TableRow hover key={index}>
              <TableCell sx={{ pl: 3 }}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  sx={{ flexWrap: "nowrap" }}
                >
                  <Grid item xs zeroMinWidth>
                    <Typography
                      component="div"
                      align="left"
                      variant="subtitle1"
                    >
                      {row.task}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>
                <Chip
                  chipcolor={row.badgeType}
                  label={row.badgeText}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;
