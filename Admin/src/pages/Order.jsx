import { useState, useEffect } from "react";
import { backendUrl, currency } from "../AppAdmin";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/order/vendor`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
      console.log(response.data)
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

 const handleStatusChange = async (orderId, newStatus) => {
  try {
    await axios.put(
      `${backendUrl}/order/status/${orderId}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("Order status updated!");
    fetchOrders(); // refresh vendor orders
  } catch (err) {
    console.error("Error updating status:", err);
    toast.error("Failed to update status");
  }
};



  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold">Vendor Orders</h3>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order, idx) => (
          <div
            key={order._id || idx}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 rounded-lg bg-white"
          >
            {/* icon */}
            <img src={assets.parcel_icon} className="w-12" alt="order" />

            {/* products */}
            <div>
              <h4 className="font-semibold mb-2">Products</h4>
              {order.products.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between border-b py-1"
                >
                  <span>
                    {item.product?.name} ({currency}
                    {item.product?.price})
                  </span>
                  <span>x {item.quantity}</span>
                </div>
              ))}
              <p className="mt-2 font-medium">
                Total: {currency}
                {order.totalPrice}
              </p>
            </div>

            {/* customer details */}
            <div className="pl-1">
              <h4 className="font-semibold mb-2">Customer</h4>
              <p>{order.details?.name}</p>
              <p>{order.details?.address}</p>
              <p>{order.details?.phone}</p>
              <p className="pt-1 font-semibold">
                Payment: {order.details?.method}
              </p>
            </div>

            {/* vendor-specific status */}
            <div>
              <h4 className="font-semibold mb-2">Status</h4>
              <select
                value={order.currentVendorStatus}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="border px-2 py-1 rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* date */}
            <div>
              <h4 className="font-semibold mb-2">Date</h4>
              <p>{new Date(order.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Order;
