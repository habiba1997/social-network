import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';

// this will take a component like <Route /> tag and ...rest (any other params that are passed in else is passed into it)
// we need to interact with auth state of our auth reducer (bring in connect)
// any extra params ..rest will be passed to Route tag (as supposed to)
//
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => {
  if (loading) return <Spinner />;
  if (!isAuthenticated) return <Navigate to='/login' />;
  return <Component />;
};

PrivateRoute.prototype = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PrivateRoute);
