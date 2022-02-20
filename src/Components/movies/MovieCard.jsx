import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Animation from '../GeneralComponents/Animation';

const MovieCard = ({data}) => {

    const configData = JSON.parse(localStorage.getItem('configData'));
    const [loading, setLoading] = useState(true);
    const [imageIndex, setImageIndex] = useState(2);

    useEffect(()=>{
        if(!loading){
            setTimeout(()=>{
                setImageIndex(3)
            }, 5000)
            setTimeout(()=>{
                setImageIndex(4)
            }, 10000)
        }
    }, [loading])

    return (
        <motion.div 
            layout 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0, scale: 0.8}}
            whileHover={{scale: 1.05, transition: {duration: 0.2}}}
            className={`place-self-center content-center w-52 max-w-full h-72 max-h-full mb-12`}
        >
            <Link to={`/movie/${data.id}`}>
                <p className='text-white text-xs my-2 truncate'>{data.title}</p>
                <div className='relative flex-col flex justify-center items-center w-52 max-w-full h-72 max-h-full'>
                    {loading &&
                        <div className='absolute top-0 left-0 h-full w-full  flex justify-center items-center'>
                            {/* <p className='text-white'>loading</p> */}
                            <Animation width={200} height={200} />
                        </div>
                    }
                    <img
                        src={`${configData.secure_base_url}/${configData.poster_sizes[imageIndex]}${data.poster_path}`}
                        onLoad={()=>setLoading(false)}
                        alt=""
                        className={`${loading && 'opacity-0'} w-full h-full rounded-lg`}
                    />
                </div>
            </Link>
        </motion.div>
    );
};

export default MovieCard;
