import { useContext } from 'react'
import plus from '../assets/pluss.png'
import {Context} from '../context/Context.jsx'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProductItem = ({vid,id,name,src,price,quantity}) => {
  const {currency,addToCart} = useContext(Context)
  const handleAdd = async ()=>{
    const res = await addToCart(id)
    if(res==true){
      toast.success(`${name} added to cart`,{
        autoClose:1000
      })
    }
  }
  return (
    <div className=' flex flex-col items-center sm:min-w-[120px] md:min-w-[220px] '>
      <Link to={`/vendor/${vid}/${id}`}>
      <button className=' text-[#40916c] sm:max-w-[200px] font-semibold text-md sm:text-xl pt-2 pb-2 bg-[#c6e6d6] w-full text-center rounded-t-lg none'>{name}</button>

      <div className="cursor-pointer sm:max-w-[320px] sm:max-h-[240px] overflow-hidden mb-1">
        <img className="border border-gray-300  sm:max-w-[280px] sm:max-h-[200px] transition-transform duration-300 hover:scale-110"
          src={src}
          alt={name}
          />
      </div>
      </Link>

      <div className='w-full sm:max-w-[200px] sm:px-1 flex items-center text-[10px] sm:text-sm mb-3 justify-between text-gray-500'>
        <p className=''>Price: {currency}{price}</p>
        <p className=''>Quantity: {quantity}</p>
      </div>
      <div className='sm:px-1 sm:max-w-[200px] flex justify-center items-center gap-2'>
        <div className='flex-3 text-gray-500 text-center w-full sm:w-1/2 max-w-[200px] px-4 py-2 bg-[#8ce3bd] rounded-b-lg sm:rounded-lg  font-medium text-[10px] sm:text-sm hover:bg-[#7ce4b7] focus:outline-none focus:ring-2 focus:ring-[#40916C]'>
        <Link to={`/vendor/${vid}/${id}`}>
            <button className="cursor-pointer ">
              View Shop
            </button>
          </Link>
        </div>
        <div className='cursor-pointer flex-1 rounded-full '>
          <img onClick={handleAdd} src={plus} className='' alt="" />
        </div>
      </div>
    </div> 
  )
}

export default ProductItem