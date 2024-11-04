import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// other imports 
import userRouter from "./routers/user.route.js"

import uploadRouter from "./routers/upload.route.js"
import productsRouter from "./routers/products.router.js";
import orderRouter from "./routers/order.router.js";
import { startServer } from "./config/database.config.js";
import { errorMiddleware } from "./middleware/error-middleware.js";


dotenv.config();
//initialize our app 
const app = express();
app.use(cookieParser())
app.use(errorMiddleware)
export default app

// cross-origin resource sharing
const corsOptions = {
    origin: ["http://localhost:3000"],
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}
app.use(cors(corsOptions));
// you can use json in your application
app.use(express.json());
app.use(express.urlencoded({extended:true}));




/*********************  ROUTES  **********************/
// dummy route
app.get("/api/test", async (req, res) => {
    res.send({message:"working"})
    // or another way
    res.json({ message : "hi"})
})
app.use("/uploads", express.static("uploads")); // for images
app.use("/api/upload", uploadRouter);
app.use("/api/products", productsRouter)
app.use("/api/auth/users", userRouter)
app.use("/api/orders", orderRouter);




// ----------- *** SERVER *** ---------------------- 
startServer();