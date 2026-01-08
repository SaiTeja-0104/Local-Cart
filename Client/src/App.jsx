import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home.jsx'
import Vendors from './pages/Vendors.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Store from './pages/Store.jsx'
import Product from './pages/Product.jsx'
import Items from './pages/Items.jsx'
import Login from './pages/Login.jsx'
import Cart from './pages/Cart.jsx'
import RegisterVendor from './components/RegisterVendor.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Order from './pages/Order.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Success from './pages/Success.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Failed from './pages/Failed.jsx'

const App = () => {
  const loc = useLocation();

  return (
    <div>
        <ToastContainer />
        <ScrollToTop />
        {window.location.pathname != '/' &&
        //   <div className="absolute inset-0 -z-2  w-full bg-white bg-[radial-gradient(120%_120%_at_50%_-60%,rgba(0,200,0,0.7)_0,rgba(0,200,0,0)_80%)]"></div>
        <div className="absolute inset-0 -z-2 w-full bg-[radial-gradient(120%_120%_at_50%_-60%,rgba(0,200,0,0.7)_0,rgba(0,200,0,0)_80%)]"></div>

        }
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/vendors' element={<Vendors />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/vendor/:vid' element={<Store />} />
          <Route path='/vendor/:vid/:pid' element={<Product />} />
          <Route path='/items/:cid' element={<Items />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/vendorRegister' element={<RegisterVendor />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/my-orders' element={<Order />} /> 
          <Route path='/success' element={<Success/>}/>
          <Route path='/failed' element={<Failed/>}/>
        </Routes>
        <Footer />

    </div>
  )
}

export default App
