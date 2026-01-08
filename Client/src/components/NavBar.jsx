import { useState, useEffect, useContext } from 'react';
import Logo from './Logo';
import menu from '../assets/menu_icon.png';
import dropdown from '../assets/dropdown_icon.png';
import { Link,NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Context } from '../context/Context';

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const {getCartCount,token,setToken} = useContext(Context)
  const [open,setOpen] = useState(false)

  return (
    <div className="relative w-full z-50"
      style={{
        position: 'relative',
        top: 0,
        left: 0,
      }}
    >


    <div className='flex items-center px-6 py-6 justify-around font-space'>
        <Link to='/'>
          <Logo />
        </Link>
        {/* Show nav links on desktop only */}
        
        <nav className={`hidden transition-all ease-in-out  border-green-600 py-3 px-12 rounded-4xl sm:flex space-x-6 text-gray-700`}>
          <NavLink to="/" className='flex flex-col items-center gap-0.5'>
            Home
            <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink to="/vendors" className='flex flex-col items-center gap-0.5'>
            Vendors
            <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink to="/about" className='flex flex-col items-center gap-0.5'>
            About
            <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' /></NavLink>
          <NavLink to="/contact" className='flex flex-col items-center gap-0.5'>
            Contact
            <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' /></NavLink>
        </nav>


        <div className='flex gap-3 sm:gap-6'>
          <Link to='/cart' className='relative'>
              <img src={assets.cart} className='w-5 min-w-5' alt=""/>
              <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                {getCartCount()}
              </p>
          </Link>
          <div className="group relative">
            <Link to={token==''?'/login':window.location}><img onClick={()=>{
              setOpen(true)
              setTimeout(()=>setOpen(false),2000)
            }} src={assets.profile} className='w-5 cursor-pointer' alt="" /></Link>
            <div className={`${open?'block':'hidden'} sm:group-hover:block sm:hidden absolute dropdown-menu right-0 pt-4`}>
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                    <Link to='/'>
                      <p className='cursor-pointer hover:text-black'>My Profile</p>
                    </Link>
                    <Link to='/my-orders'>
                    <p className='cursor-pointer hover:text-black'>Orders</p>
                    </Link>
                    {
                      token &&
                      <Link to='/login'>
                      <p onClick={()=>{
                        setToken('');
                        localStorage.removeItem('token');
                      }} className='cursor-pointer hover:text-black'>Logout</p>
                      </Link>
                    }
                </div>
            </div>
          </div>
          <img
            onClick={() => setVisible(true)}
            src={menu}
            alt=""
            className='w-5 cursor-pointer sm:hidden'
          />
        </div>      
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`fixed top-0 right-0 h-screen bg-white transition-all duration-300 z-50
          ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600 h-full overflow-y-auto">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 border-b">
            <img src={dropdown} alt="" className="h-4 rotate-180" />
            <p>Back</p>
          </div>
            <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
            <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/vendors'>VENDORS</NavLink>
            <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
            <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>

    </div>
  );
};

export default NavBar;
