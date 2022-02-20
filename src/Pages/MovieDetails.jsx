import React, { useState, useEffect } from 'react';
import { VscDebugBreakpointLog } from 'react-icons/vsc'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
import { BiMenu } from 'react-icons/bi'

import MovieCard from '../Components/movies/MovieCard';
import Animation from '../Components/GeneralComponents/Animation';
import SideNav from '../Components/SideNav';
import { AnimatePresence } from 'framer-motion';

const MovieDetails = () => {

    const params = useParams()

    const [data, setData] = useState(null);
    const [similar, setSimilar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [similarLoading, setSimilarLoading] = useState(true);
    const [showNav, setShowNav] = useState(false);
    const [imageIndex, setImageIndex] = useState(1);
    const [errMsg, setErrMsg] = useState(false);

    setTimeout(()=>{
        setImageIndex(2)
    }, 5000)
    setTimeout(()=>{
        setImageIndex(3)
    }, 10000)

    const Base_Endpoint = `https://api.themoviedb.org/3`;
    const api_key = process.env.REACT_APP_API_KEY;
    const configData = JSON.parse(localStorage.getItem('configData'));

    useEffect(()=>{
        const getMovies = async () => {
            try{
                setData(null)
                setLoading(true);
                const result = await axios.get(`${Base_Endpoint}/movie/${params.id}?api_key=${api_key}`);
                setLoading(false);
                setData(result.data)
                console.log(result.data);
            }
            catch(err){
                console.error(err.message);
            }
        }
        getMovies();
    }, [Base_Endpoint, api_key, params])
        
    useEffect(()=>{
        const getMovies = async () => {
            try{
                setSimilar(null)
                const result = await axios.get(`${Base_Endpoint}/movie/${params.id}/similar?api_key=${api_key}`);
                setSimilarLoading(false);
                setSimilar(result.data.results.slice(0, 6))
                console.log(result.data);
            }
            catch(err){
                console.error(err.message);
                setErrMsg(true)
            }
        }
        getMovies();
    }, [Base_Endpoint, api_key, params])


    return (
        <div className="flex justify-center min-h-screen">
            {errMsg ? 
                <div className='flex flex-col text-white text-2xl w-screen h-screen justify-center items-center'>
                    <p>An error occured</p>
                    <p>please restart the page</p>
                </div>
                :
                loading ? 
                    <div className='flex w-screen h-screen justify-center items-center'>
                        <Animation />
                    </div>
                    :
                    data &&
                    <div className=' max-w-4xl text-white sm:p-10 sm:px-5'>
                        <div className='absolute top-5 left-10 cursor-pointer'>
                            <BiMenu onClick={()=>setShowNav(true)} color='white' size={50} />
                        </div>
                        <AnimatePresence>
                            {showNav && <SideNav setShowNav={setShowNav} />}
                        </AnimatePresence>
                        {data.backdrop_path && <img src={`${configData.secure_base_url}/${configData.backdrop_sizes[imageIndex]}${data.backdrop_path}`} className='w-full sm:rounded-xl' alt="" />}
                        <div className=''>
                            <h1 className='text-center text-2xl md:text-4xl pt-3'>{data.title}</h1>
                            <p className='text-center md:text-2xl py-3'>{data.tagline}</p>
                            <div className="flex items-center justify-center pb-5">
                                <p>{data.status}</p>
                                <VscDebugBreakpointLog className='mx-3' />
                                <p>{moment(data.release_date).format('MMM DD, YY')}</p>
                                <VscDebugBreakpointLog className='mx-3' />
                                <p>{data.runtime} minutes</p>
                            </div>
                        </div>
                        <h2 className='text-3xl p-5'>Overview :</h2>
                        <p className='text-xl px-5'>{data.overview}</p>
                        {/* similar */}
                        <h2 className='text-3xl p-5'>Similar :</h2>
                        {similarLoading ?
                            <div className='flex justify-center items-center'>
                                <Animation />
                            </div>
                            :
                            similar &&
                            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 px-5'>
                                <AnimatePresence>
                                    {similar.map((movie)=>(
                                        <MovieCard data={movie} key={movie.id} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        }
                    </div>
            }
        </div>
    );
};

export default MovieDetails;
