import { useState } from "react";
import {toast} from 'react-toastify'

const NewsLetter = () => {
    const [email,setEmail] = useState('');
    const onSubmitHandler = (e)=>{
      e.preventDefault();
      toast.success("Thanks for subscribing to LocalCart ",{
        autoClose:1000
      })
      setEmail('')
    }
  return (
    <div className='font-space text-center mt-10'>
        <h1 className='font-semibold font-pop text-lg text-gray-800'>Subscribe now and get 10% off</h1>
        <p className='text-gray-500 text-sm mt-3 px-3'>Get all the Vendors and their products latest prices and discount updates to your mail.</p>
        <form action="" onSubmit={onSubmitHandler} className='max-w-11/12 rounded-sm sm:w-3/5 flex border mt-3 border-gray-800 items-center justify-center mx-auto'>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='Enter Your Email Address...' className='text-sm sm:text-base px-5 flex-1/2 py-3' required />
            <button className='text-sm sm:text-base cursor-pointer bg-black text-white font-light px-5 py-3'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetter

