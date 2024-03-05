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
import { Delete } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  createJobContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  deleteButton: {
    color: "white",
    position: "absolute",
    top: "-23px",
    right: "-23px",
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
    console.log("created");
  };

  return (
    <div className={classes.createJobContainer}>
      <h1>Create New Job</h1>
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
      {steps.map((step, index) => (
        <div className={classes.stepCard}>
          <IconButton
            className={classes.deleteButton}
            onClick={() => handleDeleteStep(index)}
          >
            <Delete fontSize="small" />
          </IconButton>
          <Card key={index}>
            <CardContent>
              <InputLabel>{`Step Title`}</InputLabel>
              <Select
                variant="outlined"
                fullWidth
                value={step.title}
                onChange={(e) =>
                  handleStepChange(index, "title", e.target.value)
                }
                className={classes.formControl}
                inputProps={{
                  id: `step-${index + 1}-title`,
                }}
              >
                {stepOptions.map((option, optionIndex) => (
                  <MenuItem key={optionIndex} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                label={`Step Description`}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={step.description}
                onChange={(e) =>
                  handleStepChange(index, "description", e.target.value)
                }
              />
            </CardContent>
          </Card>
        </div>
      ))}
      <Button
        variant="contained"
        className={`${classes.addButton} ${classes.formControl}`}
        onClick={handleAddStep}
      >
        Add Step
      </Button>
      <Link to="/">
        <Button
          variant="contained"
          className={`${classes.saveButton} ${classes.formControl}`}
          onClick={handleCreateJob}
        >
          Save
        </Button>
      </Link>
    </div>
  );
};

export default CreateJob;
