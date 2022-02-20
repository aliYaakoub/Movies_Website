import React, { useEffect } from 'react';
import GenreTag from './GenreTag';

const GenreFilter = ({currentGenre, setCurrentGenre, movies, setFiltered}) => {

    useEffect(()=>{
        if(currentGenre === null){
            setFiltered(movies);
            return
        }
        const filtered = movies.filter(movie => {
            return movie.genre_ids.includes(currentGenre)
        })
        setFiltered(filtered)
    }, [currentGenre, movies, setFiltered]);

    return (
        <div className='flex my-5 flex-wrap sticky top-0 z-30 bg-gray-700 bg-opacity-90'>
            <div onClick={()=>setCurrentGenre(null)} className={`py-1 px-4 ${currentGenre ? 'bg-white' : 'bg-gray-500'} text-xs md:text-sm mx-3 my-2 rounded-2xl cursor-pointer hover:scale-110 transition-all duration-300`}>
                <p className={`${!currentGenre && 'text-white'}`}>All</p>
            </div>
            <GenreTag 
                GenreId={28} 
                title={'Action'} 
                setCurrentGenre={setCurrentGenre}
                currentGenre={currentGenre} 
            />
            <GenreTag 
                GenreId={35} 
                title={'Comedy'} 
                setCurrentGenre={setCurrentGenre}
                currentGenre={currentGenre} 
            />
            <GenreTag 
                GenreId={18} 
                title={'Drama'}
                setCurrentGenre={setCurrentGenre} 
                currentGenre={currentGenre} 
            />
            <GenreTag 
                GenreId={53} 
                title={'Thriller'} 
                setCurrentGenre={setCurrentGenre} 
                currentGenre={currentGenre} 
            />
        </div>
    )
}

export default GenreFilter