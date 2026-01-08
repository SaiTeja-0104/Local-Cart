import { useEffect } from 'react';
import logImage from '../assets/cart.png';
import Shops from './Shops'

const Hero = () => {
  const scroll = ()=>{
    const target = document.getElementById('shop')
    if(target){
      target.scrollIntoView({
        behavior:'smooth',
        block:'start'
      })
    }
  }


  return (
    <section
      className="relative w-full py-10 lg:py-0 font-pop flex items-center justify-center overflow-hidden"
      style={{
        minHeight: 'calc(100vh - 84px)',
      
      }}>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(150%_100%_at_50%_0%,#fff_40%,rgba(0,200,0,0.45)_100%)]"></div>

     <div className="max-w-[85%] xl:-mt-[5%] xl:pl-[8%]  mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 xl:gap-1">
        
        {/* Left Content */}
        <div className="flex-2 flex-col items-center justify-center text-center lg:text-left">
          <h1 className="text-4xl md:text-[5.5xl] lg:text-6xl font-bold text-gray-800 leading-[1.2] tracking-wide">
            Discover and Shop,<br />from Local Vendors
          </h1>

          <p className="pt-4 pl-2 text-xl text-gray-500">
            Bringing your neighborhood online.
          </p>
          <button onClick={scroll} className="mt-6 ml-2 px-6 py-3 bg-[#40916C] text-white text-lg font-semibold rounded-lg cursor-pointer hover:bg-[#00b894] transition">
            Start Shopping
          </button>
        </div>
        {/* Right Content */}
        <div className=' lg:pt-30'>
          <img
            src={logImage}
            alt="Shopping Illustration"
            className="w-full lg:max-w-md mx-auto"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;
