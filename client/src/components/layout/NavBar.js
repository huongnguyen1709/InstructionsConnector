import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className='right'>
      <li>
        <NavLink to='/newInstruction'>New Instruction</NavLink>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='right'>
      <li>
        <NavLink to='/signup'>Signup</NavLink>
      </li>
      <li>
        <NavLink to='/login'>Login</NavLink>
      </li>
    </ul>
  );

  return (
    <nav className='nav-wrapper grey darken-3'>
      <div className='container'>
        <Link to='/' className='brand-logo'>
          theFirma
        </Link>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
