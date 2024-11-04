import React from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';
import Input, { Button, Title } from '../components/Input/Input';

export default function ProfilePage() {
    
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm()

    const { user, updateProfile } = useAuth()  // get the current user information

    const submit = user => {
        updateProfile(user)
    }
    
    return (
        <>
          <div className='profile_container'>
            <div className='details'>
              <Title title="update profile" fontSize="28px" color="hsla(47, 62%, 40%, 0.929)"  />
              <form onSubmit={handleSubmit(submit)}>
                <Input defaultValue={user.firstName} classInput="formUserInput" classContainer="formContainer"
                    type="text"
                    label="first Name"
                    {...register("firstName", {
                        required: true,
                        minLength: 5,
                    })}
                    error={errors.firstName}
                />
                
                <Input defaultValue={user.lastName} classInput="formUserInput" classContainer="formContainer"
                    type="text"
                    label="last Name"
                    {...register("lastName", {
                        required: true,
                        minLength: 5,
                    })}
                    error={errors.lastName}
                />

                <Input defaultValue={user.address} classInput="formUserInput" classContainer="formContainer"
                    type="text"
                    label="Address"
                    {...register("address", {                        
                        required: true,
                        minLength: 10,
                    })}
                    error={errors.address}
                />

                <Button type="submit" text="update" backgroundColor="#009e84" />
              </form>

              <ChangePassword />
            </div>
          </div>
        </>
    )
}


export function ChangePassword() {

    const { 
        handleSubmit,
        register,
        getValues,
        formState: { errors },         
    } = useForm();

    const { changePassword } = useAuth()

    const submit = passwords => {
        changePassword(passwords)
    }

    return (
        <>
          <Title title="Change password" fontSize="28px" color="hsla(47, 62%, 40%, 0.929)"  />
          <form onSubmit={handleSubmit(submit)}>
            <Input type="password" classInput="formUserInput" classContainer="formContainer"
               label="Current Password"
               {...register("currentPassword", {
                  required: true,
                })}
               error={errors.currentPassword}
            />

            <Input type="password" classInput="formUserInput" classContainer="formContainer"
              label="New Password"
              {...register("newPassword", {
                required: true,
                minLength: 5,
              })}
              error={errors.newPassword}
            />

            <Input type="password" classInput="formUserInput" classContainer="formContainer"
              label="Confirm Password"
              {...register("confirmPassword", {
                required: true,
                validate: value =>
                    value != getValues("newPassword")
                    ? "Passwords Do not Match"
                    : true,
              })}
              error={errors.confirmNewPassword}
            />
            
            <Button type="submit" text="Change" />
          </form>
        </>
    )
}

