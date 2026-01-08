import { createContext, useEffect, useState } from "react";
import {  categories } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export const Context = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 9;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [token,setToken] = useState(localStorage.getItem('token') || '')
  const backendUrl = "https://localcart-51js.onrender.com";
  
  useEffect(() => {
    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/product/`);
        setProducts(response.data);

        const vendorResponse = await axios.get(`${backendUrl}/vendor/`);
        setVendor(vendorResponse.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${backendUrl}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const itemsArray = response.data; // ✅ it's already an array
      const items = {};
      itemsArray.forEach((item) => {
        items[item.product] = item.quantity; // product = productId
      });
      setCartItems(items);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);




// ✅ Add to cart (DB + state)
  const addToCart = async (productId, quantity = 1) => {
    if(token!==''){
      try {
        const response = await axios.post(
          `${backendUrl}/cart/add`,
          { productId, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const itemsArray = response.data; // ✅ backend should return updated cart array
        const items = {};
        itemsArray.forEach((item) => {
          items[item.product] = item.quantity;
        });
        setCartItems(items);
        return true;
      } catch (err) {
        localStorage.removeItem('token');
        setToken('')
        // toast.error("Failed to add to cart");
        toast.info("Login to add to cart")
        navigate('/login')
        return false;
      }
    }else{
      toast.info("Login to add to cart")
      navigate('/login')
      return false;
    }
  };


// ✅ Update quantity (DB + state)
  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await axios.put(
        `${backendUrl}/cart/update`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const itemsArray = response.data; // ✅ backend sends updated items
      const items = {};
      itemsArray.forEach((item) => {
        items[item.product] = item.quantity;
      });
      setCartItems(items);
    } catch (err) {
      toast.error("Failed to update cart");
    }
  };



// ✅ Count items
  const getCartCount = () =>
    Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

// ✅ Total price
  const getCartAmount = () =>
    Object.entries(cartItems).reduce((total, [productId, qty]) => {
      const item = products.find((p) => p._id === productId);
      return item ? total + item.price * qty : total;
    }, 0);



  const value = {
    backendUrl,
    fetchCart,
    token,
    setToken,
    products,
    vendor,
    categories,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    navigate,
    cartItems,
    setCartItems,
    updateQuantity,
    addToCart,
    getCartCount,
    getCartAmount,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default ShopContextProvider;
