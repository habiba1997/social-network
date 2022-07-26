import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { addLike, removeLike, deletePost } from '../../actions/post-action';
import { connect } from 'react-redux';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profiles/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on<Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              type='button'
              className='btn btn-light'
              onClick={() => addLike(_id)}>
              <i className='fas fa-thumbs-up'></i>
              <span> {likes.length > 0 && <span> {likes.length} </span>}</span>
            </button>
            <button
              type='button'
              className='btn btn-light'
              onClick={() => removeLike(_id)}>
              <i className='fas fa-thumbs-down'></i>
            </button>
            <Link to={`/post/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              <span className='comment-count'>{comments.length}</span>
            </Link>
            {/*  in posts the user is Id */}
            {!auth.loading && auth.isAuthenticated && auth.user._id === user && (
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => deletePost(_id)}>
                <i className='fas fa-times'></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};
PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
