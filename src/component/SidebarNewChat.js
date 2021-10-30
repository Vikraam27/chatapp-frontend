/* eslint-disable max-len */
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../css/SidebarNewChat.css';
import { IconButton } from '@material-ui/core';
import { useEffect, useState } from 'react';
import ChatAPI from '../api';
import Cookies from '../helpers/CookiesHelper';
import SidebarUser from './SidebarUser';

const SidebarNewChat = () => {
  const [accessToken] = useState(Cookies.getCookies('accessToken'));
  const [refreshToken] = useState(Cookies.getCookies('refreshToken'));
  const [usernameRes, SetUsernameRes] = useState([]);

  const searchHandler = async (e) => {
    if (e.key === 'Enter') {
      const req = await ChatAPI.SearchUser(e.target.value, accessToken, refreshToken);
      SetUsernameRes(req.data.users);
    }
  };

  useEffect(() => {
  }, [usernameRes]);

  return (
    <>
      <div className="sidebar__header_newchat">
        <IconButton className="back">
          <ArrowBackIcon />
        </IconButton>
        <div className="sidebar__header__right">
          <div className="sidebar_search__username__container">
            <input placeholder="Search user By username" type="text" onKeyPress={searchHandler} />
          </div>
        </div>
      </div>

      <div className="sidebar__chats">
        {usernameRes.length ? usernameRes.map(({ username }) => <SidebarUser key={username} username={username} />) : null}
      </div>
    </>
  );
};

export default SidebarNewChat;
