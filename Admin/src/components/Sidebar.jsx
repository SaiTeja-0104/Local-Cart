import React from 'react'
import { NavLink } from 'react-router-dom'
import {assets} from '../assets/assets.js'

const Sidebar = () => {
  return (
    <div className='w-[17%]  border-r-1 border-gray-400 h-[calc(100vh-70px)] sticky top-0 left-0 bg-white'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink className='flex items-center gap-3 border hover:bg-gray-200 border-gray-300 border-r-0 px-3 py-2 rounded-l-lg' to="/add">
            <img className='w-5 h-5' src={assets.add_icon} alt="add" />
            <p className='hidden md:block '>Add Items</p>
        </NavLink>
        
        <NavLink className='flex items-center gap-3 border border-gray-300 hover:bg-gray-200 border-r-0 px-3 py-2 rounded-l-lg' to="/list">
            <img className='w-5 h-5' src={assets.list_icon} alt="list" />
            <p className='hidden md:block '>List Items</p>
        </NavLink>
        
        <NavLink className='flex items-center gap-3 border border-gray-300 hover:bg-gray-200 border-r-0 px-3 py-2 rounded-l-lg' to="/orders">
            <img className='w-5 h-5' src={assets.parcel_icon} alt="order" />
            <p className='hidden md:block '>Orders</p>
        </NavLink>


      </div>
    </div>
  )
}

export default Sidebar
