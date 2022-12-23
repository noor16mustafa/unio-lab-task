import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import app from './firebase/firebase.config';

const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setError('');
                form.reset();
                toast.success(' Successfully logged in')
                navigate('/home');

            })
            .catch(e => {
                console.log(e);
                setError(e.message)
            })


    }

    const handleEmailBlur = event => {
        const email = event.target.value;
        setUserEmail(email);
    }
    const handleForgetPassword = () => {
        if (!userEmail) {
            alert('Please enter your email address');
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert('Please check your email to reset password')
            })
            .catch(e => {
                console.error(e);
            })
    }
    return (
        <div className="hero  bg-base-200 ">
            <div className="hero-content w-3/5">

                <div className="card sm:w-full lg:w-1/2 shadow-2xl bg-base-100 mt-14 mb-14">
                    <h1 className="text-2xl lg:text-5xl font-bold pt-10 text-center">Login now!</h1>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input onBlur={handleEmailBlur} type="email" name='email' required placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' required placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <span className="label-text-alt text-red-600 font-bold">{error}</span>

                                </label>
                                <label className="label">
                                    <button onClick={handleForgetPassword} className="label-text-alt link link-hover text-primary">Forget password?</button>
                                </label>
                            </div>
                            <div className="form-control mt-6 mb-10">
                                <button className="btn btn-success btn-outline">Login</button>
                            </div>
                            <p>New to this side? Please <Link to='/register'><span className='text-info font-semibold'>Sign Up</span></Link> First</p>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;