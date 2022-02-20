import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { VscDebugBreakpointLog } from 'react-icons/vsc'
import moment from 'moment';
import Animation from '../Components/GeneralComponents/Animation';
import { BiMenu } from 'react-icons/bi';
import { AnimatePresence } from 'framer-motion';
import SideNav from '../Components/SideNav';

const TvShowDetails = () => {

    const params = useParams()

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNav, setShowNav] = useState(false);

    const Base_Endpoint = `https://api.themoviedb.org/3`;
    const api_key = process.env.REACT_APP_API_KEY;
    const configData = JSON.parse(localStorage.getItem('configData'));

    useEffect(()=>{
        const getMovies = async () => {
            try{
                const result = await axios.get(`${Base_Endpoint}/tv/${params.id}?api_key=${api_key}`);
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

    return (
        <div className="flex justify-center min-h-screen">
            {loading ? 
                <div className='w-full h-screen flex justify-center items-center'>
                    <Animation />
                </div>
                :
                <div className=' max-w-4xl text-white sm:p-10 px-5'>
                    <div className='absolute top-5 left-10 cursor-pointer'>
                        <BiMenu onClick={()=>setShowNav(true)} color='white' size={50} />
                    </div>
                    <AnimatePresence>
                        {showNav && <SideNav setShowNav={setShowNav} />}
                    </AnimatePresence>
                    <img src={`${configData.secure_base_url}/${configData.backdrop_sizes[2]}${data.backdrop_path}`} className='rounded-b-xl sm:rounded-xl' alt="" />
                    <div>
                        <h1 className='text-center text-2xl md:text-4xl pt-3'>{data.name}</h1>
                        <p className='text-center md:text-2xl py-3'>{data.tagline}</p>
                        <div className="flex items-center justify-center pb-5">
                            <p>{data.status}</p>
                            <VscDebugBreakpointLog className='mx-3' />
                            <p>{moment(data.release_date).format('MMM DD, YY')}</p>
                            <VscDebugBreakpointLog className='mx-3' />
                            <p>{data.number_of_seasons} seasons</p>
                        </div>
                    </div>
                    <h2 className='text-3xl my-8'>Overview :</h2>
                    <p className='text-xl'>{data.overview}</p>
                    <h2 className='text-3xl my-8'>Seasons :</h2>
                    <div className='flex mt-5 flex-wrap justify-center items-center'>
                        {data && data.seasons && data.seasons.map(season => (
                            <Link to={`/tvshow/${data.id}/season_details/${season.season_number}`} key={season.id} className='p-2'>
                                <h3 className='text-xs p-2'>{season.name}</h3>
                                {season && season.poster_path ? 
                                    <img className='rounded-lg' src={`${configData.secure_base_url}/${configData.poster_sizes[2]}${season.poster_path}`} alt="" />
                                    :
                                    <p>Image Unavailable</p>
                                }
                            </Link>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
};

export default TvShowDetails;
