import {useState} from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../context/Context'

const RegisterVendor = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const [shopName,setShopName] = useState('')
    const [category,setCategory] = useState('')
    const [area,setArea] = useState('')
    const [city,setCity] = useState('')
    const [desc,setDesc] = useState('')
    const [map,setMap] = useState('')
    const [banner,setBanner] = useState(null)
    const [image,setImage] = useState(null)

    const [loading,setLoading] = useState(false)
    const {backendUrl} = useContext(Context)
    const loginPage = "https://localcart-sadmin.onrender.com"

    const uploadImageToCloudinary = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "localcart_unsigned");
        data.append("folder", "vendors");

        const res = await axios.post(import.meta.env.VITE_CLOUD_UPLOAD, 
        data
        );
        return res.data.secure_url;
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try{
            setLoading(true)
            const bannerUrl = banner ? await uploadImageToCloudinary(banner) : "https://res.cloudinary.com/dfp4zkiyn/image/upload/v1757774525/cydukbi7uynvnhghseea.png";
            const imageUrl = image ? await uploadImageToCloudinary(image) : "https://res.cloudinary.com/dfp4zkiyn/image/upload/v1757748690/xob5xptrhdfkoapi12ry.png";
            const userData = { name:shopName, email, password, role:"vendor" }
            const vendorData = {
                name: shopName,
                category,
                loc: area,
                subloc: city,
                description: desc,
                map,
                banner: bannerUrl,
                image: imageUrl
            }

            const vendorSignup = await axios.post(`${backendUrl}/user/signup`,userData)

            if(vendorSignup.data){
                const token = vendorSignup.data?.token
                if (!token) {
                    setLoading(false)
                    toast.error("Signup failed: No token received");
                    return;
                }   
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const vendorRegister = await axios.post(`${backendUrl}/vendor/create`,vendorData,config)

                if(vendorRegister.data){
                    setLoading(false)
                    toast.success("Vendor registered successfully! ")
                    toast.info("Login in Vendor Portal to add products.")
                    setEmail('')
                    setPassword('')
                    setShopName('')
                    setCategory('')
                    setArea('')
                    setCity('')
                    setDesc('')
                    setMap('')
                    setBanner(null)
                    setImage(null)
                }
                else{
                    setLoading(false)
                    toast.error("Error in registering vendor. Try again!")
                }
            }
            else{
                setLoading(false)
                toast.error("Error in signing up vendor. Try again!")
            }
        }
        catch(err){
            setLoading(false)
            toast.error("Error in registering vendor. Try again!")
        }
    }

  return (
    <div>
        {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex-col flex  items-center justify-center bg-gray-50 z-50">
          <img src={assets.saving} className="w-[125px]" alt="" />
          <div className="font-semibold text-xl ml-[-16px]">Registering Vendor...</div>
        </div>
      )}
    <div className='min-h-screen flex mt-10 items-center justify-center w-full'>
        <div className='bg-white shadow-lg border-t-4 border-gray-300  rounded-lg px-6 sm:px-10 sm:w-250 py-8 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Register a new Vendor</h1>
            <form onSubmit={onSubmitHandler} className='flex flex-col'>
                
                <div className='mb-3 min-w-72'>
                    <p  className='text-sm font-medium text-gray-700 mb-2'>Email address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required/>
                </div>
                <div className='mb-3 min-w-72'>
                    <p   className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' required/>
                </div>
                
                <div className='mb-3 min-w-72'>
                    <p  className='text-sm font-medium text-gray-700 mb-2'>Shop Name</p>
                    <input onChange={(e)=>setShopName(e.target.value)} value={shopName} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="text" placeholder='Enter your shop name' required/>
                </div>
                <div className='mb-3 min-w-72'>
                    <p  className='text-sm font-medium text-gray-700 mb-2'>Category</p>
                    <input onChange={(e)=>setCategory(e.target.value)} value={category} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="text" placeholder='Enter products category' required/>
                </div>
                <div className='mb-3 min-w-72'>
                    <p  className='text-sm font-medium text-gray-700 mb-2'>Area</p>
                    <input onChange={(e)=>setArea(e.target.value)} value={area} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="text" placeholder='Enter your Area' required/>
                </div>
                <div className='mb-3 min-w-72'>
                    <p  className='text-sm font-medium text-gray-700 mb-2'>City</p>
                    <input onChange={(e)=>setCity(e.target.value)} value={city} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="text" placeholder='Enter your City' required/>
                </div>
                <div className='mb-3 min-w-72'>
                    <p  className='text-sm font-medium text-gray-700 mb-2'>Description</p>
                    <textarea onChange={(e)=>setDesc(e.target.value)} value={desc} className='min-h-30 rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="text" placeholder='Enter about you' required/>
                </div>
                <div className='mb-3 min-w-72'>
                    <p  className='text-sm font-medium text-gray-700 mb-2'>Locate on Map</p>
                    <input onChange={(e)=>setMap(e.target.value)} value={map} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="text" placeholder='Share the location url' />
                </div>
                <div className='mb-3 min-w-72'>
                    <p  className='text-sm font-medium text-gray-700 mb-2'>Profile Image</p>
                    <input onChange={(e)=>{setImage(e.target.files[0])}} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="file" />
                </div>
                <div className='mb-3 min-w-72'>
                    <p  className='text-sm font-medium text-gray-700 mb-2'>Banner Image</p>
                    <input onChange={(e)=>{setBanner(e.target.files[0])}} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="file" />
                </div>
                <div className='px-2 flex mb-2  justify-between text-sm'>
                    <p className='text-gray-400'>Already have an account?</p>
                    <Link to={`${loginPage}`}><p className='text-gray-400 hover:text-blue-900 font-semibold'>Login here</p></Link>
                </div>

                <button className='cursor-pointer mt-4 w-full hover:bg-black font-semibold py-2 px-4 rounded-md text-white bg-gray-300 ease-in-out  transition-all' type='submit'>Register</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default RegisterVendor
