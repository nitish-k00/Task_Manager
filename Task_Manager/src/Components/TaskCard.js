import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "#ff4d4f"; // Red
    case "Medium":
      return "#faad14"; // Orange
    case "Low":
      return "#52c41a"; // Green
    default:
      return "#000";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "#ff4d4f"; // Red
    case "InProgress":
      return "#faad14"; // Orange
    case "Completed":
      return "#52c41a"; // Green
    default:
      return "#000";
  }
};

const TaskCard = ({ task, handleOpen, setDeleteConfirm }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ marginBottom: "12px" }}
    >
      <Card
        sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
          borderLeft: `6px solid ${getPriorityColor(task.priority)}`,
          transition: "0.3s",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 6,
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {task.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={1}>
            {task.description}
          </Typography>
          <Typography fontSize={14} fontWeight="bold">
            Priority:{" "}
            <span style={{ color: getPriorityColor(task.priority) }}>
              {task.priority}
            </span>
          </Typography>
          <Typography fontSize={14} fontWeight="bold">
            Status:{" "}
            <span style={{ color: getStatusColor(task.status) }}>
              {task.status}
            </span>
          </Typography>
          <Typography fontSize={14} fontWeight="bold">
            Date: {task.date.split("T")[0]}
          </Typography>

          <Box mt={2} display="flex" gap={2}>
            <Button
              variant="contained"
              sx={{
                background: "#1890ff",
                "&:hover": { background: "#40a9ff" },
              }}
              size="small"
              onClick={() => handleOpen(task)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              sx={{
                background: "#ff4d4f",
                "&:hover": { background: "#ff7875" },
              }}
              size="small"
              onClick={() => setDeleteConfirm(task.id)}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskCard;
