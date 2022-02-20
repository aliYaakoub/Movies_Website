import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';

const EpisodeDetails = ({episode, configData, setEpisode}) => {
  return (
    <div className={`flex flex-col relative rounded-lg overflow-hidden max-w-xs ${!episode.still_path && 'p-10'}`}>
        <AiOutlineClose className='absolute top-5 right-5 cursor-pointer' size={20} color='white' onClick={()=>setEpisode(false)} />
        <div>
            {episode.still_path &&
                <img className='w-full h-full' src={`${configData.secure_base_url}/${configData.still_sizes[2]}${episode.still_path}`} alt="" />
            }
        </div>
        <div>
            <p className='text-lg text-center'>{episode.name}</p>
            <p>Air Date: {episode.air_date}</p>
            <p className='text-xs pt-2'>{episode.overview}</p>
        </div>
    </div>
  )
}

export default EpisodeDetails