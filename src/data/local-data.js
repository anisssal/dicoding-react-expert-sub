const localData = (() => {
  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  return {
    putAccessToken,
    getAccessToken,
  };
})();

export default localData;
