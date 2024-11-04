import mongoose from "mongoose"

const ProductSchema= new mongoose.Schema({
    // id:{
    //     type: Number,
    // },
    name: { type: String, required:true },
    category: { type: String, required:true },
    stock: { type: Number, required:true },
    price: { type: Number, required:true },
    imageUrl: { type: String, required:true },
    slug: { type: String, required:true },
    description: { type: String, required:true }
},{
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
  }
);

const productModel = mongoose.model("Product", ProductSchema);


export default productModel;