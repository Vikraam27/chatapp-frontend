/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
import socket from 'socket.io-client';
import { useContext, useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import { userInfoContex } from '../pages/App';
import ChatAPI from '../api';
import Cookies from '../helpers/CookiesHelper';
import '../css/Chat.css';

const Chat = () => {
  const [userInfo, setUserInfo] = useContext(userInfoContex);
  const [accessToken] = useState(Cookies.getCookies('accessToken'));
  const [refreshToken] = useState(Cookies.getCookies('refreshToken'));
  const [value, setValue] = useState('');
  const [messages, setMessage] = useState([]);
  const { roomId } = userInfo.roomChat;
  const { owner, showChat } = userInfo;
  const io = socket.connect('http://localhost:5000', { transports: ['websocket'] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value) {
      const res = await ChatAPI.FetchPostMessage(roomId, owner, value, accessToken, refreshToken);
      const { sender, message, timestamp } = res.data;
      if (res.status === 'success') {
        setMessage([...messages, res.data]);
      }
      io.emit('chatMsg', {
        roomId,
        sender,
        message,
        timestamp,
      });

      setValue('');
    }
  };
  const hideChat = () => {
    setUserInfo((prevState) => ({
      ...prevState,
      participant: '',
      roomChat: {
        roomId: '',
        creator: '',
        participantUsername: '',
      },
      showChat: false,
      showSideBar: true,
    }));
  };

  useEffect(() => {
    io.on('connect', () => {
      console.log('socket connceted');
    });
    io.emit('joinRoom', { roomId });
    io.on('msg', (msg) => {
      setMessage([...messages, msg]);
    });

    return (() => {
      io.disconnect();
    });
  }, [roomId]);

  useEffect(async () => {
    const roomData = await ChatAPI.FetchGetRoomChatById(userInfo.roomChat.roomId, accessToken, refreshToken);
    setMessage(roomData.data.roomData.messages);
    setTimeout(() => {
      const bodyChat = document.querySelector('.chat__body');
      bodyChat.scrollTop = bodyChat.scrollHeight;
    }, 0);
  }, [roomId, messages.length, showChat]);
  return (
    <div className="chat">
      <div className="chat__header">
        {showChat ? (
          <IconButton onClick={hideChat}>
            <ArrowBackIosIcon style={{ color: 'white' }} />
          </IconButton>
        ) : null}
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{showChat && userInfo.participant.length > 10 ? `${userInfo.participant.substring(0, 5)}...` : userInfo.participant}</h3>
          <p>Last seen...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message, i) => (
          <p key={i} className={`chat__message ${message.sender === owner ? 'chat__reciver' : null}`}>
            <span className="chat__name">{message.sender}</span>
            {message.message}
            <span className="chat__timestamp">{`${new Date(message.timestamp).getHours()}-${new Date(message.timestamp).getMinutes()}`}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Type a message"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <IconButton>
            {value ? <SendIcon /> : <MicIcon />}
          </IconButton>
        </form>
      </div>
    </div>
  );
};

export default Chat;
