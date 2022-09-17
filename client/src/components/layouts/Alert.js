import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { closeAlert } from '../../actions/alert-action';

const Alert = ({ alerts, closeAlert }) => {
  const close = (alert) => {
    closeAlert(alert.id);
  };
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
        <FontAwesomeIcon
          icon='fa-xmark'
          className='close float-right'
          onClick={() => close(alert)}
        />
      </div>
    ))
  );
};

Alert.prototype = {
  // ptfr ( is a shortcut for is required)
  alerts: PropTypes.array.isRequired,
  closeAlert: PropTypes.func.isRequired,
};

// we are mapping our reducer state to this component props
// takes state as a parameter
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

// now we have props. alert available to us
// if we had any actions to call, it would have been placed second
export default connect(mapStateToProps, { closeAlert })(Alert);
