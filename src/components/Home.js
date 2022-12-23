import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/download (2).png'
import app from './firebase/firebase.config';

const auth = getAuth(app);
const Home = () => {
    const navigate = useNavigate('');

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/login')
            }).catch(e => console.error(e))
    }
    return (
        <div className='flex flex-col text-center mx-auto'>
            <div className='w-2/5 mx-auto my-20'>
                <img className='w-full' src={img1} alt="" />
            </div>
            <div>
                <button onClick={handleLogout} className='btn btn-outline btn-primary'>Logout</button>
            </div>

        </div>
    );
};

export default Home;