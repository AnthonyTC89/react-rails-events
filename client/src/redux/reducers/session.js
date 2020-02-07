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
      return state;
    case 'LOGOUT':
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
