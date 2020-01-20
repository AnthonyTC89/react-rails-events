const LOGIN = 'LOGIN';
const login = (user) => (
  {
    type: LOGIN,
    user,
  }
);

export default login;
