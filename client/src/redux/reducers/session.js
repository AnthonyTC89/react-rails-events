const defaultState = {
  user: {
    username: 'default',
    status: 0,
    isLoggedIn: false,
  },
};

const session = (state = defaultState, { type, user }) => {
  switch (type) {
    case 'LOGIN':
      return {
        username: user.username,
        status: user.status,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return defaultState;
    default:
      return state;
  }
};

export default session;
