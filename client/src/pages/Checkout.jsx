import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderServices';
import { useForm } from 'react-hook-form';

import { useStateContext } from '../context/stateContext';
import OrderItemsList from '../components/OrderItemsList';
import Input, { Button } from '../components/Input/Input';


const Checkout = () => {
  const { cart } = useStateContext();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ ...cart })

  const { register, formState: { errors }, handleSubmit, } = useForm()


  const submit = async data => {
    await createOrder({ ...order, name: data.name,  address: data.address })
    navigate("/payment")
  }

  return (
    <>
      <section className="checkout_page">
        <div className="wrapper">
          <h2>Checkout</h2>
          <p>Kindly complete your payment. Using a valid credit / debit card number.</p>
          <form onSubmit={handleSubmit(submit)}>
            <div className="content">
              <p>Personal information</p>
              <div className='user_data'>
                <Input defaultValue={user.name} label="Name" classInput="formUserInput" classContainer="formContainer"
                  {...register("name")}
                  error={errors.name} 
                />
                <Input defaultValue={user.address} label="Address" classInput="formUserInput" classContainer="formContainer"
                  {...register("address")} 
                  error={errors.address} 
                />
              </div>            
            </div>
            <div className='orderForm'>
              <OrderItemsList order={order} />
              <div className="payment_method">
                <Button
                  type="submit"
                  text="place order"
                  color="#fff"
                  fontSize="14px"
                  width="100%"
                  height="3rem"
                />
              </div>
            </div>
          </form>
        </div>  
      </section>
    </>
  )
}

export default Checkout