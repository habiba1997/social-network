import React, { Fragment } from 'react';
import Moment from 'react-moment';

const Education = ({ education, deleteEducation }) => {
  const educationTable = education.map((edu) => {
    return (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td className='hide-sm'>{edu.degree}</td>
        <td className='hide-sm'>
          <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
          {edu.currnet || edu.to === null ? (
            'Now'
          ) : (
            <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            className='btn btn-danger'
            onClick={() => deleteEducation(edu._id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <Fragment>
      <h2 className='my-2'>Education</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{educationTable}</tbody>
      </table>
    </Fragment>
  );
};

export default Education;
