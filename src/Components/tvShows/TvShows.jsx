import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

import GenreFilter from '../GenreFilter';
import Pagination from '../GeneralComponents/Pagination';
import Animation from '../GeneralComponents/Animation';
import TvShowCard from './TvShowCard';

const TvShows = ({page, setPage, index, categories}) => {

    const [tvShow, setTvShow] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [maxPages, setMaxPages] = useState(0);
    const [currentGenre, setCurrentGenre] = useState(null);

    const Base_Endpoint = `https://api.themoviedb.org/3`;
    const api_key = process.env.REACT_APP_API_KEY;

    useEffect(()=>{
        const getMovies = async () => {
            try{
                const result = await axios.get(`${Base_Endpoint}/tv/${categories[index].toLowerCase().replace(/\s+/g, '_')}?api_key=${api_key}&page=${page}`);
                setTvShow(result.data.results);
                setLoading(false);
                setMaxPages(result.data.total_pages);
            }
            catch(err){
                console.error(err.message);
            }
        }
        getMovies();
    }, [Base_Endpoint, api_key, page, index, categories])

    return (
        <motion.div 
            // initial={{opacity: 0}} 
            // animate={{opacity: 1}} 
            exit={{opacity: 0}} 
            // className='absolute top-0 left-0'
        >
            {loading ? 
                <div className='flex justify-center items-center h-full'>
                    <Animation />
                </div>
                :
                filtered && 
                <>
                    <GenreFilter movies={tvShow} setFiltered={setFiltered} currentGenre={currentGenre} setCurrentGenre={setCurrentGenre} />
                    <motion.div layout className='grid lg:grid-cols-4 xl:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-5'>
                        <AnimatePresence>
                            {filtered.map(movie => {
                                if(!movie.poster_path){
                                    return null
                                }
                                return (
                                    <TvShowCard key={movie.id} data={movie} />
                                )
                            })}
                        </AnimatePresence>
                    </motion.div>
                    <Pagination page={page} setPage={setPage} max={maxPages} />
                </>
            }
        </motion.div>
    )
}

export default TvShows