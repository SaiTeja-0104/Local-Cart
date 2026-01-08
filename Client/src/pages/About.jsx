import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16 sm:mb-24">
        <h1 className=" text-3xl mb-3 sm:text-4xl md:text-5xl text-[#0a4d30] font-space font-bold">
          About Local Cart
        </h1>
        <p className="text-gray-500 text-sm sm:text-lg md:text-xl">
          Connecting local vendors to your doorstep
        </p>
      </div>


    <div className="flex flex-col items-center relative sm:space-y-26 space-y-20">
      {/* Mission Section - Odd (Left line) */}
        <div className="grid md:grid-cols-2  gap-12 border-2 border-black p-5 rounded-xl items-center w-full relative">
        <img
          src={assets.ourMission}
          alt="Our Mission"
          className="rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg">
            At Local Cart, our mission is to empower local vendors and provide
            customers with fresh, authentic products right from their community.
            We aim to make shopping convenient, reliable, and personalized.
          </p>
        </div>

        {/* Left Connector Line */}
        <div className="absolute left-[25%] top-full flex flex-col items-center ">
          <div className="w-0.5 sm:h-12 h-9 bg-gray-700"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
          <div className="w-0.5 sm:h-12 h-9 bg-gray-700"></div>
        </div>
      </div>

      {/* Story Section - Even (Right line) */}
      <div className="grid md:grid-cols-2 gap-12 border-2 border-gray-400 p-5 rounded-xl items-center w-full relative">
        <div className='sm:pl-2'>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
            Our Story
          </h2>
          <p className="text-gray-600 text-lg ">
            Local Cart started as a small initiative to help local shops reach
            more customers during challenging times. Today, we are proud to
            connect hundreds of vendors with thousands of happy customers,
            making local shopping easy and efficient.
          </p>
        </div>
        <img
          src={assets.ourStory}
          alt="Our Story"
          className="rounded-lg shadow-lg"
        />

        <div className="absolute left-[75%] top-full flex flex-col items-center ">
          <div className="w-0.5 sm:h-12 h-9 bg-gray-700"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
          <div className="w-0.5 sm:h-12 h-9 bg-gray-700"></div>
        </div>
        {/* Right Connector Line */}
        
      </div>

      {/* Values Section - Odd (Left line) */}
      <div className="grid md:grid-cols-2 gap-12 border-2 border-black p-5 rounded-xl w-full items-center relative">
        <img
          src={assets.ourValues}  
          alt="Our Values"
          className="rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Our Values</h2>
          <ul className="text-gray-600 text-lg">
            <li>
              <span className="font-semibold text-gray-700">Trust: </span> 
              We prioritize transparency and honesty in every transaction.
            </li>
            <li>
              <span className="font-semibold text-gray-700">Community: </span> 
              Supporting local businesses and creating a strong local economy.
            </li>
            <li>
              <span className="font-semibold text-gray-700">Convenience: </span> 
              Making it easy for customers to shop from their favorite local vendors.
            </li>
          </ul>
        </div>
      </div>
    </div>

      {/* CTA */}
      <div className="text-center mt-24">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Local Cart Today!</h2>
        <p className="text-gray-600 mb-6">
          Whether you're a vendor or a customer, Local Cart is here to make local shopping seamless.
        </p>
        <Link to='/'>
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
            Get Started !
          </button>
        </Link>
      </div>

    </div>
  )
}

export default About
