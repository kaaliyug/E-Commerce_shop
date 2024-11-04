import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { add, getById, update } from "../services/productServices";
import Input, { Button, InputContainer, Textarea, Title } from '../components/Input/Input';
import { uploadImage } from "../services/uploadService";
import { toast } from "react-toastify";


export default function ProductEditPage() {

    const navigate = useNavigate()
    const { productId } = useParams();
    const [ imageUrl, setImageUrl ] = useState()
    const isEditMode = !!productId
    /** converts everything into the representation of boolean
     * if 20 is true !!20 == true boolean
     */

    const { handleSubmit, register, formState: { errors }, reset, } = useForm()

    useEffect(() => {
        if (!isEditMode) return;

        getById(productId).then( product => {
            if (!product) return;
            reset(product)
            setImageUrl(product.imageUrl);
        });
    }, [productId])

    const submit = async productData => {
      const product = { ...productData, imageUrl }

      if (isEditMode) {
        await update(product);
        toast.success(`Product "${product.name}" updated successfully!`);
        return;
      }

      const newProduct = await add(product);
      toast.success(`Product "${product.name}" added successfully!`);
      navigate("/admin/editProduct/" + newProduct.id, { replace: true })
    }

    const upload = async event => {
      setImageUrl(null)
      const imageUrl = await uploadImage(event)
      setImageUrl(imageUrl)
    }

  return (
    <>
      <div className="productEdit_container">
        <div className="edit_content">
          <Title title={isEditMode ? "EDIT PRODUCT" : "ADD PRODUCT"} fontSize="28px" color="hsla(47, 62%, 40%, 0.929)"  />

          <form onSubmit={handleSubmit(submit)} noValidate>

            <InputContainer label="Select Image" classInput="formUserInput" classContainer="formContainer">
              <input type="file" onChange={upload} accept="image/jpeg,image/png,image/webp" />
            </InputContainer>

            {imageUrl && (
              <a href={imageUrl} className="image_link" target="_blank">
                <img src={imageUrl} alt="Uploaded" />
              </a>
            )}
            
            <Input type="text" label="Name" classInput="formUserInput" classContainer="formContainer" 
                {...register("name", { required: true, minLength: 5 })}
                error={errors.name} 
            />

            <Input type="text" label="Slug" classInput="formUserInput" classContainer="formContainer" 
                {...register("slug", { required: true, minLength: 5 })}
                error={errors.slug} 
            />

            <Input type="number" label="Price" classInput="formUserInput" classContainer="formContainer" 
               {...register("price", { required: true })}
               error={errors.price} 
            />

            <Input type="number" label="Stock" classInput="formUserInput" classContainer="formContainer" 
               {...register("stock", { required: true })}
               error={errors.stock} 
            />

            <Input type="text" label="Category" classInput="formUserInput" classContainer="formContainer" 
               {...register("category")}
               error={errors.category} 
            />

            <Textarea type="text" label="Description" classTextarea="formUserInput" classContainer="formContainer"
               {...register("description", { required: true, maxLength: 1000 })}
               rows={10}
               cols={50}
               error={errors.description} 
            />

            <Button type="submit" text={isEditMode ? "Update" : "Create"} />

          </form>
        </div>
      </div>  
    </>
  )
}
