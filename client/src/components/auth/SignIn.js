import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const SignIn = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='container'>
      <form onSubmit={(e) => onSubmit(e)} className='white'>
        <h5 className='grey-text text-darken-3'>Sign Into Your Account</h5>

        <div className='input-field'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className='input-field'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            minLength='6'
            required
          />
        </div>

        <div className='input-field'>
          <button className='btn pink lighten-1 z-depth-0'>Sign In</button>
          <div className='red-text center'></div>
        </div>
      </form>
    </div>
  );
};

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(SignIn);
