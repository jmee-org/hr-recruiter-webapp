import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobDetails } from "../service/api";
import CandidatesCard from "./CandidateCard";
import { Job } from "../interface/ICandidate";
import { makeStyles } from "@material-ui/styles";
import GroupIcon from "@mui/icons-material/Group";
import Chip from "@mui/material/Chip";

const useStyles = makeStyles((theme) => ({
  jobDetailContainer: {
    width: "100%",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    boxSizing: "border-box",
  },
  jobCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    marginBottom: "20px",
    boxSizing: "border-box",
  },
  jobTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333333",
    marginBottom: "10px",
  },
  jobStatus: {
    fontSize: "18px",
    color: "#e74c3c",
    marginBottom: "10px",
  },
  jobDescription: {
    fontSize: "16px",
    color: "#555555",
    marginBottom: "20px",
  },
  candidatesList: {
    listStyle: "none",
    padding: "0",
    paddingTop: "10px",
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
  },

  progressStatus: {
    fontSize: "16px",
    fontStyle: "italic",
    color: "#3498db",
  },
  jobBody: {
    background: "#ffffff",
    padding: "16px",
  },
  jobInfo: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
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
    paddingRight: "15px",
  },
  icon: {
    marginRight: "5px",
    fontSize: "1.0rem",
  },
}));

const JobDetail = () => {
  const classes = useStyles();
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      // For now, use the mock data
      await getJobDetails(jobId).then((data: any) => setJob(data));
    };

    fetchJobDetails();
  }, [jobId]);

  if (!job) {
    return <div>Loading...</div>;
  }

  const { title, description, status, candidates } = job;

  return (
    <div className={classes.jobDetailContainer}>
      <div className={classes.jobCard}>
        <h2 className={classes.jobTitle}>{title}</h2>

        <div className={classes.jobBody}>
          <div className={classes.jobInfo}>
            <p className={classes.candidateCount}>
              <GroupIcon className={classes.icon} />
              {candidates.length}
            </p>
            <Chip
              label={status}
              className={
                status === "Open" ? classes.badgeOpen : classes.badgeClosed
              }
            />
          </div>
        </div>

        <p className={classes.jobDescription}>{description}</p>
      </div>

      <h3>Candidates</h3>
      <ul className={classes.candidatesList}>
        {candidates.map((candidate) => (
          <CandidatesCard key={candidate.id} candidate={candidate} />
        ))}
      </ul>
    </div>
  );
};

export default JobDetail;
