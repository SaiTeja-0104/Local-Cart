import { useContext, useEffect, useState } from 'react'
import star from '../assets/star_icon.png'
import { useParams } from 'react-router-dom'
import { Context } from '../context/Context'
import Reviews from '../components/Reviews'
import { toast } from 'react-toastify'

const Product = () => {
    const {pid} = useParams()
    const {products,vendor,currency,addToCart} = useContext(Context)
    const [productData,setProductData] = useState(null)
    const [vendorData,setVendorData] = useState(null)
    const [image,setImage] = useState('')

    const handleAdd = async ()=>{
        if(await addToCart(pid)==true){
            toast.success(`${productData.name} added to cart`,{
                autoClose:1000
            })
        }
    }

    const fetchProductData = ()=>{
        const itm = products.find(item=>item._id.toString()===pid)
        setProductData(itm)
        setImage(itm.images?.[0])
        const ven = vendor.find(item=>item._id.toString()===itm.vendor)
        setVendorData(ven)
    }

    useEffect(()=>{
        fetchProductData()
    },[pid,products])

  return productData ? (
    <div className='relative'>
        <div className="absolute inset-0 -z-3 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

    <div className='max-w-[80%] mx-auto py-10'>
      <div className='flex flex-col sm:flex-row gap-5'>
        <div className=' sm:max-w-[50%] flex-col'>
            <img src={image} className='w-full border border-gray-500 rounded-xl sm:h-[550px]' alt="" />
            {productData.images.length > 1 ? <div className='flex px-1 py-2 gap-4'>
            {
                productData.images.map((item,idx)=>(
                    <img onClick={()=>setImage(item)} className='max-w-1/4 cursor-pointer' src={item} key={idx} alt="" />
                ))
            }
            </div> : <div></div>}
        </div>
        <div className='pt-5 flex-1 flex-col font-pop'>
            <p className='text-black mb-3 text-3xl sm:text-4xl md:text-5xl font-semibold font-outfit'>{productData.name}</p>
            <p className='text-xl'><span className='text-gray-400 mb-1'>Seller: </span>{vendorData.name}</p>
            <p className='text-lg'><span className='text-gray-400'>Quantity:</span> {productData.quantity} {productData.units=='pieces'?(productData.quantity==1?'piece':'pieces'):productData.units}</p>
            <p className='flex items-center mb-2 gap-2 mt-3 text-xl'>
                <img src={star} className='w-5' alt="" />
                <p>{vendorData.star}</p>
            </p>
            <p className='text-xl text-gray-400'>Price:</p>
                <span className=' text-xl  font-semibold'>{currency}{productData.price}.00  </span >
                <span className='line-through text-gray-400'>₹{Math.round((productData.price)*1.10)}.00</span>
            <p className='text-xl pt-1'><span className=' text-green-600 font-semibold'>10%</span > off</p>
            <button onClick={handleAdd} className='w-3/4 mt-8 py-3 text-green-700 border border-green-700 bg-white hover:text-white cursor-pointer  text-lg hover:bg-green-700 rounded-md'>Add to Cart</button>
        </div>
      </div>
      <Reviews />
    </div>
    </div>
  ) : <div className='text-center text-gray-500'>Sorry!<br />No Product found...</div>
}

export default Product
