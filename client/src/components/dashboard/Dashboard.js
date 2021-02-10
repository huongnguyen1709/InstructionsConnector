import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import InstructionSummary from '../instructions/InstructionSummary';

const Dashboard = ({ getPosts, user, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='row'>
        <div className='col s12 m6 offset-m2'>
          <div className='section'>
            {posts.map((post) => {
              return (
                <Link
                  to={{
                    pathname: `/instructions/${post._id}`,
                    post,
                    user,
                  }}
                  key={post._id}
                >
                  <InstructionSummary user={user} instruction={post} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getPosts })(Dashboard);
