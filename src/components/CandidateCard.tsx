import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { Person, CheckCircle } from '@mui/icons-material';
import { Chip } from '@mui/material';
import {FlagCircle} from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  candidatesCard: {
    position: 'relative',
    border: '1px solid #e0e0e0',
    borderRadius: '10px', // Increased border-radius for a bit bigger card
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px', // Increased padding for a bit bigger card
    marginBottom: '20px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  candidateInfo: {
    marginTop: 'auto',
    textAlign: 'center',
  },
  candidateName: {
    fontWeight: 'bold',
    fontSize: '20px', // Increased font size for the name
    marginBottom: '10px', // Increased margin for the name
    color: '#333333',
  },
  progressStatus: {
    display: 'inline-block',
    padding: '10px',
    borderRadius: '5px',
    fontStyle: 'italic',
    fontSize: '16px',
    color: '#ffffff',
    background: 'green',
    marginTop: '10px',
  },
  userIcon: {
    fontSize: '50px', // Increased font size for the user icon
    color: '#333333',
    position: 'absolute',
    top: '-25px', // Adjusted to position the icon half inside and half outside
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#fff',
    borderRadius: '50%',
    padding: '10px', // Increased padding for the user icon
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
  },
}));

const CandidatesCard = ({ candidate }) => {
  const classes = useStyles();

  const { id, name, progressStatus } = candidate;

  return (
    <Link to={`/candidates/${id}`} className={classes.candidatesCard}>
      <Person className={classes.userIcon} />
      <div className={classes.candidateInfo}>
        <div className={classes.candidateName}>{name}</div>
        <Chip icon={<FlagCircle />} label={`Status: ${progressStatus}`} />
      </div>
    </Link>
  );
};

export default CandidatesCard;
