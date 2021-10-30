/* eslint-disable max-len */
import Cookies from '../helpers/CookiesHelper';

const baseUrl = process.env.REACT_APP_BASE_URL;

class ChatAPI {
  static async Signup({ username, password, fullname }) {
    try {
      const request = await fetch(`${baseUrl}/users`, {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
          fullname,
        }),
      });

      return request.json();
    } catch (error) {
      return error;
    }
  }

  static async Signin({ username, password }) {
    try {
      const request = await fetch(`${baseUrl}/authentications`, {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
      });

      return request.json();
    } catch (error) {
      return error;
    }
  }

  static async GetUserInfo(accessToken) {
    try {
      const request = await fetch(`${baseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return request.json();
    } catch (error) {
      return error;
    }
  }

  static async GenerateAccessToken(refreshToken) {
    const request = await fetch(`${baseUrl}/authentications`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        refreshToken,
      }),
    });

    return request.json();
  }

  static async GetUserByUsername(q, accessToken) {
    try {
      const request = await fetch(`${baseUrl}/username?q=${q}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return request.json();
    } catch (error) {
      return error;
    }
  }

  static async PostCreatRoomChat(username, participant, accessToken) {
    try {
      const request = await fetch(`${baseUrl}/room`, {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'POST',
        body: JSON.stringify({
          username,
          participant,
        }),
      });

      return request.json();
    } catch (error) {
      return error;
    }
  }

  static async GetRoomChats(accessToken) {
    try {
      const request = await fetch(`${baseUrl}/room`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return request.json();
    } catch (error) {
      return error;
    }
  }

  static async getRoomChatById(roomId, accessToken) {
    try {
      const request = await fetch(`${baseUrl}/room/${roomId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return request.json();
    } catch (error) {
      return error;
    }
  }

  static async postMessage(roomId, sender, message, accessToken) {
    try {
      const request = await fetch(`${baseUrl}/room/${roomId}/message`, {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'POST',
        body: JSON.stringify({
          sender,
          message,
        }),
      });

      return request.json();
    } catch (error) {
      return error;
    }
  }

  static async FetchUserInfo(accessToken, refreshToken) {
    try {
      const req = await this.GetUserInfo(accessToken);

      if (req.message === 'Token maximum age exceeded') {
        const newAccessToken = await this.GenerateAccessToken(refreshToken);
        if (newAccessToken.message === 'invalid refresh token') {
          throw new Error('invalid refresh token');
        }
        Cookies.setCookiesAccessToken('accessToken', newAccessToken.data.accessToken);
        const newRes = await this.GetUserInfo(newAccessToken.data.accessToken);
        return newRes;
      }
      return req;
    } catch (error) {
      return error;
    }
  }

  static async SearchUser(q, accessToken, refreshToken) {
    try {
      const req = await this.GetUserByUsername(q, accessToken);

      if (req.message === 'Token maximum age exceeded') {
        const newAccessToken = await this.GenerateAccessToken(refreshToken);
        if (newAccessToken.message === 'invalid refresh token') {
          throw new Error('invalid refresh token');
        }
        Cookies.setCookiesAccessToken('accessToken', newAccessToken.data.accessToken);
        const newRes = await this.GetUserByUsername(q, newAccessToken.data.accessToken);
        return newRes;
      }
      return req;
    } catch (error) {
      return error;
    }
  }

  static async CreateRoom(creator, participant, accessToken, refreshToken) {
    try {
      const req = await this.PostCreatRoomChat(creator, participant, accessToken);

      if (req.message === 'Token maximum age exceeded') {
        const newAccessToken = await this.GenerateAccessToken(refreshToken);
        if (newAccessToken.message === 'invalid refresh token') {
          throw new Error('invalid refresh token');
        }
        Cookies.setCookiesAccessToken('accessToken', newAccessToken.data.accessToken);
        const newRes = await this.PostCreatRoomChat(creator, participant, newAccessToken.data.accessToken);
        return newRes;
      }

      return req;
    } catch (error) {
      return error;
    }
  }

  static async FetchGetRoomChats(accessToken, refreshToken) {
    try {
      const req = await this.GetRoomChats(accessToken);

      if (req.message === 'Token maximum age exceeded') {
        const newAccessToken = await this.GenerateAccessToken(refreshToken);
        if (newAccessToken.message === 'invalid refresh token') {
          throw new Error('invalid refresh token');
        }
        Cookies.setCookiesAccessToken('accessToken', newAccessToken.data.accessToken);
        const newRes = await this.GetRoomChats(newAccessToken.data.accessToken);
        return newRes;
      }
      return req;
    } catch (error) {
      return error;
    }
  }

  static async FetchGetRoomChatById(roomId, accessToken, refreshToken) {
    try {
      const req = await this.getRoomChatById(roomId, accessToken);

      if (req.message === 'Token maximum age exceeded') {
        const newAccessToken = await this.GenerateAccessToken(refreshToken);
        if (newAccessToken.message === 'invalid refresh token') {
          throw new Error('invalid refresh token');
        }
        Cookies.setCookiesAccessToken('accessToken', newAccessToken.data.accessToken);
        const newRes = await this.getRoomChatById(roomId, newAccessToken.data.accessToken);
        return newRes;
      }
      return req;
    } catch (error) {
      return error;
    }
  }

  static async FetchPostMessage(roomId, sender, message, accessToken, refreshToken) {
    try {
      const req = await this.postMessage(roomId, sender, message, accessToken);

      if (req.message === 'Token maximum age exceeded') {
        const newAccessToken = await this.GenerateAccessToken(refreshToken);
        if (newAccessToken.message === 'invalid refresh token') {
          throw new Error('invalid refresh token');
        }
        Cookies.setCookiesAccessToken('accessToken', newAccessToken.data.accessToken);
        const newRes = await this.postMessage(roomId, sender, message, newAccessToken.data.accessToken);
        return newRes;
      }
      return req;
    } catch (error) {
      return error;
    }
  }
}

export default ChatAPI;
