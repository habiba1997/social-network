import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profile-action';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AddEducation = ({ addEducation }) => {
  const initialState = {
    school: '',
    degree: '',
    fieldofstudy: '',
    current: false,
    to: '',
    from: '',
    description: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [disabled, toogleDisapled] = useState(false);
  const { school, degree, fieldofstudy, current, to, from, description } =
    formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, navigate);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            required
            value={school}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            required
            value={degree}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Field Of Study'
            name='fieldofstudy'
            value={fieldofstudy}
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
            Current Education
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
            placeholder='Program Description'
            value={description}
            onChange={(e) => onChange(e)}></textarea>
        </div>
        <input
          type='submit'
          className='btn btn-primary my-1'
          value='Add Education'
        />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
