import { Router } from "express"
import productModel from "../mongoDB/models/product.model.js";
import handler from "express-async-handler"
import admin from "../middleware/admin.middleware.js";


const productsRouter = Router();


productsRouter.get("/", handler(async (req, res) => {
    const product = await productModel.find({});
    res.send(product)
 })
)

productsRouter.post("/", admin, handler(async (req, res) => {
    const { name, category, stock, price, imageUrl, slug, description } = req.body;
    const product = new productModel({
        name, 
        category, 
        stock, 
        price, 
        imageUrl, 
        slug, 
        description,
    });
    await product.save();
    res.send(product);
}))

productsRouter.put("/", admin, handler(async (req, res) => {
    const { id, name, category, stock, price, imageUrl, slug, description } = req.body;
    await productModel.updateOne({ _id: id },
        {
            name, 
            category,
            stock, 
            price, 
            imageUrl, 
            slug, 
            description,
        }
    )
    res.send();
}))

productsRouter.delete("/:productId", admin, handler(async (req, res) => {
    const { productId } = req.params;
    await productModel.deleteOne({ _id: productId })
    res.send();
}) )

productsRouter.get("/tags", handler(async (req, res) => {
    const tags = await productModel.aggregate([
        {
            $unwind: "$category", /** making the tags flat, using this we will
                                  have list of foods that each food has a single tag, 
                                  created single row for every single tag */  
        },
        {
            $group: {                   // group the tags together with the id of tags
                _id: "$category",          // id is name of the tag
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,                    
                name: "$_id",
                count: "$count",
            },
        },
    ]).sort({ count: -1 }); //sort all tags based on count 

    // new for all options
    const all = {
        name: "All",
        count: await productModel.countDocuments(), 
    }
    tags.unshift(all); 
    res.send(tags);
 })
)

productsRouter.get("/search/:searchTerm", handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, "i"); 
    const productItem = await productModel.find({ name: { $regex: searchRegex }})
    res.send(productItem)
 })
)

productsRouter.get("/tag/:tag", handler(async (req, res) => {
    const { tag } = req.params;
    const productByTag = await productModel.find({ category: tag })
    res.send(productByTag)
 })
)

productsRouter.get("/category/product", async (req,res) => {
    try {
        const category = req.query.category;
        const filter = {};
        if(category) {
            filter.category = category;
            console.log(filter)
        }
        const data = await productModel.find(filter)
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "an error occured while fetching data"})
    }
})

productsRouter.get("/slug/:slug", async (req,res) => {
    try {
        const slugParam = req.params.slug        
        const data = await productModel.findOne({ slug: slugParam })
        console.log(data)
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "an error occured while fetching data"})
    }
})

// this one need to be in the last otherwise top ones will not work
productsRouter.get("/:productId", handler(async (req, res) => {
    const { productId } = req.params;
    console.log(productId)
    const product = await productModel.findById(productId);
    console.log(product)
    res.send(product)
 })
)



export default productsRouter