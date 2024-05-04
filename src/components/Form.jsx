import React, { useRef } from 'react';
import { Typewriter } from 'react-simple-typewriter'
import { backendServerHost } from '../constants';

const Form = () => {
    const authorRef = useRef();
    const quoteRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        let author = authorRef.current.value;
        let quote = quoteRef.current.value
        console.log(author, quote)
        fetch(`${backendServerHost}/quotes/addQuote`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ author, quote })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                authorRef.current.value = ""
                quoteRef.current.value = ""
            })
            .catch(err => console.log(err?.message))
    }
    return (
        <div className='md:w-1/2 w-full'>
            <h2 className='text-2xl text-center font-light  text-zinc-50'>
                <Typewriter
                    words={['Want to add your quote as well ?', 'Fill in the details below.', 'Click the "Add" button.']}
                    loop={true}
                    cursor="rose-500"
                    cursorStyle='|'
                    typeSpeed={50}
                    deleteSpeed={25}
                    delaySpeed={1000}
                />
            </h2>
            <form action="" onSubmit={handleSubmit} className='lg:w-[97.5%] mt-5 md:w-[97.5%]'>
                <div className="flex h-10 justify-between">
                    <label className='w-[49%] text-wrap h-10 px-auto flex items-center justify-center  md:text-2xl lg:text-2xl xl:text-2xl text-xl sm:text-2xl font-semibold md:flex md:items-center rounded-full bg-zinc-50' htmlFor="quote">
                        <p>
                            Quote :
                        </p>
                    </label>
                    <input ref={quoteRef} placeholder='Quote body goes here...' className='w-[60%] rounded-full text-center text-lg sm:text-xl md:text-lg lg:text-xl xl:text-lg font-light ml-[5%] outline-none bg-slate-950 text-white ' type="text" name="quote" id="" required />
                </div>
                <div className="mt-5 flex h-10 justify-between">
                    <label className='w-[49%] text-wrap h-10 px-auto flex items-center justify-center md:text-2xl lg:text-2xl xl:text-2xl font-semibold md:flex md:items-center rounded-full bg-zinc-50 text-xl sm:text-2xl' htmlFor="quote">
                        <p>
                            Author :
                        </p>
                    </label>
                    <input ref={authorRef} placeholder='Author name goes here...' className='w-[60%] rounded-full text-center text-lg sm:text-xl md:text-lg lg:text-xl xl:text-lg font-light ml-[5%] outline-none bg-slate-950 text-white ' type="text" name="quote" id="" required />
                </div>
                <div className='flex items-center justify-center'>

                    <button className='w-[50%] mt-5 md:text-2xl lg:text-2xl xl:text-2xl text-xl sm:text-2xl font-bold tracking-wider bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-l from-cyan-400 to-blue-600  px-5 py-2  rounded-full' type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form
