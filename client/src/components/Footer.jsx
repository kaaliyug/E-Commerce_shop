import React from 'react'
import { FaHeart } from "react-icons/fa";
import { Shipping, footerLinks, socialMedia } from '../constants/constant';
import logowhite from "../assets/logo-white.webp"


const Footer = () => {
  return (
    <>
      <div className='wrappers'>

        <div className='top_footer'>
          <ul className='shipping'>
            {Shipping.map((link, index) => (
              <li key={link.title}>
                <div className='icon'>{link.icon}</div>
                <div className='content'>
                  <h5>{link.title}</h5>
                  <p>{link.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className='middle_footer'>
          
          <div className="footer_logo">
            <img src={logowhite} alt="footerlogo" /> 
            <p>Lorem ipsum dolor sit amet consectet adipisicing elit, sed do eiusmod templ incididunt ut labore et dolore magnaol aliqua Ut enim ad minim.</p>
            <ul className="social_icons">
              {socialMedia.map((social,index) => (
                <li key={social.id}>
                  <a>
                    <i>{social.icon}</i>
                  </a>
                </li> 
              ))}
            </ul>
          </div>
          
          <div className='footer_quick_links'>
            {footerLinks.map((footerLink) => (
              <div key={footerLink.title}>
                <h4>{footerLink.title}</h4>
                <ul>
                  {footerLink.links.map((link,index)=>(
                    <li key={link.name}>
                      <a>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className='footer_information'>
            <h4>store information</h4>
            <p className="content text">2005 Your Address Goes Here. 896, Address 10010, HGJ</p>
            <p className="content phone">Phone/Fax:<a>+0123456789</a></p>
            <p className="content email">Email:<a>demo@example.com</a></p>
          </div>
        
        </div>

        <div className='bottom_footer'>
          <p className="copyright">&copy; 1990-2024, Jesco Made With <span><FaHeart /></span>. All rights reserved</p>
        </div>

      </div>
    </>
  )
}

export default Footer