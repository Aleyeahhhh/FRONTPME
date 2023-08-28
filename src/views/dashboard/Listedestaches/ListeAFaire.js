import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CardActions,
  CardContent,
  Checkbox,
  Fab,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import axios from "axios";
const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("medium");

  const addTask = () => {
    if (newTask.trim() !== "") {
      const task = {
        text: newTask,
        priority: newPriority,
        completed: false,
        date: new Date().toLocaleString(),
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setNewPriority("medium");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (shouldDelete) {
      const updatedTasks = tasks.filter((task, i) => i !== index);
      setTasks(updatedTasks);
    }
  };

  const sortedTasks = tasks.slice().sort((a, b) => {
    if (a.priority === b.priority) {
      return new Date(a.date) - new Date(b.date);
    }
    return a.priority === "high" ? -1 : a.priority === "medium" ? 0 : 1;
  });
  const [todo, setTodo] = useState({
    new_task: "",
    new_priority: "",
  });

  useEffect(() => {
    if (todo.new_task.trim() !== "") {
      axios
        .post("http://localhost:5000/todolist/", todo)
        .then((res) => {
          console.log(res.data);
          setTodo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [todo]);

  return (
    <MainCard title="To Do List" content={false}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="text"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
            />
            <Select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </Grid>
          {sortedTasks.map((task, index) => (
            <Grid item xs={12} key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(index)}
                  />
                }
                label={
                  <span
                    style={{
                      fontWeight: task.priority === "high" ? "bold" : "normal",
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {`${task.text} (${task.priority}) - Added on ${task.date}`}
                  </span>
                }
              />
              <button onClick={() => deleteTask(index)}>
                <DeleteIcon />
              </button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="flex-end">
          <Fab size="small" color="primary" onClick={addTask}>
            <AddRoundedIcon fontSize="small" />
          </Fab>
        </Grid>
      </CardActions>
    </MainCard>
  );
};

export default ToDoList;
