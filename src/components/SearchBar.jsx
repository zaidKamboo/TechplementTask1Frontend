import { useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { filterByAuthorName } from '../Store/slices/quoteSlice';

const SearchBar = () => {
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch(filterByAuthorName(e.target.value))
    }

    return (
        <div className="flex mt-5 sm:mt-5 md:mt-0 lg:mt-0 lg:gap-3 lg:ml-0 lg:items-start lg:justify-normal  lg:w-1/2 md:w-1/2 md:ml-0 md:flex-col w-full ">
            <div className="flex lg:ml-0 items-center  lg:min-w-[97.5%] md:w-[95%] w-full md:ml-0 ">
                <input
                    onChange={handleChange}
                    type="text"
                    placeholder="Search Quotes by Author name..."
                    className="w-full h-10 text-black lg:w-full  rounded-s-full py-1 px-3 bg-gradient-to-r from-zinc-50 to-teal-500 focus:outline-none"
                />
                <button type="submit" className="pr-3  rounded-e-full bg-gradient-to-l from-zinc-950 to-teal-500  sm:mx-auto">
                    <AiOutlineSearch className="text-white h-10 w-6" />
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
