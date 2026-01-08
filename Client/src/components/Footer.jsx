import Logo from "./Logo"
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <div style={{
        background: 'linear-gradient(135deg, #c6e6d6 0%, #9fd8b6 100%)'
    }}>

    <div className="max-w-[75%] mx-auto font-space" >

    <div className='pt-12 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-10 mt-20 text-sm'>
      <div className="flex flex-col">
        <Logo/>
        <p className='text-center text-gray-600'>Buy Fresh, Authentic and Local - All in one place.</p>
      </div>
      <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <Link to='/'>
              <li>Home</li>
            </Link>
            <Link to='/about'>
              <li>About us</li>
            </Link>
            <Link to='/contact'>
              <li>Contact</li>
            </Link>
            <li>Privacy Policy</li>
        </ul>
      </div>

      <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>040-712-6060</li>
            <li>contact@localcart.com</li>
        </ul>
      </div>
    </div>
    <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright {new Date().getFullYear()} &copy; localcart.com - All Rights are Reserved.</p>
    </div>
    </div>
    </div>
  )
}

export default Footer
