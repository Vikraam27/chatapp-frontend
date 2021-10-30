/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useContext, useEffect, useState } from 'react';
import ChatAPI from '../api';
import Cookies from '../helpers/CookiesHelper';
import RandomColor from '../helpers/RandomColor';
import { userInfoContex } from '../pages/App';

const { Avatar } = require('@material-ui/core');

const SidebarUser = ({ username: participant }) => {
  const [userInfo, setUserInfo] = useContext(userInfoContex);
  const [accessToken] = useState(Cookies.getCookies('accessToken'));
  const [refreshToken] = useState(Cookies.getCookies('refreshToken'));

  const handleClick = async () => {
    setUserInfo((prevState) => ({
      ...prevState,
      participant,
    }));
    const { owner } = userInfo;
    const req = await ChatAPI.CreateRoom(owner, participant, accessToken, refreshToken);
    setUserInfo((prevState) => ({
      ...prevState,
      roomChat: {
        roomId: req.data.roomId,
      },
      showChat: true,
      showSideBar: false,
    }));
  };

  useEffect(async () => {
  }, [userInfo.participant, userInfo.roomChat.roomId]);

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
      </div>
    </div>
  );
};

export default SidebarUser;
