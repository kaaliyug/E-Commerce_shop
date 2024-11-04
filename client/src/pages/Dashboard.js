import React from 'react'
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';


export default function Dashboard() {  

    const { user } = useAuth()

  return (
    <>
      <div className='dashboard_container'>
        <div className='dashboard_menu'>
          {
            allItems.filter(item => user.isAdmin || !item.forAdmin).map(item => (
              <NavLink key={item.title} to={item.url} style={{backgroundColor: item.bgColor, color: item.color}} className="tab_container">
                <img src={item.imageUrl} alt={item.title} />
                <h2>{item.title}</h2>
              </NavLink>
            ))
          }
        </div>            
      </div>
    </>
  )
}


const allItems = [
  {
    title: 'Profile',
    imageUrl: '/icons/profile.svg',
    url: '/profile',
    bgColor: '#1565c0',
    color: 'white',
  },
  {
    title: 'Users',
    imageUrl: '/icons/users.svg',
    url: '/admin/users',
    forAdmin: true,
    bgColor: '#00bfa5',
    color: 'white',
  },
  {
    title: 'Products',
    imageUrl: '/icons/foods.svg',
    url: '/admin/products',
    forAdmin: true,
    bgColor: '#e040fb',
    color: 'white',
  },
];