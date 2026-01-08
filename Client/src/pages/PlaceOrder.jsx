import { useState, useContext } from 'react'
import Title from '../components/TItle'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { Context } from '../context/Context'
import { toast } from 'react-toastify'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe("your_publishable_key_here"); // 🔑 replace with your Stripe publishable key

const PlaceOrder = () => {
  const { navigate, token, fetchCart, getCartAmount } = useContext(Context)
  const [method, setMethod] = useState('cod')

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const {backendUrl} = useContext(Context)

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const details = {
      name: fname + ' ' + lname,
      email,
      address: street + ', ' + city + ', ' + state + ', ' + zipcode + ', ' + country,
      phone,
      method: method === 'cod' ? 'Cash on Delivery' : 'Stripe'
    };

    try {
    if (method === "stripe") {
      // Create Stripe checkout session
      const res = await axios.post(
        `${backendUrl}/payment/create-checkout-session`,
        { details, amount: getCartAmount() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.url) {
        // Redirect to Stripe checkout
        window.location.href = res.data.url;
      } else {
        toast.error("Failed to create Stripe session");
      }
    } else {
      // Cash on Delivery → directly create order
      await axios.post(
        `${backendUrl}/order/create`,
        { details },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order placed successfully!");
      navigate("/my-orders");
      fetchCart();
    }
  } catch (err) {
    console.error("Error placing order:", err);
    toast.error("Something went wrong, please try again!");
  }

  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row px-3 justify-around gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input value={fname} onChange={(e) => setFname(e.target.value)} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name' type="text" />
          <input value={lname} onChange={(e) => setLname(e.target.value)} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last Name' type="text" />
        </div>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email address' type="email" />
        <input value={street} onChange={(e) => setStreet(e.target.value)} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' type="text" />
        <div className='flex gap-3'>
          <input value={city} onChange={(e) => setCity(e.target.value)} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' type="text" />
          <input value={state} onChange={(e) => setState(e.target.value)} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' type="text" />
        </div>
        <div className='flex gap-3'>
          <input value={zipcode} onChange={(e) => setZipcode(e.target.value)} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zipcode' type="number" />
          <input value={country} onChange={(e) => setCountry(e.target.value)} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' type="text" />
        </div>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone Number' type="number" />
      </div>

      {/* right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-15'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex flex-col gap-3 lg:flex-row'>
            <div onClick={() => { setMethod('stripe') }} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe} className='h-5 mx-4' alt="" />
            </div>
            <div onClick={() => { setMethod('cod') }} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div>
            <button className='cursor-pointer hover:bg-white hover:text-black border transition-all ease-linear font-semibold bg-black text-white text-sm my-8 px-8 py-3'>
              {method === 'stripe' ? 'PAY WITH STRIPE' : 'PLACE ORDER'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
