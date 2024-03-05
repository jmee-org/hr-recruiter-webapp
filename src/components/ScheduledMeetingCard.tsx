import React, { useState } from "react";
import { Card, Button, Modal, DatePicker, Space, Select, Avatar, Badge } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import { Create, Event, Group } from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  createButton: {
    marginLeft: "10px",
    color: "black"
  },
  editIcon: {
    marginRight: "5px",
    fontSize: "1.0rem",
  },
  cardTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const EditMeetingModal = ({ date, participants, onSave, allParticipants }) => {
  const classes = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedDate, setEditedDate] = useState(date);
  const [editedParticipants, setEditedParticipants] = useState([
    ...participants,
  ]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onSave(editedDate, editedParticipants);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <IconButton className={classes.createButton} onClick={showModal}>
        <Create fontSize="small" />
      </IconButton>

      <Modal
        title="Edit Meeting"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space direction="vertical" size={12}>
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Select date and time"
            onChange={(date) => setEditedDate(date ? date.valueOf() : null)}
          />
          <Select
            mode="multiple"
            placeholder="Select participants"
            value={editedParticipants}
            onChange={(values) => setEditedParticipants(values as string[])}
          >
            {allParticipants.map((participant) => (
              <Select.Option key={participant} value={participant}>
                {participant}
              </Select.Option>
            ))}
          </Select>
        </Space>
      </Modal>
    </>
  );
};

const ScheduledMeetingCard = ({
  date,
  participants,
  onEdit,
  allParticipants,
}) => {
  const classes = useStyles();
  
  return (
    <Card
      title={
        <div className={classes.cardTitle}>
          Scheduled Meeting
          <EditMeetingModal
            date={date}
            participants={participants}
            onSave={onEdit}
            allParticipants={allParticipants}
          />
        </div>
      }
    >
      <div >
      <Chip
        icon={<Event />}
        label={`Date: ${date}`}
        style={{ marginBottom: '8px' }}
      />
      <Chip
        icon={<Group />}
        label={`Participants: ${participants.join(', ')}`}
        variant="outlined"
        style={{ marginBottom: '8px' }}
      />
      </div>
    </Card>
  );
};

export default ScheduledMeetingCard;
