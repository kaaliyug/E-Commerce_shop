import React, { useEffect }  from 'react'
import { useStateContext } from '../context/stateContext';
import { pay } from '../services/orderServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import {PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer} from "@paypal/react-paypal-js"

export default function PaypalButtons({ order }) {
  const initialOptions = {
        "client-id":
            "AWgIHR7dpS8kMM7yLqO5i1pDu_8w4lJkEWZsjg69zzDOF9S7ELKudbBKG_ce3kq1v-brLu7ty0-i8g1m",
            // 'AVZ_MlFniZBRws3lc_u3FmFZiXLlQLkCiYAyuA0eHgA0trU7HOrxeUR_X9xg6OW6D7tS3iCbgqKVSXlR',
        "enable-funding": "venmo",
        "disable-funding": "",
        "buyer-country": "US",
        currency: "USD",
        "data-page-type": "product-details",
        components: "buttons",
        "data-sdk-integration-source": "developer-studio",
    };
    return (
      <div>
        <PayPalScriptProvider options={initialOptions}>
        {/* // options={{ clientId:"AVZ_MlFniZBRws3lc_u3FmFZiXLlQLkCiYAyuA0eHgA0trU7HOrxeUR_X9xg6OW6D7tS3iCbgqKVSXlR" }} */}
           <Buttons order={order} />
        </PayPalScriptProvider>
      </div>
    )
  }
  

  function Buttons({ order }) {
    const { clearCart } = useStateContext()
    const navigate = useNavigate()
    const [{ isPending }] = usePayPalScriptReducer()
    const {showLoading, hideLoading} = useStateContext()
  
    useEffect(()=>{
      isPending ? showLoading() : hideLoading();
    })
    // 3 events to paypal button
    // create an order
    const createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: order.totalPrice,
            },
          },
        ],
      })
    }
  
    const onApprove = async (data, actions) => {
      try{
        /** get the payment from the paypal */
        const payment = await actions.order.capture();
        const orderId = await pay(payment.id)
        clearCart();
        toast.success("Payment Saved Successfully", "Success");
        navigate("/track/" + orderId)
      } catch (error) {
        toast.error("Payment Save failed", "Error");
      }
    }
  
    const onError = err => {
      toast.error("Payment Failed", "Error");
    }
  
    return (
      <PayPalButtons style={{ shape: "rect", layout: "vertical", color: "gold", label: "paypal", }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError} />
    )
  }
  