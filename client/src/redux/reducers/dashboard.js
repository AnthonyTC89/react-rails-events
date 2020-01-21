/* eslint-disable no-unused-vars */
import DashboardMenu from '../../containers/DashboardMenu';

const defaultState = {
  name: DashboardMenu,
};

const dashboard = (state = defaultState, { type, name }) => {
  switch (type) {
    case 'UPDATE':
      return { name };
    default:
      return defaultState;
  }
};

export default dashboard;
