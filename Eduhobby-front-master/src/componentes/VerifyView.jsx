import React, { useEffect, useState } from 'react';
import getVerifiedAccount from '../services/verification/getVerifiedAccount';
import { useParams } from 'react-router-dom';

const VerifyView = () => {
    const { token } = useParams();
    console.log(token);
    const [message, setMessage] = useState({msg: ''});

    const verifyAccount = async () => {
        const verifyResponse = await getVerifiedAccount(token);
        setMessage(verifyResponse);
    };
    useEffect(() => {
        verifyAccount();
    }, []);
    if(!token) return  <div className='flex flex-col mt-8 align-middle items-center'>
            <h1 className='font-xl font-bold'>Token missing</h1>
        </div>;
    return (message.msg === 'User verified' ?
        <div className='flex flex-col mt-8 align-middle items-center'>
            <h1 className='font-xl font-bold'>User Verified Succesfully!</h1>
            <a href="https://eduhobby-front.vercel.app/Login">Click here to log in</a>
        </div>
        :
        <div className='flex flex-col mt-8 align-middle items-center'>
            <h1 className='font-2xl font-bold'>An Error ocurred</h1>
            <h1>{message.msg}</h1>
        </div>
    )
}
export default VerifyView;