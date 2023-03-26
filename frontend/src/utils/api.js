export let common = {
  // baseUrl: `http://localhost:3001`,
  baseUrl: `http://localhost:3001/api`,
  header: {
    headers: { authorization: localStorage.getItem("userToken") },
  },
  isLogin: localStorage.getItem("userToken"),
};
