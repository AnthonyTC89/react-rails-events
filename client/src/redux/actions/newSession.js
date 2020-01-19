const NEW_SESSION = 'NEW_SESSION';
const newSession = (user) => (
  {
    type: NEW_SESSION,
    user,
  }
);

export default newSession;
