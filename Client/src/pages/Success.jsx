import { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../context/Context";


const Success = () => {
  const {backendUrl} = useContext(Context)
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const { token, navigate, fetchCart } = useContext(Context);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.get(`${backendUrl}/payment/check-session`, {
          params: { session_id },
        });

        if (res.data.success) {
          // ✅ Only create order if payment succeeded
          await axios.post(
            `${backendUrl}/order/create`,
            { details: res.data.session.metadata }, // or store details in metadata during session create
            { headers: { Authorization: `Bearer ${token}` } }
          );

          toast.success("Order placed successfully!");
          navigate("/my-orders");
          fetchCart();
        } else {
          toast.error("Payment verification failed!");
          navigate("/failed");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        toast.error("Something went wrong!");
      }
    };

    if (session_id) verifyPayment();
  }, [session_id]);

  return <div className="text-center my-10">Verifying payment, please wait...</div>;
};

export default Success;
