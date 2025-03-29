import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import {
  Container,
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import TaskList from "./Components/TaskList";
import TaskModal from "./Components/TaskModal";
import { motion } from "framer-motion";

const App = () => {
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filters, setFilters] = useState({ status: "all", priority: "all" });

  const handleOpen = (task = null) => {
    setEditTask(task);
    setOpen(true);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <Container>
        {/* Header Section with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            color="primary"
            sx={{ mb: 2 }}
          >
            Task Manager
          </Typography>
        </motion.div>

        {/* Filter & Create Task Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            p={2}
            borderRadius={2}
            boxShadow={3}
            sx={{
              backgroundColor: "#f5f5f5",
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => handleOpen()}
              sx={{
                fontWeight: "bold",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "primary.dark",
                  transform: "scale(1.05)",
                },
              }}
            >
              + Create Task
            </Button>

            {/* Filters */}
            <Box display="flex" gap={2} mt={2}>
              <Select
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, status: e.target.value }))
                }
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="InProgress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>

              <Select
                value={filters.priority}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, priority: e.target.value }))
                }
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="all">All Priorities</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </Box>
          </Box>
        </motion.div>

        {/* Task List with Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <TaskList filters={filters} handleOpen={handleOpen} />
        </motion.div>

        {/* Modal for Create/Edit */}
        {open && (
          <TaskModal open={open} setOpen={setOpen} editTask={editTask} />
        )}
      </Container>
    </div>
  );
};

export default App;
