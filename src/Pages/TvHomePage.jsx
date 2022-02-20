import React, { useState } from 'react';
import { BiRightArrowAlt, BiLeftArrowAlt, BiMenu } from 'react-icons/bi'
import { AnimatePresence, motion } from 'framer-motion';

import SideNav from '../Components/SideNav';
import TvShows from '../Components/tvShows/TvShows';

const TvHomePage = () => {

    const categories = ['On The Air', 'Airing Today', 'Popular', 'Top Rated'];
    const [index, setIndex] = useState(0);
    const [page, setPage] = useState(1);
    const [showNav, setShowNav] = useState(false);

    function handleNext(){
        setPage(1);
        if(index === categories.length -1){
            setIndex(0);
            return
        }
        setIndex(index+1)
    }

    function handlePrev(){
        setPage(1);
        if(index === 0){
            setIndex(categories.length - 1)
            return
        }
        setIndex(index-1)
    }

    return (
        <motion.div className='px-5 sm:px-10 relative'>
            <div className='absolute top-5 left-10 cursor-pointer'>
                <BiMenu onClick={()=>setShowNav(true)} color='white' size={50} />
            </div>
            <AnimatePresence>
                {showNav && <SideNav setShowNav={setShowNav} />}
            </AnimatePresence>
            <div className='flex justify-center items-center my-5 pt-20 sm:mt-8 sm:pt-0'>
                <BiLeftArrowAlt 
                    size={40} 
                    color='white' 
                    className='mr-10' 
                    onClick={handlePrev}
                />
                <h1 className='py-5 text-5xl text-white text-center'>{categories[index]}</h1>
                <BiRightArrowAlt 
                    size={40} 
                    color='white' 
                    className='ml-10' 
                    onClick={handleNext}
                />
            </div>
            <TvShows index={index} categories={categories} page={page} setPage={setPage} />
        </motion.div>
    );
};

export default TvHomePage;
