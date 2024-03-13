import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { CheckCircle, Close } from "@mui/icons-material";
import {
  Tooltip,
  Dialog,
  DialogContent,
} from "@mui/material";
import ProgressDetail from "./ProgressDetail"; // Import your existing ProgressDetail component

const useStyles = makeStyles((theme) => ({
  progressCard: {
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
  progressHeader: {
    background: "linear-gradient(to right, #333333, #666666)",
    color: "#ffffff",
    padding: "16px",
    borderRadius: "10px 10px 0 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressTitle: {
    margin: 0,
    fontSize: "1.6rem",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  progressBody: {
    background: "#ffffff",
    padding: "16px",
  },
  progressInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressStatus: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    cursor: "pointer", // Add cursor pointer for indicating it's clickable
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
}));

const ProgressCard = ({ stepName, status, feedback, progressId }) => {
  const classes = useStyles();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <div className={classes.progressCard} onClick={handlePopupOpen}>
        <div className={classes.progressHeader}>
          <h2 className={classes.progressTitle}>{stepName}</h2>
        </div>
        <div className={classes.progressBody}>
          <div className={classes.progressInfo}>
            {/* Wrap the status with a Tooltip for an additional UI hint */}
            <Tooltip title="Click to view details" arrow>
              <p className={classes.progressStatus}>
                <CheckCircle fontSize="inherit" />
                {status}
              </p>
            </Tooltip>
          </div>
          <div className={classes.detailsSection}>
            <h4 className={classes.detailsHeader}>Feedback</h4>
            <p className={classes.detailsDescription}>{feedback}</p>
          </div>
        </div>
      </div>
      <Dialog open={isPopupOpen} onClose={handlePopupClose} style={{ zIndex: 900 }}>
        <DialogContent>
          <ProgressDetail progressId={progressId}/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProgressCard;
