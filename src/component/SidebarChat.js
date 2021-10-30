/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Avatar } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import RandomColor from '../helpers/RandomColor';
import { userInfoContex } from '../pages/App';

const SidebarChat = ({ room }) => {
  const [userInfo, setUserInfo] = useContext(userInfoContex);
  const [participant, setParticipant] = useState('');

  const handleClick = () => {
    setUserInfo((prevState) => ({
      ...prevState,
      participant,
      roomChat: {
        roomId: room.id,
        creator: room.creator,
        participantUsername: room.participant_username,
      },
      showChat: true,
      showSideBar: false,
    }));
  };
  useEffect(() => {
    if (!participant) {
      if (userInfo.owner === room.creator) {
        setParticipant(room.participant_username);
      } else if (userInfo.owner === room.participant_username) {
        setParticipant(room.creator);
      }
    }
  }, [userInfo]);

  return (
    <div className="sidebarChat" onClick={handleClick}>
      <Avatar
        alt="avatar"
        style={{
          backgroundColor: RandomColor(),
        }}
      >
        {' '}
        {participant.substring(0, 1)}
        {' '}

      </Avatar>
      <div className="sidebarChat__info">
        <h2>{participant}</h2>
        <p>This is the last message</p>
      </div>
    </div>
  );
};

export default SidebarChat;
