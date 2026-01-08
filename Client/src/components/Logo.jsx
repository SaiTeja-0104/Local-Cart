import logImage from '../assets/cart.png';
const Logo = () => {
  return (
    <div className="flex text-3xl items-center justify-center font-bold font-space text-[#31b181]">Local<span className='text-[#40916C]'>Cart</span>
          <img className='w-[50px]'  src={logImage} alt="" />
    </div>
  )
}

export default Logo
