import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profile-action';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AddExperience = ({ addExperience }) => {
  const initialState = {
    company: '',
    title: '',
    location: '',
    current: false,
    to: '',
    from: '',
    description: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [disabled, toogleDisapled] = useState(false);
  const { company, title, location, current, to, from, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const onSubmit = (e) => {
    // todo: ask about prevent default
    e.preventDefault();
    addExperience(formData, navigate);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            required
            value={title}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            required
            value={company}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toogleDisapled(!disabled);
              }}
            />{' '}
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            disabled={disabled}
            value={to}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={(e) => onChange(e)}></textarea>
        </div>
        <input
          type='submit'
          className='btn btn-primary my-1'
          value='Add Experience'
        />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
