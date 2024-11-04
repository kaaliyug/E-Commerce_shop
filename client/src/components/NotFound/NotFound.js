import React from 'react'
import { Link } from 'react-router-dom';
import classes from "./notFound.module.css";

export default function NotFound({ message, linkRoute, linkText }) {
  return (
    <div>
      <div className={classes.container}>
        {message}
        <Link to={linkRoute}>{linkText}</Link>
      </div>  
    </div>
  )
}

NotFound.defaultProps = {
    message: "Nothing Found!",
    linkRoute: "/",
    linkText: "Go To Home Page",
}