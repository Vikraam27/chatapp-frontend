import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  useContext,
  useEffect, useState,
} from 'react';
import { useHistory } from 'react-router';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';
import SidebarNewChat from './SidebarNewChat';
import ChatAPI from '../api';
import Cookies from '../helpers/CookiesHelper';
import '../css/Sidebar.css';
import { userInfoContex } from '../pages/App';
import RandomColor from '../helpers/RandomColor';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [accessToken] = useState(Cookies.getCookies('accessToken'));
  const [refreshToken] = useState(Cookies.getCookies('refreshToken'));
  const [userInfo] = useContext(userInfoContex);
  const [chatRoom, setChatRoom] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    if (!Cookies.getCookies('refreshToken')) {
      history.push('/signin', 'Please log in');
    } else {
      const menuModal = document.querySelector('.sidebar__menu');
      const menuButton = document.querySelector('.menu__icon');
      const newChatButton = document.querySelector('.new__chat');
      const backButton = document.querySelector('.back');

      const req = await ChatAPI.FetchGetRoomChats(accessToken, refreshToken);

      setChatRoom(req.data.roomChat);

      if (showSidebar) {
        menuButton.addEventListener('click', () => {
          if (menuModal.style.visibility !== 'hidden') {
            menuModal.style.visibility = 'hidden';
          } else {
            menuModal.style.visibility = 'visible';
            newChatButton.addEventListener('click', () => {
              setShowSidebar(false);
            });
          }
        });
      } else if (!showSidebar) {
        if (backButton) {
          backButton.addEventListener('click', () => {
            setShowSidebar(true);
          });
        }
      }
    }
  }, [showSidebar]);
  return (
    <div className="sidebar">
      {showSidebar ? (
        <>
          <div className="sidebar__header">
            <Avatar
              alt="avatar"
              style={{
                backgroundColor: RandomColor(),
              }}
            >
              {' '}
              {userInfo.owner.substring(0, 1)}
              {' '}

            </Avatar>
            <div className="sidebar__headerRight">
              <IconButton>
                <DonutLargeIcon />
              </IconButton>
              <IconButton>
                <ChatIcon />
              </IconButton>
              <IconButton className="menu__icon">
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>
          <div className="sidebar__menu">
            <p className="new__chat">New Chat</p>
            <p>Log out</p>
          </div>
          <div className="sidebar__search">
            <div className="sidebar_searchContainer">
              <SearchIcon />
              <input placeholder="Search or start new chat" type="text" />
            </div>
          </div>
          <div className="sidebar__chats">
            {chatRoom.length ? chatRoom.map((room) => <SidebarChat key={room.id} room={room} />) : <p className="blank_chat_room">Create New Chat</p>}
          </div>

        </>
      ) : <SidebarNewChat />}
    </div>
  );
};

export default Sidebar;
