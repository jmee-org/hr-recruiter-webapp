import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { getJobListings, getJobStatusOptions } from "../service/api";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { IconButton, InputAdornment, MenuItem, Select } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Job } from "../interface/ICandidate";
const useStyles = makeStyles((theme) => ({
  dashboard: {
    padding: "20px",
  },
  jobList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex",
    marginTop: "20px",
  },
  createJobButton: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "272px",
    height: "232px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    margin: "10px",
    textDecoration: "none",
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  addIcon: {
    fontSize: "2rem",
    marginLeft: "5px",
  },
  addButtonLabel: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: "10px 0",
  },
  filterSelect: {
    marginLeft: "10px", // Adjust the left margin as needed
    borderRadius: "5px",
    backgroundColor: "#fff",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height:"40px"
  },

  filterIcon: {
    fontSize: "1.2rem",
    marginRight: "8px",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [jobs, setJobs] = useState([]);
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchJobData = async () => {
      await Promise.all([
        getJobListings().then((data: any) => setJobs(data)),
        getJobStatusOptions().then((options: string[]) =>
          setStatusOptions(options)
        ),
      ]);
    };

    fetchJobData();
  }, []);

  const filterJobsByStatus = () => {
    if (statusFilter === "All") {
      return jobs;
    } else {
      return jobs.filter((job: Job) => job.status === statusFilter);
    }
  };

  return (
    <div className={classes.dashboard}>
      <div style={{ display: "flex", justifyContent:"space-between", alignItems:"center"}}>
        <h1>Job Listings</h1>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          variant="standard"
          className={classes.filterSelect}
          startAdornment={
            <InputAdornment position="start">
              <FilterAltIcon className={classes.filterIcon} />
            </InputAdornment>
          }
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className={classes.jobList}>
        {filterJobsByStatus().map((job: any) => (
          <JobCard key={job.id} job={job} />
        ))}
        <Link to="/create-job">
          <div className={classes.createJobButton}>
            <p>Add a new position</p>
            <IconButton>
              <Add className={classes.addIcon} />
            </IconButton>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
