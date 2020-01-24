/* eslint-disable no-unused-vars */
import DashboardMenu from '../../containers/DashboardMenu';
import ProfileForm from '../../components/ProfileForm';
import UsersContainer from '../../containers/UsersContainer';
import EventForm from '../../components/EventForm';
import AllEventsContainer from '../../containers/AllEventsContainer';
import MyEventsContainer from '../../containers/MyEventsContainer';
import UpcomingEventsContainer from '../../containers/UpcomingEventsContainer';
import EventUpdateForm from '../../components/EventUpdateForm';
import updateDashboard from '../actions/updateDashboard';

const defaultDashboard = {
  Component: {
    NameComponent: ProfileForm,
    arg: null,
  },
};

const changeDashboard = (Component) => {
  switch (Component.name) {
    case 'DashboardMenu':
      return { Component: { NameComponent: DashboardMenu } };
    case 'ProfileForm':
      return { Component: { NameComponent: ProfileForm } };
    case 'UsersContainer':
      return { Component: { NameComponent: UsersContainer } };
    case 'EventForm':
      return { Component: { NameComponent: EventForm } };
    case 'AllEventsContainer':
      return { Component: { NameComponent: AllEventsContainer } };
    case 'MyEventsContainer':
      return { Component: { NameComponent: MyEventsContainer } };
    case 'UpcomingEventsContainer':
      return { Component: { NameComponent: UpcomingEventsContainer } };
    case 'EventUpdateForm':
      return { Component: { NameComponent: EventUpdateForm, arg: Component.arg } };
    default:
      return defaultDashboard;
  }
};


const dashboard = (state = defaultDashboard, { type, Component }) => {
  switch (type) {
    case 'UPDATE_DASHBOARD':
      return changeDashboard(Component);
    default:
      return state;
  }
};

export default dashboard;
