import React from "react";
import { Link } from "react-router-dom";
import Price from "../components/Price";

export default function OrderItemsList({ order }) {
    return (
        <>
          <h3>your order items:</h3>
          <div className="order_items">
            <ul>
                <li className="title">
                    <span>product</span> 
                    <span>price</span>
                </li>
                <li className="order_items_container">
                    {order.items.map(item => (
                        <div className="items" key={item.food.id}>
                            <span className="image">
                                <Link to={`/product/${item.food.id}`}>
                                    <img src={item.food.imageUrl} />    
                                </Link>
                            </span>
                            <span className="name">{item.food.name}</span>
                            <div className="priceXquantity">
                                <div className="quantity">{item.quantity}</div>
                                <div><Price price={item.food.price} /></div>
                            </div>
                            <span className="prices"><Price price={item.price} /></span>
                        </div>                                    
                    ))}
                </li>
                <li className="subtotal">
                    <div>cart subtotal</div>
                    <div><Price price={order.totalPrice} /></div>
                </li>
                <li className="shipping">
                    <div>Shipping</div>
                    <div>Free shipping</div>
                </li>
                <li className="orderTotal">
                    <div>order total</div>
                    <div><Price price={order.totalPrice} /></div>
                </li>
            </ul>
          </div>
        </>
    )
}