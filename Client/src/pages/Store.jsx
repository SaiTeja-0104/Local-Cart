import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/TItle'
import { Context } from '../context/Context'
import ProductItem from '../components/ProductItem'
import Location from '../components/Location'
import Reviews from '../components/Reviews'

const Store = () => {
  const { vid } = useParams()
  const { products, vendor, } = useContext(Context)
  const [productData, setProductData] = useState([])
  const [vendorData, setVendorData] = useState(null)
  const [image, setImage] = useState('')

  useEffect(() => {
    const matchedVendor = vendor.find(item => item._id.toString() === vid)
    if (matchedVendor) {
      setVendorData(matchedVendor)
      setImage(matchedVendor.banner || '')
    }

    const filteredProducts = products.filter(item => item.vendor === vid)
    setProductData(filteredProducts)
  }, [vid, vendor, products])

  if (!vendorData) return <div className='opacity-0'></div>

  return (
    <div className='relative'>
    <div className="absolute inset-0 -z-3 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

    <div className='max-w-[80%] mx-auto my-10'>
      <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
        <div className='max-w-[600px] flex-2 w-full overflow-hidden rounded-lg border border-[#40916c]'>
          <img src={image} className='w-full h-full object-fill' alt="Vendor Banner" />
        </div>
        <div className='flex-1 flex-col space-y-3 items-center my-4 font-inter leading-tight'>
          <div>
            <h1 className='text-black text-3xl sm:text-4xl md:text-5xl font-bold'>{vendorData.name}</h1>
            <p className='font-normal pt-3 text-gray-600'>Located in</p>
            <p className='font-light pb-1 text-gray-500'>{vendorData.loc}, {vendorData.subloc}</p>
          </div>
          <div className='flex gap-1 items-center opacity-70'>
            <img src={assets.star} className='w-4' alt="Star Rating" />
            <span>{vendorData.star} <span className='text-gray-400 font-light'>(1k+)</span></span>
          </div>
          <div className='mt-8 font-light'>
            <p className='font-normal text-gray-600'>About Vendor:</p>
            <p className='text-gray-500 mt-1 leading-normal'>{vendorData.description}</p>
          </div>
        </div>
      </div>

      <hr className='w-full bg-gray-300 h-0.5 my-5 md:my-10' />

      <div className='px-1'>
        <Title text1={'ALL'} text2={'PRODUCTS'} />
        {productData.length > 0 ? (
          <div className='mt-5 mb-10 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-5'>
            {productData.map((item, idx) => (
              <ProductItem
              key={idx}
              id={item._id}
              vid={vendorData._id}
              name={item.name}
              src={item.images?.[0] || ''}
              price={item.price}
              quantity={item.quantity}
              />
            ))}
          </div>
        ) : (
          <div className='text-center text-gray-300'>
            Products will be updated soon...
          </div>
        )}
      </div>

      <Reviews />

      <div className='px-2 mt-20 font-pop'>
        <h2 className='text-black mb-8 text-xl sm:text-2xl md:text-3xl font-normal font-outfit'>
          Locate the Store Here
        </h2>
        <Location src={vendorData.map}/>
        </div>
      </div>
    </div>
  )
}

export default Store
