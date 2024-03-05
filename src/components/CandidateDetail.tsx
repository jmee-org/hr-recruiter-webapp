import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProgressCard from "./ProgressCard";
import { getCandidateProgress } from "../service/api";
import { ProgressStep } from "../interface/ICandidate";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  candidateDetail: {
    padding: theme.spacing(2),
  },
  heading: {
    marginBottom: theme.spacing(1),
  },
  paragraph: {
    marginBottom: theme.spacing(1),
  },
  progressContainer: {
    display: "flex",
    alignItems: "center", // Align items in the center vertically
    gap: theme.spacing(3), // Adjust the spacing between ProgressCards
    flexWrap: "wrap",
  },
  arrow: {
    margin: theme.spacing(0, 1),
  },
}));

const CandidateDetail = () => {
  const classes = useStyles();
  const { candidateId } = useParams();
  const [progress, setProgress] = useState<ProgressStep[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const progressResponse = await getCandidateProgress(candidateId);
        setProgress(progressResponse);
      } catch (error) {
        console.error("Error fetching candidate progress:", error);
        // Handle the error as needed (e.g., show an error message)
      }
    };

    fetchProgress();
  }, [candidateId]);

  return (
    <div className={classes.candidateDetail}>
           <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIos />
      </IconButton>
      <h2 className={classes.heading}>Candidate Details</h2>
      <p className={classes.paragraph}>Candidate ID: {candidateId}</p>

      <h3 className={classes.heading}>Progress Steps</h3>
      <div className={classes.progressContainer}>
        {progress.map((step, index) => (
          <Fragment key={index}>
            <ProgressCard
              stepName={step.stepName}
              status={step.status}
              feedback={step.feedback}
              progressId={step.progressId}
            />
            {index < progress.length - 1 && (
            <svg height="20" width="90" className={classes.arrow}>
            <circle cx="5" cy="10" r="5" fill="#555" />
            <line
              x1="10"
              y1="10"
              x2="90"
              y2="10"
              style={{ stroke: "#555", strokeWidth: 2 }}
            />
            <circle cx="85" cy="10" r="5" fill="#555" />
          </svg>
        )}

          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default CandidateDetail;
