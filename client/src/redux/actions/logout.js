const LOGOUT = 'LOGOUT';
const logout = (user) => (
  {
    type: LOGOUT,
    user,
  }
);

export default logout;
