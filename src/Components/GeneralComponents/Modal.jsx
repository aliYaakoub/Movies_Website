import { motion } from 'framer-motion'
import React from 'react'

const Modal = ({children}) => {
  return (
    <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className='bg-black bg-opacity-80 fixed w-screen h-screen top-0 left-0 z-50 flex justify-center items-center'
    >
        {children}
    </motion.div>
  )
}

export default Modal