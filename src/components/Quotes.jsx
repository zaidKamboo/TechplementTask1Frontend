import React, { useEffect, useState } from 'react';
import { backendServerHost } from '../constants';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { setQuotes } from '../Store/slices/quoteSlice';
import { Typewriter } from 'react-simple-typewriter';

const Quotes = () => {
    const dispatch = useDispatch();
    let { quotes } = useSelector(store => store?.quotesInfo)

    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);

    const getQuotes = () => {
        fetch(`${backendServerHost}/quotes/${page}`)
            .then(res => res.json())
            .then(data => {
                dispatch(setQuotes(data?.quotes));
                setTotalResults(data.total);
                setPage(prevPage => prevPage + 1);
            })
            .catch(err => console.log(err?.message, err));
    };

    useEffect(() => {
        getQuotes();
    }, []);
    return (
        <div className='flex flex-wrap gap-x-1 gap-y-6'>
            <h2 className='text-3xl text-emerald-400 font-medium ml-3' >
                <Typewriter
                    words={['Famous Quotes.', 'Inspiring Messages.', 'By Renowned authors,', "great Scientists,etc."]}
                    loop={true}
                    cursor="rose-500"
                    cursorStyle='|'
                    typeSpeed={75}
                    deleteSpeed={32}
                    delaySpeed={1000}
                /></h2>
            <InfiniteScroll
                className='flex flex-wrap gap-x-1 gap-y-6'
                dataLength={quotes.length}
                next={getQuotes}
                hasMore={quotes.length !== totalResults}
            // loader={<h4>Loading...</h4>} 
            // endMessage={<p>No more quotes to load</p>}
            >
                {quotes.map((quote, index) => (
                    <div key={index} className='w-[45%] lg:w-[22%] xl:w-[18%] md:w-[30%] text-center text-2xl h-f flex flex-col justify-between rounded-t-3xl rounded-b-3xl font-haveletica bg-gradient-to-br from-zinc-800 to-zinc-950 text-white ml-4 sm:text-2xl xl:text-xl lg:text-xl'>
                        <h1 className='px-5 py-2'>{quote.quote}</h1>
                        <p className='px-0 h-11 border-t-black border-t-2 py-1 pr-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-black rounded-b-2xl text-lg text-end sm:text-xl md:text-lg overflow-hidden whitespace-nowrap'>- {quote.author}</p>
                    </div>
                ))}

            </InfiniteScroll>
        </div>
    );
};

export default Quotes;
