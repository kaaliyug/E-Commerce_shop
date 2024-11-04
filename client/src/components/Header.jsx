import React, { useEffect } from 'react'
import Navbar from './Navbar';
import Loading from './Loading';
import {setLoadingInterceptor} from "../interceptors/loadingInterceptors"
import { useStateContext } from '../context/stateContext';
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo.webp"


const Header = () => {

  const { showLoading, hideLoading } = useStateContext()

  useEffect(()=>{
     setLoadingInterceptor({ showLoading, hideLoading })
  },[])

  return (
    <>
      <div className="wrapper" id="head_wrap">
        <h1>
          <NavLink>
            <img src={logo} alt="ezone" />
          </NavLink>
        </h1>
        <Navbar />
      </div>
      <Loading />
    </>
  )
}

export default Header