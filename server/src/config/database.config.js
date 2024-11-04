import mongoose from "mongoose"
import {connect, set} from "mongoose"
import app from "../index.js"


import userModel from "../mongoDB/models/user.model.js";
import productModel from "../mongoDB/models/product.model.js";
import bcrypt from "bcryptjs"
import { sample_products, sample_users } from "../data.js";
const pass_hash_round= 10;

set("strictQuery", true);
const mongodbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

export const startServer = async () => {
    try{
        connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
          })
          await seedUsers();
          await seedProducts();
        app.listen(5000, ()=> console.log('server has started on port http://localhost:5000'))
    } catch (error){
        console.log(error)
    }
}

async function seedUsers() {
    const usersCount =  await userModel.countDocuments() // if seed is already done or not
    if (usersCount > 0) { // if there is data insid ethe user model that seed is already done
        console.log("Users seed is already done!")
        return;
    }
    //  otherwise
    for (let user of sample_users) { 
        user.password = await bcrypt.hash(user.password, pass_hash_round) //before saving them hash their using the bcrypt and passing the current user password from the sample users
        await userModel.create(user);
    }
    
    console.log("Users seed is done!");
}


async function seedProducts() {
    const products = await productModel.countDocuments();
    if (products > 0) {
        console.log("Products seed is already done!");
        return;
    }
    for (const product of sample_products) {       
        product.imageUrl = `http://localhost:5000/uploads/${product.imageUrl}` 
        await productModel.create(product); //then create model
    }

    console.log("Sample Products seed is Done!");
}

