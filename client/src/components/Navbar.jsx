import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStateContext } from '../context/stateContext';
// import {ReactComponent as CaretIcon } from "./icon/caret.svg";


const Navbar = () => {

    const [menu, setMenu] = useState(false)
    let menuRef = useRef()    
    const users = { name: "JOHN", }
    const { user } = useAuth()
    const { cart } = useStateContext()

  
  const closeOpenMenus = useCallback((e) => {
    if (menuRef.current && menu && !menuRef.current.contains(e.target)) {
      setMenu(false);
    }
  },[menu])

  useEffect(() => {
    document.addEventListener("mousedown", closeOpenMenus);
    return() => {
      document.removeEventListener("mousedown", closeOpenMenus);
    }
  }, [closeOpenMenus]);


  return (
    <>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/store">store</NavLink></li>
          <li><NavLink to="/">contact</NavLink></li>
          <li><NavLink to="/checkout">checkout</NavLink></li>
          <li className="reg-login-user">
            {
                user ?
                (
                  <NavItem /*icon={<CartIcon />} */ text={user.name} link={"/dashboard"}>
                    <DropMenu />
                  </NavItem>
                ) : (
                  <NavLink ref={menuRef} onClick={() => {setMenu(!menu)}} className="signInOption">
                    Hi, sign in
                    <div className={`dropdown_menu ${menu ? "active" : "inactive"}`}>
                      <DropdownItem />
                    </div>
                  </NavLink>
                )
            }
          </li>
          <li>
            <NavLink to="/cart">Cart</NavLink>
            {cart.totalCount > 0 && <span>{cart.totalCount}</span>}
          </li>
        </ul>
      </nav>
    </>
  )
}


function DropdownItem(prop) {
    return (
        <>
          <div className="sign_dropdown">
            <NavLink to="/login" className="signIn_button">
              Sign in
            </NavLink>
            <p className="register_link">
              New customer?
              <NavLink to="/register">
                Start here
              </NavLink>
            </p>
          </div>
        </>
    )
}


function NavItem(props) {

    const [open, setOpen] = useState(false)

    return (
        <>
          <NavLink className='names' to={props.link} onClick={() => setOpen(!open)}>{props.text}</NavLink>
          {open && props.children}
        </>
    )
}

function DropMenu() {
    
    const { logout } = useAuth()

    function DropItem(props) {
        return (
            <a href={props.href} className='menu-item' onClick={props.click}>
                <span className='icon-button'>{props.leftIcon}</span>
                {props.children}
                <span className='icon-right'>{props.rightIcon}</span>
            </a>
        )
    }

    return (
        <div className="dropdown">
            <div><DropItem href={"/profile"}>Profile</DropItem></div>
            <div><DropItem>orders</DropItem></div>
            <div><DropItem click={logout}>Logout</DropItem></div>
            {/* <div><DropItem leftIcon={<FaChevronLeft />} rightIcon={<FaChevronRight />}>settings</DropItem></div> */}
        </div>
    )
}


export default Navbar