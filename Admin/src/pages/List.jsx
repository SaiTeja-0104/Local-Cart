import React, { useState,useEffect } from 'react'
import { backendUrl, currency } from '../AppAdmin'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const List = ({token}) => {
  const [list,SetList] = useState([])
  const deleteProduct = async (id)=>{
    try{
      const response = await axios.delete(
        `${backendUrl}/product/${id}`,
        {
          headers: {
            Authorization:`Bearer ${token}`
          }
        }
      )
      if(response.data.success){
        toast.success(response.data.message)
        fetchList()
      }
      else{
        toast.error(response.data.message)
      }
    }
    catch(e){
      toast.error(e)
    }
  }
  const fetchList = async ()=>{
    try{
      const response = await axios.get(
        `${backendUrl}/vendor/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if(response.data){
        SetList(response.data)
      }
      else{
        toast.error(response.data.msg)
      }

    }
    catch(e){
      toast.error(e)
    }
  }
  useEffect(()=>{
    fetchList()
  },[])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List table title */}
        <div className='hidden md:grid text-center grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b className='items-center'>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {/* product list */}
        { list.length === 0 ? <p className='text-center text-gray-400 mt-8'>No products added yet!</p> :
          list.map((item,index)=>{
            return (<div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center gap-2 py-2 px-6 border text-sm' key={index}>
              <img className='rounded-xl min-w-18' src={item.images?.[0]} alt="" />
              <p className='text-center sm:text-lg'>{item.name}</p>
              <p className='text-center sm:text-md'>{item.category}</p>
              <p className='text-center sm:text-md'>{currency} {item.price}</p>
              <div className='flex gap-5 items-center justify-center'>
                <img onClick={()=>{deleteProduct(item._id)}} src={assets.trash} className='w-3 sm:w-5 cursor-pointer' alt="" />
              </div>
            </div>)
          })
        }
      </div>
    </>
  )
}

export default List
