// CreateJob.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Select, MenuItem, InputLabel, IconButton } from "@material-ui/core";
import { getStepOptions } from "../service/api";
import { Add, Delete } from "@mui/icons-material";
import { relative } from "path";
import { FormControl } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  jobCard: {
    border: "none",
    margin: "10px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",
    background: "#ffffff",
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
  jobBody: {
    background: "#ffffff",
    padding: "16px",
  },

  createJobContainer: {
    margin: "0 auto",
    padding: "20px",
  },
  deleteButton: {
    color: "white",
    position: "absolute",
    top: "-11px",
    right: "-11px",
    fontSize: "small",
    backgroundColor: "#ff0000",
  },

  formControl: {
    width: "100%",
    marginBottom: "20px",
  },
  addButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#218838",
    },
    width: "10px",
    heigth: "10px",
  },
  saveButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
  stepCard: {
    position: "relative",
    marginBottom: "20px",
    width: "400px",
  },
  stepsRow: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}));

const CreateJob = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState([{ title: "", description: "" }]);
  const [stepOptions, setStepOptions] = useState<string[]>([]);

  useEffect(() => {
    // Fetch step options when the component mounts
    const fetchStepOptions = async () => {
      try {
        const options = await getStepOptions();
        setStepOptions(options);
      } catch (error) {
        console.error("Error fetching step options:", error);
      }
    };

    fetchStepOptions();
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDeleteStep = (index: number) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleStepChange = (index: number, key: string, value: any) => {
    const updatedSteps = [...steps];
    updatedSteps[index][key] = value;
    setSteps(updatedSteps);
  };

  const handleAddStep = () => {
    setSteps([...steps, { title: "", description: "" }]);
  };

  const handleCreateJob = () => {
    console.log("created", steps);
  };

  return (
    <div className={classes.createJobContainer}>
      <div style={{ position: 'sticky', top: 0, background: '#f4f4f4', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
  <h1>Create New Job</h1>
  <div style={{ width: "25%", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
    <Link to="/">
      <Button
        variant="contained"
        className={`${classes.saveButton} ${classes.formControl}`}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Cancel
      </Button>
    </Link>
    <Link to="/">
      <Button
        variant="contained"
        className={`${classes.saveButton} ${classes.formControl}`}
        onClick={handleCreateJob}
        style={{ backgroundColor: "black", color: "white" }}
      >
        Save
      </Button>
    </Link>
</div>
</div>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        className={classes.formControl}
        value={title}
        onChange={handleTitleChange}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        className={classes.formControl}
        value={description}
        onChange={handleDescriptionChange}
      />
      <h2>Steps:</h2>
      <div className={classes.stepsRow}>
        {steps.map((step, index) => (
          <div style={{ position: "relative" }}>
            <IconButton
              className={classes.deleteButton}
              onClick={() => handleDeleteStep(index)}
            >
              <Delete fontSize="small" />
            </IconButton>
            <div className={classes.jobCard}>
              <div className={classes.jobHeader}></div>
              <div className={classes.jobBody}>
                <div className={classes.jobInfo}>
                  <FormControl fullWidth>
                    <InputLabel id={`step-${index + 1}-title-label`}>
                      Title
                    </InputLabel>
                    <Select
                      variant="outlined"
                      labelId={`step-${index + 1}-title-label`}
                      id={`step-${index + 1}-title`}
                      value={step.title}
                      onChange={(e) =>
                        handleStepChange(index, "title", e.target.value)
                      }
                      label="Title"
                    >
                      {stepOptions.map((option, optionIndex) => (
                        <MenuItem key={optionIndex} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                    <div style={{ margin: "8px 0" }}></div>
                    <InputLabel id={`step-${index + 1}-Description-label`}>
                      Description
                    </InputLabel>
                    <TextField
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      value={step.description}
                      onChange={(e) =>
                        handleStepChange(index, "description", e.target.value)
                      }
                    />
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div
          onClick={handleAddStep}
          className={classes.jobCard}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <div
            className={classes.jobBody}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <p>Add a new step</p>
            <IconButton style={{ width: "10px", height: "10px" }}>
              <Add />
            </IconButton>
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        
      </div>
    </div>
  );
};

export default CreateJob;
