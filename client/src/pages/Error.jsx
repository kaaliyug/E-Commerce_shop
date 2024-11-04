import React from 'react'
import { NavLink } from 'react-router-dom';
import e1 from "../assets/e1.webp"
import e2 from "../assets/e2.webp"
import page_not_found from "../assets/page-not-found.webp"
import { FaLongArrowAltLeft } from "react-icons/fa";


const Error = ({errorMessage1, errorMessage2, linkRoute, linkText}) => {
  return (
    <>
        <section id="error-page">
          <figure style={{backgroundImage:`url(${page_not_found})`}} className="error_image">
            {/* <img src={page_not_found} /> */}
          </figure> 
          <div className="error_content">
            <h2>
              <p>{errorMessage1}<span>{errorMessage2}</span></p>
            </h2>
            <div className='error_icon'>
              <img src={e1} alt="icon_1" />
              <img src={e2} alt="icon_2" />
            </div>
            <p className="text">We suggest you go to the home while we fixing the problem</p>
            <NavLink to={linkRoute} className="link_to_home"><i class="icofont-long-arrow-left"><FaLongArrowAltLeft /></i>{linkText}</NavLink>
          </div>
        </section>
    </>
  )
}

Error.defaultProps = {
  errorMessage1 : "This Page is Not",
  errorMessage2 : "found.",
  linkRoute : "/",
  linkText : "Back to home"
}

export default Error

