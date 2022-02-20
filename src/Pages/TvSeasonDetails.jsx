import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
import Animation from '../Components/GeneralComponents/Animation';
import Modal from './../Components/GeneralComponents/Modal';
import { AnimatePresence } from 'framer-motion';
import EpisodeDetails from '../Components/tvShows/EpisodeDetails';
import { BiMenu } from 'react-icons/bi';
import SideNav from '../Components/SideNav';

const TvSeasonDetails = () => {

    const params = useParams()

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageIndex, setImageIndex] = useState(2);
    const [episode, setEpisode] = useState(null);
    const [showNav, setShowNav] = useState(false);

    const Base_Endpoint = `https://api.themoviedb.org/3`;
    const api_key = process.env.REACT_APP_API_KEY;
    const configData = JSON.parse(localStorage.getItem('configData'));

    useEffect(()=>{
        const getMovies = async () => {
            try{
                const result = await axios.get(`${Base_Endpoint}/tv/${params.id}/season/${params.season_number}?api_key=${api_key}`);
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

    function evaluateColor(num){
        if(num < 6){
            return 'bg-red-500'
        }
        else if (num < 8){
            return 'bg-yellow-500 text-black'
        }
        else {
            return 'bg-green-500'
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            setImageIndex(3)
        }, 5000)
    }, [])

    return (
        <div className="flex justify-center min-h-screen">
            {loading ? 
                <div className='w-full h-screen flex justify-center items-center'>
                    <Animation />
                </div>
                :
                data && data.episodes &&
                <div className=' max-w-4xl text-white sm:p-10 px-5 w-full'>
                    <div className='absolute top-5 left-10 cursor-pointer'>
                        <BiMenu onClick={()=>setShowNav(true)} color='white' size={50} />
                    </div>
                    <AnimatePresence>
                        {showNav && <SideNav setShowNav={setShowNav} />}
                    </AnimatePresence>
                    <AnimatePresence>
                        {episode &&
                            <Modal>
                                <EpisodeDetails episode={episode} setEpisode={setEpisode} configData={configData} />
                            </Modal>
                        }
                    </AnimatePresence>
                    <div className='flex justify-start w-full'>
                        {data.poster_path && <img 
                            alt="" 
                            className='rounded-b-xl sm:rounded-xl' 
                            src={`${configData.secure_base_url}/${configData.poster_sizes[2]}${data.poster_path}`} 
                        />}
                        <div className='flex flex-col justify-end items-start pl-10'>
                            <h2>{data.name}</h2>
                            <p> aired on {moment(data.air_date).format('DD, MMM YYYY')}</p>
                            <p>number of episodes: {data.episodes.length}</p>
                        </div>
                    </div>
                    <div className="">
                        {data.overview &&
                            <div className='mt-10'>
                                <h3 className='text-3xl mb-5'>Overview:</h3>
                                <p>{data.overview}</p>
                            </div>
                        }

                        <div className='mt-10'>
                            <h3 className='text-3xl mb-5'>Episodes :</h3>
                            <div className="grid grid-cols-2 gap-3 md:gap-5">
                                {data.episodes.map(episode => (
                                    <div key={episode.id} onClick={()=>setEpisode(episode)} className='relative overflow-hidden rounded-lg cursor-pointer'>
                                        <h4 className='text-xs p-2'>{episode.name}</h4>
                                        {episode.still_path ? 
                                            <img className='rounded-lg w-full h-full' src={`${configData.secure_base_url}/${configData.still_sizes[imageIndex]}${episode.still_path}`} alt="" />
                                            :
                                            <div className="flex justify-center items-center">
                                                <p>Image Unavailable</p>
                                            </div>
                                        }
                                        <span 
                                            className={`
                                                absolute bottom-0 right-0 w-7 sm:w-8 h-7 sm:h-8 bg-slate-500 flex justify-center items-center
                                                ${evaluateColor(episode.vote_average)} text-xs sm:text-base
                                            `}
                                        >
                                            <p>{episode.vote_average.toPrecision(2)}</p>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default TvSeasonDetails