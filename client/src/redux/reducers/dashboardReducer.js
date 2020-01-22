/* eslint-disable no-unused-vars */
import DashboardMenu from '../../containers/DashboardMenu';
import ProfileForm from '../../components/ProfileForm';
import UsersContainer from '../../containers/UsersContainer';

const defaultDashboard = {
  name: ProfileForm,
};

const dashboardReducer = (state = defaultDashboard, action) => {
  switch (action.name) {
    case 'DashboardMenu':
      return { name: DashboardMenu };
    case 'ProfileForm':
      return { name: ProfileForm };
    case 'UsersContainer':
      return { name: UsersContainer };
    default:
      return state;
  }
};

export default dashboardReducer;
