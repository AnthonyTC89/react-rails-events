const defaultSession = {
  user: {
    id: 0,
    username: 'default',
    status: 0,
    auth_token: '',
  },
  isLoggedIn: false,
};

const session = (state = defaultSession, { type, user }) => {
  switch (type) {
    case 'LOGIN':
      return {
        user,
        isLoggedIn: true,
      };
    case 'LOGIN_STATUS':
      // axios.get('api/v1/logged_in', { withCredentials: true })
      //   .then((response) => {
      //     console.log('LOGIN_STATUS: ', response);
      //     console.log('STATE: ', state);
      //   })
      //   .catch((error) => console.log('api errors:', error));
      return state;
    case 'LOGOUT':
      // axios.delete('api/v1/logout', { user }, { withCredentials: true })
      // .then((response) => {
      //   console.log('LOGOUT: ', response);
      //   return defaultState;
      // })
      // .catch((error) => console.log('api errors:', error));
      return defaultSession;
    case 'UPDATE':
      return {
        user,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};

export default session;
