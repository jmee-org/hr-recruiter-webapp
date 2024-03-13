import React, { useState, useEffect } from "react";
import { getProgressDetails } from "../service/api";
import { Button, DatePicker, Space, Select } from "antd";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import ScheduledMeetingCard from "./ScheduledMeetingCard";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@mui/material";

interface ProgressDetails {
  status: string;
  feedback: string;
  scheduledMeeting: string;
  participants: string[];
}

const useStyles = makeStyles((theme) => ({
  progressDetailContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  statusSection: {
    marginBottom: "20px",
  },
  feedbackSection: {
    marginBottom: "20px",
  },
  meetingSection: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  meetingButton: {
    marginTop: "10px",
  },
  participantSelect: {
    width: "100%",
    marginTop: "10px",
  },
  meetingCard: {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
}));

const ProgressDetail = ({ progressId }) => {
  const classes = useStyles(); // Use the styles
  // const { progressId } = useParams();
  const [progressDetails, setProgressDetails] =
    useState<ProgressDetails | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );
  const mockParticipants = [
    "John Doe",
    "Jane Smith",
    "Bob Johnson",
    "Alice Williams",
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgressDetails = async () => {
      try {
        const details = await getProgressDetails(progressId);
        setProgressDetails(details);
      } catch (error) {
        console.error("Error fetching progress details:", error);
      }
    };

    fetchProgressDetails();
  }, [progressId]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Fake API call for scheduling the meeting
    console.log(
      "Scheduled meeting for:",
      selectedDate
        ? moment(selectedDate).format("YYYY-MM-DD HH:mm:ss")
        : "No date selected"
    );
    console.log("Selected participants:", selectedParticipants);
    setIsModalVisible(false);
  };

  const handleMeetingEdit = (editedDate, editedParticipants) => {
    // Perform API call or state update with edited information
    console.log("Edited meeting details:", editedDate, editedParticipants);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div>
        {progressDetails ? (
          <div>
            <h1>Progress Details</h1>

            <div className={classes.statusSection}>
              <p>Status: {progressDetails.status}</p>
            </div>

            <div className={classes.feedbackSection}>
              <p>Feedback: {progressDetails.feedback}</p>
            </div>

            {progressDetails.scheduledMeeting && (
              <div>
                <ScheduledMeetingCard
                  date={progressDetails.scheduledMeeting}
                  participants={progressDetails.participants}
                  onEdit={handleMeetingEdit}
                  allParticipants={mockParticipants}
                />
              </div>
            )}

            <div className={classes.meetingSection}>
              <Button onClick={showModal} className={classes.meetingButton}>
                Schedule Meeting
              </Button>

              <Dialog
                style={{ zIndex: 1000 }}
                open={isModalVisible}
                onClose={handleCancel}
              >
                <DialogContent>
                  <Space direction="vertical" size={12}>
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="Select date and time"
                      onChange={(date) =>
                        setSelectedDate(date ? date.valueOf() : null)
                      }
                    />
                    <Select
                      mode="multiple"
                      placeholder="Select participants"
                      value={selectedParticipants}
                      onChange={(values) =>
                        setSelectedParticipants(values as string[])
                      }
                      className={classes.participantSelect}
                    >
                      {mockParticipants.map((participant) => (
                        <Select.Option key={participant} value={participant}>
                          {participant}
                        </Select.Option>
                      ))}
                    </Select>
                  </Space>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default ProgressDetail;
