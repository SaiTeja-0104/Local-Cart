import {useState} from 'react'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Route,Routes } from 'react-router-dom'
import List from './pages/List.jsx'
import Add from './pages/Add.jsx'
import Order from './pages/Order.jsx'
import LoginVendor from './components/LoginVendor.jsx'
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react'
import axios from 'axios'

export const backendUrl = "https://localcart-51js.onrender.com";
export const currency = '₹';

const AppAdmin = () => {
  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
  const [valid,setValid] = useState(false)

  const login = async(tk)=>{
    try{
      const response = await axios.get(`${backendUrl}/vendor/products`,
        {
          headers: {Authorization: `Bearer ${tk}`,},
        }
      );
      
      if(response.data){
        setValid(true)
      }
      else{
        setValid(false)
        setToken('')
        localStorage.removeItem('token')
      }
    }
    catch(e){
      setValid(false)
      setToken('')
      localStorage.removeItem('token')
    }
  }

  useEffect(()=>{
    if(token!==''){
      login(token)
    }
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {
        
        token==="" || !valid
        ?<LoginVendor setToken={setToken} />
        :
        <>
          <Navbar setToken={setToken} token={token} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token} />}/>
                <Route path='/list' element={<List token={token} />}/>
                <Route path='/orders' element={<Order token={token}/>}/>
              </Routes>
            </div>
          </div>
        </>
    }

    </div>
  )
}

export default AppAdmin
