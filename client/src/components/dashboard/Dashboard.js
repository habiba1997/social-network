import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProfile } from '../../actions/profile-action';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';

const Dashboard = ({
  auth: { user },
  getMyProfile,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <DashboardActions />
        ) : (
          <>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              Create Profile
            </Link>
          </>
        )}
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getMyProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

// todo: ask why must we add () at end
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getMyProfile })(Dashboard);
