import { useState,useEffect, useContext } from 'react'
import {vendor,assets } from '../assets/assets'
import Title from '../components/TItle'
import VendorCard from '../components/VendorCard'
import { Link,Route } from 'react-router-dom'
import { Context } from '../context/Context'


const Vendors = () => {
  const {vendor} = useContext(Context)
  const [filterProducts,setFilterProducts] = useState([])
  const [search,setSearch] = useState('')

  useEffect(()=>{
    setFilterProducts(vendor)
  },[vendor])

  useEffect(()=>{
    const filter = vendor.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    setFilterProducts(filter)
  },[search])

  return (
    <div className='relative'>
    <div className="absolute inset-0 -z-3 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

    <div className='sm:max-w-[75%] relative min-h-screen sm:mx-auto'>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className='py-12 px-2 sm:py-20 text-center flex flex-col items-center '>
          <p className='pb-3 text-2xl  sm:text-4xl md:text-5xl text-[#0a4d30] font-space font-bold'>Support Your Local Vendors</p>
          <p className='text-gray-500 text-sm sm:text-lg md:text-xl'>Discover fresh groceries, handmade crafts, bakery</p>
          <p className='text-gray-500 text-sm sm:text-lg md:text-xl'>delights, and more from sellers near you.</p>
          <div className='w-[55%] sm:w-[35%] mt-8 flex gap-3 items-center border border-gray-400 px-5 py-3 rounded-2xl'>
            <img src={assets.search} className='w-4 h-4' alt="" />
            <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" className='text-gray-800 outline-none w-full' placeholder='Search Vendors...' />
          </div>
        </div>

        <div className='px-6 sm:px-0 mb-2'>
          <Title text1={'ALL'} text2={'VENDORS'}/>
        </div>
  
        <div className='mb-20 flex flex-col items-center '>
          <div className=' grid grid-cols-1 md:grid-cols-2 px-2 gap-x-20 gap-y-10 lg:grid-cols-3 2xl:grid-cols-4'>
            {filterProducts.map((item,idx)=>(
              <VendorCard key={idx} id={item._id} src={item.image} name={item.name} categ={item.category} loc={item.loc} subloc={item.subloc} stars={item.star}/>
            ))}
          </div>
        </div>
        
        <div className='max-w-[90%] mx-auto'>
          <div className='p-15 font-pop flex flex-col items-center justify-center bg-gray-100 w-full rounded-lg'>
            <p className='text-center text-3xl pb-2 sm:text-4xl font-semibold'>Are you a Vendor?</p>
            <p className='text-center font-light pb-8 text-gray-600'>Start selling on LocalCart today!</p>
            <Link to="/vendorRegister">
            <button className='text-md cursor-pointer border border-[#F8F9FA] px-6 py-4 rounded-full text-black hover:border-gray-500 bg-[#ffd903]'>Register as Vendor</button>
            </Link>
          </div>
        </div>

    </div>    </div>
  )
}

export default Vendors
