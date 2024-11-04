import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getById, updateUser } from '../services/userServices';
import Input, { Button, Title } from '../components/Input/Input';
import { EMAIL } from '../constants/patterns';

export default function UserEditPage() {

    const { register, reset, handleSubmit, formState: { errors }, } = useForm()

    const { userId } = useParams();

    const isEditMode = userId;

    useEffect(() => {
        if(isEditMode) loadUser()
    }, [userId])

    const loadUser = async () => {
        const user = await getById(userId)
        reset(user)
    }

    const submit = userData => {
      updateUser(userData);
    }

  return (
    <>
      <div className='userEdit_container'>
        <div className='userEdit_content'>
            <Title title={isEditMode ? "Edit User" : "Add User"} fontSize="28px" />
            <form onSubmit={handleSubmit(submit)} noValidate>

                <Input label="first name" classInput="formUserInput" classContainer="formContainer"
                  {...register("firstName", { required: true, minLength: 3 })}
                  error={errors.firstName}
                />

                <Input label="last name" classInput="formUserInput" classContainer="formContainer" 
                  {...register("lastName", { required: true, minLength: 3 })}
                  error={errors.lastName}
                />

                <Input label="username" classInput="formUserInput" classContainer="formContainer" 
                  {...register("username", { required: true, minLength: 3 })}
                  error={errors.username}
                />

                <Input label="Email" classInput="formUserInput" classContainer="formContainer" 
                  {...register("email", { required: true, pattern: EMAIL })}
                  error={errors.email}
                />

                <Input label="Address" classInput="formUserInput" classContainer="formContainer" 
                  {...register("address", { required: true, minLength: 5 })}
                  error={errors.address}
                />

                <div className='check'>
                  <Input label="Is Admin" htmlFor="check" id="check" type="checkbox" classInput="formUserInput" classContainer="formContainer" {...register("isAdmin")} />
                </div>

                <Button type="submit" />
            </form>
        </div>
      </div>  
    </>
  )
}
