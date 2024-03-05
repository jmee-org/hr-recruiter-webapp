import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getJobDetails } from "../service/api";
import { makeStyles } from "@material-ui/styles";
import GroupIcon from "@mui/icons-material/Group";
const useStyles = makeStyles((theme) => ({
  jobCard: {
    border: "none",
    margin: "10px",
    borderRadius: "10px",
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  jobHeader: {
    background: "linear-gradient(to right, #333333, #666666)",
    color: "#ffffff",
    padding: "16px",
    borderRadius: "10px 10px 0 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobTitle: {
    margin: 0,
    fontSize: "1.6rem",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  jobStatus: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  jobBody: {
    background: "#ffffff",
    padding: "16px",
  },
  detailsSection: {
    borderTop: "1px solid #ddd",
    paddingTop: "10px",
    marginTop: "10px",
  },
  detailsHeader: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  detailsDescription: {
    fontSize: "1.1rem",
    color: "#555",
    lineHeight: "1.4",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  statusBadge: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: "12px",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "0.7rem",
  },
  // Define different badge colors based on job status
  badgeOpen: {
    backgroundColor: "#4CAF50", // Green for 'Open' status
    color: "#fff",
  },
  badgeClosed: {
    backgroundColor: "#F44336", // Red for 'Closed' status
    color: "#fff",
  },
  candidateCount: {
    display: "flex",
    alignItems: "center",
    color: "#555",
    fontSize: "1rem",
  },
  icon: {
    marginRight: "5px",
    fontSize: "1.0rem",
  },
}));

const JobCard = ({ job }) => {
  const classes = useStyles();

  const { id, title, status, candidateCount } = job;
  const [jobDetails, setJobDetails] = useState({ description: "" });

  const handleClick = async () => {
    try {
      // const details = await getJobDetails(id);

      // For now, use the mock data
      await getJobDetails(id).then((data: any) => setJobDetails(data));
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  return (
    <Link to={`/jobs/${id}`} onClick={handleClick} className={classes.link}>
      <div className={classes.jobCard}>
        <div className={classes.jobHeader}>
          <h2 className={classes.jobTitle}>{title}</h2>
        </div>
        <div className={classes.jobBody}>
          <div className={classes.jobInfo}>
            <p className={classes.candidateCount}>
              <GroupIcon className={classes.icon} />
              {candidateCount}
            </p>
            <p
              className={`${classes.statusBadge} ${
                status === "Open" ? classes.badgeOpen : classes.badgeClosed
              }`}
            >
              {status}
            </p>
          </div>
          {jobDetails && (
            <div className={classes.detailsSection}>
              <h4 className={classes.detailsHeader}>Detailed Information</h4>
              <p className={classes.detailsDescription}>
                Description: {jobDetails.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
