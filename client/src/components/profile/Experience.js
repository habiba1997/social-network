import React, { Fragment } from 'react';
import Moment from 'react-moment';

const Experience = ({ experience, deleteExperience }) => {
  const experienceTable = experience.map((exp) => {
    return (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className='hide-sm'>{exp.title}</td>
        <td className='hide-sm'>
          <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
          {exp.currnet || exp.to === null ? (
            'Now'
          ) : (
            <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            className='btn btn-danger'
            onClick={() => deleteExperience(exp._id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <Fragment>
      <h2 className='my-2'>Experience</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{experienceTable}</tbody>
      </table>
    </Fragment>
  );
};

export default Experience;
