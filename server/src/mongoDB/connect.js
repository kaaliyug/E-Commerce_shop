import mongoose from "mongoose";

const connectDB=(url)=>{
    mongoose.set("strictQuery", false);
    mongoose.connect(url)
    .then(()=> console.log("MongoDB connected"))
    .catch((error)=> console.log(error))
}



// const connectDB=async()=>{
//     try{
//         mongoose.set("strictQuery",false)
//         const connectionDB=await mongoose.connect(process.env.MONGO_URL)
//         console.log(`Database Connected ${connectionDB.connection.host}`)
//     }
//     catch(error){
//         console.log(error)
//         process.exit(1)
//     }
// }



export default connectDB;