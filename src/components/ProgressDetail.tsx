import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProgressDetails } from '../service/api';
import { Button, Modal, DatePicker, Space, Select, Card } from 'antd';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import ScheduledMeetingCard from './ScheduledMeetingCard';

interface ProgressDetails {
  status: string;
  feedback: string;
  scheduledMeeting: string;
  participants: string[];
}

const useStyles = makeStyles((theme) => ({
  progressDetailContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  statusSection: {
    marginBottom: '20px',
  },
  feedbackSection: {
    marginBottom: '20px',
  },
  meetingSection: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  meetingButton: {
    marginTop: '10px',
  },
  participantSelect: {
    width: '100%',
    marginTop: '10px',
  },
  meetingCard: {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
}));


const ProgressDetail = () => {
  const classes = useStyles(); // Use the styles

  const { progressId } = useParams();
  const [progressDetails, setProgressDetails] = useState<ProgressDetails | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const mockParticipants = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams'];

  useEffect(() => {
    const fetchProgressDetails = async () => {
      try {
        const details = await getProgressDetails(progressId);
        setProgressDetails(details);
      } catch (error) {
        console.error('Error fetching progress details:', error);
      }
    };

    fetchProgressDetails();
  }, [progressId]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Fake API call for scheduling the meeting
    console.log('Scheduled meeting for:', selectedDate ? moment(selectedDate).format('YYYY-MM-DD HH:mm:ss') : 'No date selected');
    console.log('Selected participants:', selectedParticipants);
    setIsModalVisible(false);
  };

  const handleMeetingEdit = (editedDate, editedParticipants) => {
    // Perform API call or state update with edited information
    console.log('Edited meeting details:', editedDate, editedParticipants);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={classes.progressDetailContainer}>
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
            <div className={classes.meetingCard}>
              <ScheduledMeetingCard
                date={progressDetails.scheduledMeeting}
                participants={progressDetails.participants}
                onEdit={handleMeetingEdit}
                allParticipants={mockParticipants}
              />
            </div>
          )}

          <div className={classes.meetingSection}>
            <Button type="primary" onClick={showModal} className={classes.meetingButton}>
              Schedule Meeting
            </Button>

            <Modal title="Schedule Meeting" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <Space direction="vertical" size={12}>
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="Select date and time"
                  onChange={(date) => setSelectedDate(date ? date.valueOf() : null)}
                />
                <Select
                  mode="multiple"
                  placeholder="Select participants"
                  value={selectedParticipants}
                  onChange={(values) => setSelectedParticipants(values as string[])}
                  className={classes.participantSelect}
                >
                  {mockParticipants.map((participant) => (
                    <Select.Option key={participant} value={participant}>
                      {participant}
                    </Select.Option>
                  ))}
                </Select>
              </Space>
            </Modal>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProgressDetail;
