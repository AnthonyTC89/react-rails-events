const defaultState = {
  currentUser: '',
  logged: false,
};

const reducerSession = (state = defaultState, action) => {
  switch (action.type) {
    case 'NEW_SESSION':
      return action.user;
    default:
      return state;
  }
};

export default reducerSession;