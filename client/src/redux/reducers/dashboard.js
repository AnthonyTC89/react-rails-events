/* eslint-disable no-unused-vars */
import DashboardMenu from '../../containers/DashboardMenu';
import ProfileForm from '../../components/ProfileForm';
import UsersContainer from '../../containers/UsersContainer';
import EventForm from '../../components/EventForm';
import EventsContainer from '../../containers/EventsContainer';

const defaultDashboard = {
  Component: EventsContainer,
  arg: 'All',
};

const dashboard = (state = defaultDashboard, action) => {
  switch (action.Component) {
    case 'DashboardMenu':
      return { Component: DashboardMenu };
    case 'ProfileForm':
      return { Component: ProfileForm };
    case 'UsersContainer':
      return { Component: UsersContainer };
    case 'EventForm':
      return { Component: EventForm };
    case 'EventsContainer':
      return { Component: EventsContainer };
    case 'EventsContainerAll':
      return { Component: EventsContainer, arg: 'All' };
    default:
      return state;
  }
};

export default dashboard;
