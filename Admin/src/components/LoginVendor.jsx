import {useState} from 'react'
import axios from 'axios'
import {backendUrl} from '../AppAdmin'
import { toast } from 'react-toastify'

const LoginVendor = ({setToken}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post(
                `${backendUrl}/user/login`,
                { email, password }
            );
            // console.log("Login response:", response);
            if(response){
                setToken(response.data.token)
                setEmail('')
                setPassword('')
                toast.success("Logged in successfully")
            }
            else{
                toast.error(response.data.error)
            }
        }
        catch(e){
            if (e.response && e.response.data && e.response.data.error) {
                toast.error(e.response.data.error); // show backend error
            } else {
                toast.error("Login failed. Please try again.");
            }
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Vendor Panel</h1>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-72'>
                <p  className='text-sm font-medium text-gray-700 mb-2'>Email address</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required/>
            </div>
            <div className='mb-3 min-w-72'>
                <p   className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' required/>
            </div>
            <button className='cursor-pointer mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginVendor
