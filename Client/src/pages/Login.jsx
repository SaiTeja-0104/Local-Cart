import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { Context } from '../context/Context'

const Login = () => {
  const loc = useLocation()
  const type = loc.state?loc.state.type:'Sign Up';
  const [currentState,setCurrentState] = useState(type)

  const {backendUrl} = useContext(Context)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')

  const {setToken} = useContext(Context)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      const endpoint = currentState==='Login'?'/user/login':'/user/signup'
      const payload = currentState==='Login'?{email,password}:{name,email,password}
      const res = await axios.post(`${backendUrl}${endpoint}`,payload)
      if(res.data.success){
        toast.success(`${currentState} Successful`)
        setToken(res.data.token)
        localStorage.setItem('token',res.data.token)
        window.location.href='/'
      }
      else{
        toast.error(res.data.error)
      }
    }
    catch(err){
      toast.error(err.response?.data?.error || "Something went wrong")
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'> 
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='font-prata text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      { 
        currentState==='Login'?'':<input type="text" required value={name} onChange={(e)=>{setName(e.target.value)}} className='w-full px-3 py-2 border border-gray-800' placeholder='Name' name="" id="name" />
      }
      <input type="email" required className='w-full px-3 py-2 border border-gray-800' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' name="" id="email" />
      <input type="password" required className='w-full px-3 py-2 border border-gray-800' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' name="" id="password" />
      
        {
          currentState==='Sign Up' && ( 
            <div className='px-1 w-full flex justify-between text-sm mt-[-8px]'>
                <p className=' text-gray-400' >Already have an account?</p>
                <p className='cursor-pointer hover:text-blue-900 font-semibold' onClick={()=>setCurrentState('Login')}>Login Here</p>
            </div> )
        }
        {
          currentState==='Login' && ( 
            <div className='px-1 w-full flex justify-between text-sm mt-[-8px]'>
                <p className=' text-gray-400'>Create new Account?</p>
                <p className='cursor-pointer hover:text-blue-900 font-semibold' onClick={()=>setCurrentState('Sign Up')}>Sign Up</p>
            </div> )
        }
        
      <button className='cursor-pointer bg-black text-white font-light px-8 py-2 mt-4'>
        {
          currentState==='Login'?'Sign In':'Sign Up'
        }
        </button>
    </form>
  )
}

export default Login
