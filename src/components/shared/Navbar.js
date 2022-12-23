import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar bg-accent">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content  p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'><button className='btn btn-outline '>Sign Up</button></Link></li>
                    </ul>
                </div>

            </div>
            <div className="navbar-center hidden lg:flex">
                <h2 className="text-2xl font-bold text-white">UNIO Lab</h2>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'><button className='btn btn-outline '>Sign Up</button></Link></li>
                </ul>

            </div>
        </div>
    );
};

export default Navbar;