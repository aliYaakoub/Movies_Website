import React from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr'

const Pagination = ({page, setPage, max}) => {

    return (
        <div className='flex items-center justify-center py-10'>
            <button
                className='px-4 py-2 text-sm shadow-slate-400 shadow bg-slate-200 rounded-md mx-5 flex flex-row items-center disabled-btn' 
                onClick={()=>setPage(page => page - 1)}
                disabled={page === 1 ? true : false}
            >
                <GrPrevious className='mr-2' />
                Prev
            </button>
            <p className='text-white text-sm'>Page {page} of {max}</p>
            <button
                className='px-4 py-2 text-sm shadow-slate-400 shadow bg-slate-200 rounded-md mx-5 flex flex-row items-center disabled-btn'
                onClick={()=>setPage(page => page + 1)}
                disabled={page === max ? true : false}
            >
                Next
                <GrNext className='ml-2' />
            </button>
        </div>
    );
};

export default Pagination;
