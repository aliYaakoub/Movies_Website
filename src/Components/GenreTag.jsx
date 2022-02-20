import React from 'react'

const GenreTag = ({GenreId, title, setCurrentGenre, currentGenre}) => {
    return (
        <div onClick={()=>setCurrentGenre(GenreId)} className={`py-1 px-4 my-2 ${currentGenre !== GenreId ? 'bg-white' : 'bg-gray-500'} mx-2 text-xs md:text-sm rounded-2xl cursor-pointer hover:scale-110 transition-transform duration-300`}>
            <p className={`${currentGenre === GenreId && 'text-white'}`}>{title}</p>
        </div>
    )
}

export default GenreTag