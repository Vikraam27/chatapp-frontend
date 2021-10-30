/* eslint-disable max-len */
import { useEffect, useState, createContext } from 'react';
import { useHistory } from 'react-router';
import ChatAPI from '../api';
import Chat from '../component/Chat';
import EmptyChat from '../component/EmptyChat';
// eslint-disable-next-line import/no-cycle
import Sidebar from '../component/Sidebar';
import '../css/App.css';
import Cookies from '../helpers/CookiesHelper';

export const userInfoContex = createContext();

export default function App() {
  const [accessToken] = useState(Cookies.getCookies('accessToken'));
  const [refreshToken] = useState(Cookies.getCookies('refreshToken'));
  const [width] = useState(window.innerWidth);
  const [userInfo, setUserInfo] = useState({
    owner: '',
    participant: '',
    roomChat: {
      roomId: '',
      creator: '',
      participantUsername: '',
    },
    showChat: false,
    showSideBar: true,
  });
  const history = useHistory();

  const protectedRoute = (refreshCookie) => {
    if (!refreshCookie) {
      history.push('/signin', 'Please log in');
    }
  };

  const handleLogout = () => {
    Cookies.deleteCookie('accessToken');
    Cookies.deleteCookie('refreshToken');
    history.push('/signin', 'Invalid Credential');
  };

  useEffect(async () => {
    protectedRoute(accessToken, refreshToken);
    const req = await ChatAPI.FetchUserInfo(accessToken, refreshToken);
    if (req.data) {
      setUserInfo((prevState) => ({
        ...prevState,
        owner: req.data.userData.username,
      }));
    }
    if (req.message === 'invalid refresh token') {
      handleLogout();
    }
    console.log(userInfo);
  }, [accessToken, userInfo.owner, width]);
  return (
    <userInfoContex.Provider value={[userInfo, setUserInfo]}>
      <div className="app">
        <div className="app__body">
          { width > 767 ? <Sidebar />
            : [userInfo.showSideBar ? <Sidebar />
              : [width < 767 && userInfo.showSideBar ? <Sidebar /> : null]] }
          { width > 767 && !userInfo.roomChat.roomId ? <EmptyChat />
            : [userInfo.roomChat.roomId && width > 767 ? <Chat />
              : [userInfo.roomChat.roomId && userInfo.showChat && width < 767 ? <Chat /> : null]]}
        </div>
      </div>
    </userInfoContex.Provider>
  );
}
// userInfo.showSideBar
// jika widht > 767 && !userInfo.roomChat.roomId ? <EmptyChat /> : userInfo.roomChat.roomId && widht > 767 ? <Chat /> : null

// userInfo.roomChat.roomId ? <Chat /> : <EmptyChat />
