/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import DashboardMenu from '../../containers/DashboardMenu';
import ProfileForm from '../../components/ProfileForm';
import UsersContainer from '../../containers/UsersContainer';
import EventForm from '../../components/EventForm';
import EventsContainer from '../../containers/EventsContainer';

const defaultDashboard = {
  Component: ProfileForm,
  arg: '',
  changed: true,
};

const dashboard = (state = defaultDashboard, action) => {
  switch (action.Component) {
    case 'DashboardMenu':
      console.log(action);
      return { ...state, Component: DashboardMenu };
    case 'ProfileForm':
      console.log(action);
      return { ...state, Component: ProfileForm };
    case 'UsersContainer':
      console.log(action);
      return { ...state, Component: UsersContainer };
    case 'EventForm':
      console.log(action);
      return { ...state, Component: EventForm };
    case 'EventsContainer':
      console.log(action);
      return { ...state, Component: EventsContainer };
    case 'EventsContainerAll':
      console.log(action);
      return { ...state, Component: EventsContainer, arg: 'All' };
    case 'EventsContainerMyEvents':
      console.log(action);
      return { ...state, Component: EventsContainer, arg: 'MyEvents' };
    case 'EventsContainerUpcoming':
      console.log(action);
      return { ...state, Component: EventsContainer, arg: 'Upcoming', changed: !state.changed };
    default:
      return state;
  }
};

export default dashboard;
