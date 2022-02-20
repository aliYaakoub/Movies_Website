import { motion } from 'framer-motion';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

const SideNav = ({setShowNav}) => {

  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      className='fixed z-40 bg-black top-0 left-0 w-screen h-screen bg-opacity-80'
      onClick={(e)=>{
        if(e.target.classList.contains('inside')) {return}
        else setShowNav(false)
      }}
    >
      <motion.div
          initial={{x: '-100%'}}
          animate={{x: '0%'}}
          exit={{x: '-100%'}}
          transition={{bounce: false}}
          className='inside fixed top-0 left-0 h-screen w-1/2 sm:w-2/5 lg:w-1/4 bg-slate-500 z-50 shadow-xl'
      >
        <div className="relative w-full h-full inside">
            <AiOutlineClose className='absolute top-5 right-5 cursor-pointer' size={20} color='white' onClick={()=>setShowNav(false)} />
            <div className='pt-16 text-white flex flex-col text-xl'>
                <Link to={'/movies'} className='py-2 pl-5 hover:bg-gray-700 transition-colors duration-200' >Movies</Link>
                <Link to={'/tvshows'} className='py-2 pl-5 hover:bg-gray-700 transition-colors duration-200'>Tv Shows</Link>
                <p onClick={()=>navigate(-1)} className='py-2 mt-5 pl-5 hover:bg-gray-700 transition-colors duration-200 cursor-pointer'>Go Back</p>
            </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SideNav