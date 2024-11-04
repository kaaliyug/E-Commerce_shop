import React, { useEffect, useState }  from 'react'
import PaypalButtons from './PaypalButtons';
import { getNewOrderForCurrentUser } from '../services/orderServices';
import OrderItemsList from '../components/OrderItemsList';



export const Payment = () => {
    const [order, setOrder] = useState()

    useEffect(() => {
        getNewOrderForCurrentUser().then(data => setOrder(data))
        /** get the data of the new order from the server */
    }, [])
    console.log(order)

    if (!order) return; // if the order is not available don't show anything   

  return (
    <>
      <div className='payment_wrapper'>
        <div className='content'>
          <h2 className='payment_method'>Select a payment method</h2>
          <div className='summary'>
            <h3 className='order_details'>1 Order Details</h3>
            <div className='name'>
              <h3>Name:</h3>
              <span>{order.name}</span>
            </div>
            <div className='address'>
              <h3>address:</h3>
              <span>{order.address}</span>
            </div>
          </div>
          <h3 className='reviewItems'>2 Review items and delivery : </h3>
          <div className='orderForm'>
            <OrderItemsList order={order} />
          </div>  
        </div>
        <div className="button_container">
          <div className='buttons'>
            <PaypalButtons order={order} />
          </div>  
        </div>
      </div>
    </>
  )
}


