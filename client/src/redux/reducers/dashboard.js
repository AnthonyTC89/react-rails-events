/* eslint-disable no-unused-vars */
import ProfileForm from '../../components/ProfileForm';
import UsersContainer from '../../containers/UsersContainer';
import EventForm from '../../components/EventForm';
import AllEventsContainer from '../../containers/AllEventsContainer';
import MyEventsContainer from '../../containers/MyEventsContainer';
import UpcomingEventsContainer from '../../containers/UpcomingEventsContainer';
import EventUpdateForm from '../../components/EventUpdateForm';
import EventInfo from '../../components/EventInfo';

const defaultDashboard = {
  Component: {
    NameComponent: UpcomingEventsContainer,
    arg: null,
  },
};

const changeDashboard = ({ name, arg }) => {
  switch (name) {
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
      return { Component: { NameComponent: EventUpdateForm, arg } };
    case 'EventInfo':
      return { Component: { NameComponent: EventInfo, arg } };
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
