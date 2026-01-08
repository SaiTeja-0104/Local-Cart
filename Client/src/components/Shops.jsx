import ProductItem from './ProductItem'
import Category from './Category'
import Title from './TItle'
import { useContext } from 'react'
import { Context } from '../context/Context'
import { Link } from 'react-router-dom'

const Shops = () => {
  const {products} = useContext(Context)
  const bestSeller = products.filter(item=>item.bestSeller===true).slice(0,8)
  return (
    <div id='shop' className='relative '> 
  <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
  <div className='py-13 px-8 w-full sm:max-w-[80%] sm:mx-auto'>
    <Title text1={'ALL'} text2={'CATEGORIES'}/>
    <div className='product-scroll flex items-center gap-5 overflow-x-auto'>
      <Category />
    </div>
    <p className='my-18'></p>
    <div className='flex sm:flex-row flex-col sm:items-center justify-between'>
      <Title text1={'FEATURED'} text2={'PRODUCTS'} />
      <Link to={'/items/all'}>
        <button className='px-3 py-3 border border-gray-400 rounded-lg mr-8 mb-3 cursor-pointer hover:text-white hover:bg-green-600 hover:border-green-600 font-semibold w-auto'>
          View All
        </button>
      </Link>
    </div>
    <div className='mt-5 mb-10 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-5'>
      {
        bestSeller.map((item, idx) => (
          <ProductItem key={idx} vid={item.vendor} id={item._id} name={item.name} src={item.images[0]} price={item.price} quantity={item.quantity}/>
        ))
      }
    </div>
  </div>
</div>

  )
}

export default Shops
