import React, { useState } from 'react'
import { useStateContext } from '../context/stateContext';
import Pagination from './Store/Pagination';
import { Link } from 'react-router-dom';
import Price from '../components/Price';
import cartbanner from "../assets/cartbanner.webp"
import NotFound from '../components/NotFound/NotFound';


const CartPage = () => {

  const [pageNumber, setPageNumber] = useState(0)
  const productPerPage = 3
  const pagesVisited = pageNumber * productPerPage
  const { cart, removeFromCart, changeQuantity } = useStateContext()  

  return (
    <>
      <section className="cart_page">
        <h2 style={{backgroundImage:`url(${cartbanner})`}}>cart page</h2>
        {cart.items.length === 0 ? 
        (<NotFound message="cart page is empty!" />) : (
          <div className="cartPage_container">

            <div className='titles'>
              <p>products</p>
              <p>products Name</p>
              <p>Quantity</p>
              <p>Price / Total</p>
              <p>Delete</p>
            </div>            

            <ul className="cart_list">
              {cart.items.slice(pagesVisited, pagesVisited + productPerPage).map(item => (
                <li key={item.food.id}>
                  <div className='cart_image'>                    
                    <img src={item.food.imageUrl} alt={item.food.name} />
                  </div>
                  <div className='cart_product_name'>
                    <Link to={`/product/${item.food.id}`}>{item.food.name}</Link>
                  </div>
                  <div className='cart_product_quantity'>
                    <div className='custom-select'>
                      <select value={item.quantity} onChange={e => changeQuantity(item, Number(e.target.value))}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                      <span className='custom-arrow'></span>
                    </div>
                  </div>
                  <div className='cart_product_price'>                     
                    <Price price={item.price} />
                  </div>
                  <div className='cart_product_remove'>
                    <button className='remove_button' onClick={() => removeFromCart(item.food.id)}><span></span>remove 🗑️<span></span></button>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className='pagination'>
                <Pagination productPerPage={productPerPage} setPageNumber={setPageNumber} products={ cart.items } />
            </div>

            <div className='checkout'>
              <h4>cart total</h4>
              <ul>
                <li className='products_count'>
                  <span>total products</span>
                  <span>{cart.totalCount}</span>
                </li>
                <li className='total_price'>
                  <span>sub total</span>
                  <span><Price price={cart.totalPrice} /></span>
                </li>
                <li className='shipping_price'>
                  <span>shipping</span>
                  <span>0</span>
                </li>
                <li className='order_total'>
                  <span>order total</span>
                  <span><Price price={cart.totalPrice} /></span>
                </li>
              </ul>
              <Link to="/checkout" className="checkout_button">Proceed to Checkout</Link>              
              <Link to="/checkout" className="payment_button">payment</Link>
            </div>

          </div>
        )}
      </section>
    </>
  )
}

export default CartPage