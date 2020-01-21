import React from 'react';
import { Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loginStatus from '../redux/actions/loginStatus';
import CardEvent from '../components/CardEvent';

class SlidesContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
  }

  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <CardEvent />
        </Carousel.Item>
        <Carousel.Item>
          <CardEvent />
        </Carousel.Item>
        <Carousel.Item>
          <CardEvent />
        </Carousel.Item>
      </Carousel>
    );
  }
}

SlidesContainer.propTypes = {
  checkLoginStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  checkLoginStatus: () => dispatch(loginStatus()),
});

const SlidesWrapper = connect(mapStateToProps, mapDispatchToProps)(SlidesContainer);

export default SlidesWrapper;
