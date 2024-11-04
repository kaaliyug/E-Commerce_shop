import { Router } from "express"
import handler from "express-async-handler"
import auth from "../middleware/auth_middleware.js";
import { OrderModel } from "../mongoDB/models/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";
import { BAD_REQUEST } from "../constants/httpStatus.js";



const router = Router();
/** now this router will use middleware with, to limit access to
 * this router that is the order only for authenticated users
*/
router.use(auth);


router.post("/create", handler(async (req, res) => {
    const order = req.body; // it has the order that we want to save
    if (order.items.length <= 0) res.status(BAD_REQUEST).send("Cart is Empty") // if the order is smaller than or equal to 0 we shouldn't save the order
    
    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW,
    })

    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
})
)

router.put("/pay", handler(async (req, res) => {
    const { paymentId } = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
        res.status(BAD_REQUEST).send("Order Not Found!");
        return;
    }
    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
  })
)

router.get("/newOrderForCurrentUser", handler(async (req, res) => {
        const order = await getNewOrderForCurrentUser(req)
        if (order) res.send(order)
        else res.status(BAD_REQUEST).send();
    })
)


const getNewOrderForCurrentUser = async req =>
  await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW })



export default router