import Title from '../components/TItle'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import axios from 'axios'

const Order = () => {
  const { currency, token } = useContext(Context)
  const [orders, setOrder] = useState([])
  const {backendUrl} = useContext(Context)
  const [vendorId,setVendorId] = useState('')
  const dict = {
    "pending":"bg-blue-500",
    "processing":"bg-yellow-500",
    "shipped":"bg-lime-500",
    "delivered":"bg-green-500",
    "cancelled":"bg-red-500",
  }
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/order/my`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setOrder(response.data.reverse())

        const vendorProfile = await axios.get(`${backendUrl}/vendor/me`,{
          headers:{Authorization: `Bearer ${token}`},
        })
        setVendorId(vendorProfile.data._id)

      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    }
    fetchOrders()
  }, [token])

  return (
    <div className='max-w-[80%] mx-auto pt-16 '>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div className='md:px-5 mt-5 flex flex-col gap-6'>
        {orders.map((order) => (
          <div key={order._id} className="border border-gray-800 rounded-lg p-1 sm:p-4">
            
            {/* Order info */}
            <div className="flex font-space justify-between items-center mb-4">
              <p className="text-xs sm:text-sm p-1 text-gray-600">
                Order ID: {order._id}
              </p>
              <p className="text-xs sm:text-sm p-1 text-gray-600">
                Date: {new Date(order.updatedAt).toLocaleDateString('en-US', {
                  day: '2-digit', month: 'short', year: 'numeric'
                })}
              </p>
            </div>

            {/* Loop through products inside this order */}
            {order.products.map((item) => {
              const vendorStatusObj = order.vendorStatuses.find((vs) => vs.vendor === item.product.vendor || vs.vendor === vendorId);
               const status = vendorStatusObj?.status || "pending";
             return (
             <div key={item._id} className='py-4 mx-3 sm:mx-10 px-2 border border-gray-400 md:border-t-white md:border-l-white md:border-r-white md:border-b-gray-400 rounded-xl mb-3 text-gray-700 flex flex-col md:flex-row items-center md:justify-between gap-6'>
                <div className='w-full flex items-center gap-6 text-sm'>
                  <img src={item.product.images[0]} className='w-24 sm:w-32' alt="" />
                  <div className='flex-col'>
                    <p className='text-lg sm:text-xl font-medium'>{item.product.name}</p>
                    <div className='flex flex-col md:flex-row gap-3 mt-1 mb-1 text-base text-gray-700'>
                      <p className='sm:text-lg'>{currency} {item.product.price}</p>
                      <p className='sm:text-md text-gray-800'>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </div>
                <div className='w-3/4 lg:w-full items-center flex justify-evenly md:justify-between'>
                  <div className='flex items-center font-space gap-2'>
                    <p className={`min-w-2 h-2 rounded-full ${dict[status]}`}></p>
                    <p className='text-xs sm:text-sm lg:text-base'>{status}</p>
                  </div>
                  <button className='cursor-pointer border px-2 sm:px-4 py-1 md:py-2 text-xs sm:text-sm lg:text-base font-medium rounded-sm'>Track Order</button>
                </div>
              </div>
              )
            })}

            {/* Total price for this order */}
            <div className="flex font-space justify-between items-center gap-1 px-1 text-xs sm:text-sm font-medium pt-1 sm:pt-4">
              <p className='text-gray-400 font-light '>Payment mode: <span className='text-gray-700'>{order?.details?.method}</span></p>
              <p>
                Total: {currency} {order.totalPrice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order


