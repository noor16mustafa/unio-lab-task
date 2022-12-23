import React, { useState } from 'react';
import img from '../assets/unio1.webp'
import app from './firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const auth = getAuth(app);

const Register = () => {
    const [passwordError, setPasswordError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const address = form.address.value;
        const password = form.password.value;

        //validate password
        if (!/(?=.*?[A-Z])/.test(password)) {
            setPasswordError('Please provide at least one uppercase');
            return;
        }
        else if (!/(?=.*?[0-9])/.test(password)) {
            setPasswordError('Please provide at least one digit');
            return;
        }
        else if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
            setPasswordError('Please provide at least one special character');
            return;
        }
        else {
            setPasswordError(null);
        }

        //phone length fixed
        if (phone.length !== 10) {
            setPhoneError('Please enter valid phone number');
            return;
        }
        else {
            setPhoneError(null)
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                verifyEmail();
                updateUserName(name);
                toast.success('User created Successfully')
                navigate('/login')

            })
            .catch(error => {
                console.error(error);
                setPasswordError(error.message);
            })
    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('Please check your email for verification')
            })
    }

    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(() => {
                console.log('display name updated');
            })
            .catch(e => console.error(e))
    }
    return (
        <div>
            <h1 className="text-2xl md:text-5xl  font-bold text-center my-6">Sign Up First !!</h1>
            <div className="hero my-10">

                <div className="hero-content flex-col lg:flex-row">

                    <div className="mx-auto">

                        <img style={{ width: '900px' }} src={img} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full md:w-1/2 md:ml-10 shadow-2xl bg-base-100">
                        <form onSubmit={handleSignUp}>
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" name='name' placeholder="your name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="your email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone</span>
                                    </label>
                                    <input type="number" name='phone' placeholder="Phone number" className="input input-bordered" required />
                                    {
                                        phoneError ? <p className='text-red-700 text-left'>{phoneError}</p> : ''
                                    }

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Address</span>
                                    </label>
                                    <input type="text" name='address' placeholder="Your address" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                    {
                                        passwordError ? <p className='text-red-700 text-left'>{passwordError}</p> : ''
                                    }


                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-outline btn-accent">Sign Up</button>
                                </div>
                                <p>Already have an account? Please <Link to='/login'><span className='text-info font-semibold'>Login</span></Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;