import Logo from './Logo'
import { useEffect, useState } from 'react'
import { backendUrl } from '../AppAdmin'
import axios from 'axios'
import { assets } from '../assets/assets'

const Navbar = ({setToken,token}) => {
  const [profile,setProfile] = useState(assets.user)
  const [vendor,setVendor] = useState({})
  const [click,setClick] = useState(false)
  const fetchVendor = async () => {
    try {
      const vendor = await axios.get(`${backendUrl}/vendor/me`, {
        headers: { Authorization: `Bearer ${token}` }
      }); 
      setVendor(vendor.data)
      if(vendor.data.image){
        setProfile(vendor.data.image)
      }
    }
    catch (error) {
      console.error('Error fetching vendor data:', error);
    }
  }

  useEffect(() => {
    fetchVendor();
  }, []);

  return (
    <div className='bg-white flex items-center py-4 px-[5%] justify-between'>
        <Logo />
        <div className='flex items-center justify-between gap-4'>
          <button onClick={()=>setToken('')} className='cursor-pointer hover:bg-green-600 bg-green-500 font-bold text-white px-4 py-1.5 sm:px-5 sm:py-1.5 rounded-full text-sm sm:text-md'>Logout</button>
          <div className='w-10 group cursor-pointer  border border-gray-600 rounded-full overflow-hidden'>
            <img onClick={()=>{
              setClick(true)
              setTimeout(()=>setClick(false),1000)
              }} src={profile} className='object-cover' alt="" />
            <div className={`${click?'block':'hidden'} sm:group-hover:block sm:hidden absolute bg-slate-100 text-gray-500 px-4 py-2.5 rounded-xl top-15 right-5`}>
              <p className='text-sm'>Welcome {vendor.name}!</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar
