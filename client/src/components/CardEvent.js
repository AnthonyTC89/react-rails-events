import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import loginStatus from '../redux/actions/loginStatus';

class CardEvent extends React.Component {
  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
  }

  render() {
    return (
      <Card style={{ width: '10rem' }}>
        <Card.Img variant="top" src="https://picsum.photos/seed/picsum/50" />
        <Card.Body>
          <Card.Title>Event Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the cards content.
          </Card.Text>
          <Button variant="primary">More Info</Button>
        </Card.Body>
      </Card>
    );
  }
}

CardEvent.propTypes = {
  checkLoginStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  checkLoginStatus: () => dispatch(loginStatus()),
});

const CardEventWrapper = connect(mapStateToProps, mapDispatchToProps)(CardEvent);

export default CardEventWrapper;
