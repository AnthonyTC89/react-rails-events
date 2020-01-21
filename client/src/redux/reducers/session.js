const defaultState = {
  user: {
    id: 0,
    username: 'default',
    status: 0,
    auth_token: '',
  },
  isLoggedIn: false,
};

const session = (state = defaultState, { type, user }) => {
  switch (type) {
    case 'LOGIN':
      return {
        user,
        isLoggedIn: true,
      };
    case 'LOGIN_STATUS':
      console.log('cheking status!!!');
      // axios.get('api/v1/logged_in', { withCredentials: true })
      //   .then((response) => {
      //     console.log('LOGIN_STATUS: ', response);
      //     console.log('STATE: ', state);
      //   })
      //   .catch((error) => console.log('api errors:', error));
      return state;
    case 'LOGOUT':
      // axios.delete('api/v1/logout', { user }, { withCredentials: true })
      //   .then((response) => {
      //     console.log('LOGOUT: ', response);
      //     return defaultState;
      //   })
      //   .catch((error) => console.log('api errors:', error));
      return defaultState;
    default:
      return defaultState;
  }
};

export default session;
