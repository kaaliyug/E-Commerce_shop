import React, { useEffect } from 'react'
import { NavLink, useNavigate, useSearchParams, Link } from "react-router-dom";
import {useForm} from "react-hook-form"
import { useAuth } from "../../context/AuthContext";
import Input, { Button } from '../../components/Input/Input';
import classes from "./form.module.css"
import { EMAIL } from '../../constants/patterns';

const Login = () => {

    const { handleSubmit, register, formState: { errors }, } = useForm();
    const navigate = useNavigate() 
    const { user, login } = useAuth()
    const [params] = useSearchParams()
    const returnUrl = params.get("returnUrl");
    
    useEffect(() => {
      if(!user) return; //if users is null or undefined then return      
      returnUrl ? navigate(returnUrl) : navigate("/") //if user is not null dont stay at login page
  }, [user])

    const submit = async ({email , password}) => {
      await login(email, password);
    }

  return (
    <>
      <section className={classes.logincontainer}>
        <form onSubmit={handleSubmit(submit)} noValidate className={classes.userForm}>
          <h2 className={classes.formName}>Sign in</h2>
          <Input type="email" label="Email address *" {...register("email",{
            required: true, 
            pattern: EMAIL,
          })} 
            error = {errors.email}
          />

          <Input type="password" label="Password *" {...register("password",{
            required: true, 
          })} 
            error = {errors.password}
          />

          <Button type="submit" text="Login" />

          <div className={classes.legaltext}>
            <p>By continuing, you agree to Amazon's <NavLink to="#" className={classes.legalLink}>Conditions of Use </NavLink> and <NavLink to="#" className={classes.legalLink}>Privacy Notice.</NavLink></p>
          </div>
          <div className={classes.registerLink}>
            <p>New User ? &nbsp;</p>
            <Link to={`/register${returnUrl ? "?returnUrl=" + returnUrl : ""}`} className={classes.legalLink}>
              Register here
            </Link>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login