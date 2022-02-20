import {Link} from 'react-router-dom';
import React from 'react';
import { BsArrowBarLeft } from 'react-icons/bs'

const NotFound = () => {

    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col'>
            <h1 className='text-2xl mb-2 text-white'>Page not found</h1>
            <h1 className='text-1xl my-2 text-white'>Content Don&apos;t exist or has been moved</h1>
            <Link to={'/'}>
                <div className='flex justify-center items-center mt-4 cursor-pointer text-gray-300' >
                    <BsArrowBarLeft size={25} />
                    <p>Go back</p>
                </div>
            </Link>
        </div>
    );
};

export default NotFound;
