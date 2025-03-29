import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../Redux/tasksSlice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Box,
  Slide,
} from "@mui/material";
import { motion } from "framer-motion";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const TaskModal = ({ open, setOpen, editTask: existingTask }) => {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    id: "",
    title: "",
    description: "",
    priority: "Low",
    status: "Pending",
    date: "",
  });

  const [errors, setErrors] = useState({ title: false, description: false });

  useEffect(() => {
    if (existingTask) {
      setTaskData(existingTask);
    } else {
      setTaskData({
        id: Date.now().toString(),
        title: "",
        description: "",
        priority: "Low",
        status: "Pending",
        date: new Date().toISOString(),
      });
    }
  }, [existingTask]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = () => {
    if (!taskData.title.trim() || !taskData.description.trim()) {
      setErrors({
        title: !taskData.title.trim(),
        description: !taskData.description.trim(),
      });
      return;
    }

    if (existingTask) {
      dispatch(editTask(taskData));
    } else {
      dispatch(addTask(taskData));
    }
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
      fullWidth
    >
      <DialogTitle align="center">
        {existingTask ? "Edit Task" : "Create Task"}
      </DialogTitle>

      <DialogContent>
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            margin="dense"
            error={errors.title}
            helperText={errors.title ? "Title is required" : ""}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            margin="dense"
            multiline
            rows={3}
            error={errors.description}
            helperText={errors.description ? "Description is required" : ""}
          />

          <FormControl fullWidth margin="dense">
            <p>Priority:</p>
            <Select
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <p>Status:</p>
            <Select
              name="status"
              value={taskData.status}
              onChange={handleChange}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="InProgress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
        <Button onClick={() => setOpen(false)} variant="outlined">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ fontWeight: "bold" }}
        >
          {existingTask ? "Save Changes" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
