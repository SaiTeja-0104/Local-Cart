import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ShopContextProvider from './context/Context.jsx'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <Elements stripe={stripePromise}>
      <App />
      </Elements>
    </ShopContextProvider>
  </BrowserRouter>,
)
