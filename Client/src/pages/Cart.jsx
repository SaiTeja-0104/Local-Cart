import { useContext } from "react";
import Title from "../components/TItle";
import { assets } from "../assets/assets";
import { Context } from "../context/Context";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(Context);

  const cartEntries = Object.entries(cartItems).filter(([_, quantity]) => quantity > 0);

  const onCheckout = () => {
    if (cartEntries.length === 0){
      toast.error("Your cart is empty!");
      return;
    }
    else{
      navigate('/place-order');
    }
  }

  return (
    <div>
          {/* <div className="absolute inset-0 -z-3 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div> */}

    <div className="pt-14 max-w-[80%] mx-auto">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div>
        {cartEntries.length === 0 && (
          <p className="text-gray-300 ml-3 mt-3 ">Your cart is empty....</p>
        )}
        {cartEntries.map(([itemId, quantity]) => {
          const productData = products.find((product) => product._id.toString() === itemId);
          if (!productData) return null;
          
          return (
            <div
            key={itemId}
            className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={productData.images[0]} alt={productData.name} />
                <div className="pt-2">
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex sm:text-md items-center gap-2 mt-2">
                    <p>
                      {currency} {productData.price}
                    </p>
                  </div>
                </div>
              </div>

              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > 0) updateQuantity(itemId, value);
                }}
                className="border border-gray-300 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                />

              <img
                onClick={() => updateQuantity(itemId, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin}
                alt="Remove item"
                />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={() => {onCheckout()}} className="bg-black text-white text-sm my-8 px-8 py-3">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
        </div>
  );
};

export default Cart;
