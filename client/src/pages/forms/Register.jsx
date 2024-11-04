import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import Input, { Button } from '../../components/Input/Input';
import classes from "./form.module.css"
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {

  const auth = useAuth()
  const { user } = auth
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  const { handleSubmit, register, getValues, formState: { errors }, } = useForm()

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate("/")
  }, [user])

  const submit = async data => {
    await auth.register(data)    
  }

  return (
    <>
      <section className={classes.registercontainer}>
        <div className={classes.details}>
          <form onSubmit={handleSubmit(submit)} noValidate className={classes.userForm}>
            <h2 className={classes.formName}>Create an Account</h2>
            
            <Input type="text" label="First Name" {...register("firstName", {required: true,
                minLength: 2,
              })}
              error={errors.firstName}
            />

            <Input type="text" label="Last Name" {...register("lastName", {required: true,
                minLength: 2,
              })}
              error={errors.lastName}
            />
            
            <Input type="text" label="Username" {...register("username", {required: true,
                minLength: 2,
              })}
              error={errors.username}
            />

            <Input type="email" label="Email" {...register("email", {required: true,
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                  message: "Email Is Not Valid",
                },
              })} 
              error={errors.email}
            />

            <Input type="password" label="Password" {...register("password", {
                required: true,
                minLength: 5,
              })}
              error={errors.password}
            />
            
            <Input type="password" label="Confirm Password" {...register("confirmPassword", {
                required: true,
                validate: value =>
                  value !== getValues("password") 
                  ? "Passwords Do No Match"
                  : true,
              })} 
              error={errors.confirmPassword}
            />
            
            <Input type="text" label="Address" {...register("address", {
              required: true,
              minLength: 10,
            })}
            error={errors.address}
            />
            
            <Button type="submit" text="Regiter" />

            <div className={classes.loginLink}>
              <p>Already have an account? &nbsp;
                <Link to={`/login${returnUrl ? '?returnUrl=' + returnUrl : ''}`} className={classes.legalLink}>
                    Login here
                </Link>
              </p>
            </div>
            
            <div className={classes.legaltext}>
              <p>By creating an account or logging in, you agree to Amazon's <NavLink to="#" className={classes.legalLink}>Conditions of Use </NavLink> and <NavLink to="#" className={classes.legalLink}>Privacy Notice.</NavLink></p>
            </div>

          </form>          
        </div>
      </section>
    </>
  )
}

export default Register