import React, { useState } from "react";
import { Card, Button, Modal, DatePicker, Space, Select } from "antd";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  editButton: {
    marginLeft: "10px",
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
      <Button type="primary" onClick={showModal} className={classes.editButton}>
        Edit
      </Button>
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
  return (
    <Card title="Scheduled Meeting">
      <p>Date: {date}</p>
      <p>Participants: {participants.join(", ")}</p>
      <EditMeetingModal
        date={date}
        participants={participants}
        onSave={onEdit}
        allParticipants={allParticipants}
      />
    </Card>
  );
};

export default ScheduledMeetingCard;
