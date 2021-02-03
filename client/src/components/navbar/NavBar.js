import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">theFirma</Link>
                <ul className="right">
                    <li><NavLink to='/signup'>Signup</NavLink></li>
                    <li><NavLink to='/signin'>Login</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
