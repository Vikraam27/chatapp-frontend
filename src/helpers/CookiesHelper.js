class Cookies {
  static setCookiesAccessToken(name, value) {
    const date = new Date(+new Date() + 1800000);
    const expired = `; expires=${date.toUTCString()}`;
    document.cookie = `${name}=${(value || '')}${expired};path=/`;
  }

  static setCookiesRefreshToken(name, value) {
    document.cookie = `${name}=${(value || '')}`;
  }

  static getCookies(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  }

  static deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
}

export default Cookies;
