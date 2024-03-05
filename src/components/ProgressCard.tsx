import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CheckCircle } from '@mui/icons-material';

const useStyles = makeStyles({
  progressCard: {
    border: 'none',
    margin: '10px',
    borderRadius: '10px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    height: '325px',
    display:"flex",
    flexDirection: "column",
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    backgroundColor: "white"
  },
  progressHeader: {
    background: 'linear-gradient(to right, #333333, #666666)',
    color: '#ffffff',
    padding: '16px',
    borderRadius: '10px 10px 0 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressTitle: {
    margin: 0,
    fontSize: '1.6rem',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  progressStatus: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  progressBody: {
    background: '#ffffff',
    padding: '16px',
  },
  detailsSection: {
    borderTop: '1px solid #ddd',
    paddingTop: '10px',
    marginTop: '10px',
  },
  detailsHeader: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  detailsDescription: {
    fontSize: '1.1rem',
    color: '#555',
    lineHeight: '1.4',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  
});

const ProgressCard = ({ stepName, status, feedback, progressId }) => {
  const classes = useStyles();

  return (
    <Link to={`/progress/${progressId}`} className={classes.link}>
      <div className={classes.progressCard}>
        <div className={classes.progressHeader}>
          <h2 className={classes.progressTitle}>{stepName}</h2>
        </div>
        <div className={classes.progressBody}>
          <div className={classes.progressInfo}>
            <p className={classes.progressStatus}>
              <CheckCircle fontSize="inherit" />
              {status}
            </p>
          </div>
          <div className={classes.detailsSection}>
            <h4 className={classes.detailsHeader}>Feedback</h4>
            <p className={classes.detailsDescription}>{feedback}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProgressCard;
