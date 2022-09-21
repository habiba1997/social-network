import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getMyProfile,
  deleteExperience,
  deleteEducation,
  deleteAccount,
} from '../../actions/profile-action';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from '../profile/Experience';
import Education from '../profile/Education';

const Dashboard = ({
  auth: { user },
  getMyProfile,
  profile: { profile, loading },
  deleteExperience,
  deleteEducation,
  deleteAccount,
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
          <Fragment>
            <DashboardActions />
            <Experience
              experience={profile.experience}
              deleteExperience={deleteExperience}
            />
            <Education
              education={profile.education}
              deleteEducation={deleteEducation}
            />
            <div className='my-2'>
              <button
                className='btn btn-danger'
                onClick={() => deleteAccount()}>
                <i className='fas fa-user-minus'>Delete My Account</i>
              </button>
            </div>
          </Fragment>
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
  deleteExperience: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

// todo: ask why must we add () at end
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getMyProfile,
  deleteExperience,
  deleteEducation,
  deleteAccount,
})(Dashboard);
