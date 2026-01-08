import search_icon from '../assets/search_icon.png'
import close from '../assets/cross_icon.png'
import { useEffect, useState } from 'react'

const SearchBox = () => {
  const [search,setSearch] = useState(false)

  return search ? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input type="text" className='outline-none text-sm' placeholder='Search' />
            <img onClick={()=>{setSearch(true)}} src={search_icon} className='w-4' alt="" />
        </div>
        <img onClick={()=>{setSearch(false)}} src={close} className='w-3 inline cursor-pointer' alt="" />
    </div>
  ) : null
}

export default SearchBox
