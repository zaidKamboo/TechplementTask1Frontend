import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Form from '../components/Form';
import Quotes from '../components/Quotes';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useDispatch, useSelector } from 'react-redux';
import { setTodaysQuote } from '../Store/slices/quoteSlice';

const Home = () => {
    const dispatch = useDispatch();
    const quotesInfo = useSelector(store => store.quotesInfo);
    const [displayedQuote, setDisplayedQuote] = useState('');

    useGSAP(() => {
        gsap.from(".animateText", {
            opacity: 0,
            y: 10,
            rotateX: 90,
            duration: 3,
        });
        gsap.to(".animateText", {
            opacity: 1,
            duration: 2.8
        })
    });

    useEffect(() => {
        fetch('https://dummyjson.com/quotes/random')
            .then(res => res?.json())
            .then(res => {
                dispatch(setTodaysQuote(res));
                setDisplayedQuote(res.quote);
            })
            .catch(err => alert(err?.messages));
    }, []);

    return (
        <>
            <div className='w-full '>
                <div className='mx-auto w-[90%]  md:w-[85%] text-center text-3xl rounded-t-2xl rounded-b-2xl font-haveletica bg-gradient-to-r from-zinc-800 to-zinc-950 text-white mt-5 sm:text-4xl'>
                    <p className=' animateText font-bold pt-2 text-pretty tracking-tight'>
                        Today's Quote of the Day is :
                    </p>
                    <h1 className='italic animateText px-5 py-2'>
                        {displayedQuote}
                    </h1>
                    <p className='   px-0 h-11 border-t-black border-t-2 py-1 pr-3 bg-gradient-to-r from-violet-600 to-fuchsia-400 rounded-b-2xl text-2xl text-end text-black sm:text-3xl overflow-hidden whitespace-nowrap'>
                        - {quotesInfo?.todaysQuote?.author}
                    </p>
                </div>
            </div>
            <div className="flex flex-col w-[90%] md:w-4/5 mx-auto md:flex-row justify-between items-center lg:items-start md:items-start mt-5">
                <Form className="w-full sm:w-auto" />
                <SearchBar className="w-full  sm:w-auto mb-4 sm:mb-0 sm:mr-4" />
            </div>
            <div className="mt-5 w-[90%] mx-auto ">
                <Quotes />
            </div>
        </>
    );
};

export default Home;
