import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { getJobListings } from "../service/api";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";

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
}));

const Dashboard = () => {
  const classes = useStyles();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // const fetchJobs = async () => {
    //   const response = await getJobListings();
    //   setJobs(response);
    // };

    // For now, use the mock data
    const fetchJobs = async () => {
      await getJobListings().then((data: any) => setJobs(data));
    };

    fetchJobs();
  }, []);

  return (
    <div className={classes.dashboard}>
      <h1>Job Listings</h1>

      <div className={classes.jobList}>
        {jobs && jobs.map((job: any) => <JobCard key={job.id} job={job} />)}
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
