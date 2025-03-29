import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../Redux/tasksSlice";
import TaskCard from "./TaskCard";
import {
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
} from "@mui/material";
import { AnimatePresence } from "framer-motion";
import dayjs from "dayjs";

const TaskList = ({ filters, handleOpen }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const taskDate = dayjs(task.date);
    const isWithinDateRange =
      (!startDate || taskDate.isAfter(dayjs(startDate).subtract(1, "day"))) &&
      (!endDate || taskDate.isBefore(dayjs(endDate).add(1, "day")));

    return (
      isWithinDateRange &&
      (filters.status === "all" || task.status === filters.status) &&
      (filters.priority === "all" || task.priority === filters.priority)
    );
  });

  return (
    <>
      <Box
        display="flex"
        gap={2}
        mb={2}
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <TextField
          type="date"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{ flex: 1 }}
        />
        <TextField
          type="date"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={{ flex: 1 }}
        />
      </Box>

      <AnimatePresence>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleOpen={handleOpen}
              setDeleteConfirm={setDeleteConfirm}
            />
          ))
        ) : (
          <Box textAlign="center" mt={3}>
            <Typography sx={{ color: "gray", mt: 1 }}>
              No tasks available , Create New One !
            </Typography>
          </Box>
        )}
      </AnimatePresence>

      <Dialog
        open={Boolean(deleteConfirm)}
        onClose={() => setDeleteConfirm(null)}
      >
        <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteTask(deleteConfirm));
              setDeleteConfirm(null);
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskList;
