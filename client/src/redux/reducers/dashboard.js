/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import DashboardMenu from '../../containers/DashboardMenu';
import ProfileForm from '../../components/ProfileForm';
import UsersContainer from '../../containers/UsersContainer';
import EventForm from '../../components/EventForm';
import AllEventsContainer from '../../containers/AllEventsContainer';
import MyEventsContainer from '../../containers/MyEventsContainer';
import UpcomingEventsContainer from '../../containers/UpcomingEventsContainer';

const defaultDashboard = {
  Component: ProfileForm,
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
    case 'AllEventsContainer':
      return { Component: AllEventsContainer };
    case 'MyEventsContainer':
      return { Component: MyEventsContainer };
    case 'UpcomingEventsContainer':
      return { Component: UpcomingEventsContainer };
    default:
      return state;
  }
};

export default dashboard;
