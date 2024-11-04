import axios from "axios"

export const createOrder = async order => {
    try {
        const { data } = axios.post("/api/orders/create", order);
        return data;
    } catch (error) {
        
    }
}
/** ------ function for getting the 
 * order from current user ------- **/
/***  calling the api with axios get for getting the data and return the data */
export const getNewOrderForCurrentUser = async () => {
    const { data } = await axios.get("/api/orders/newOrderForCurrentUser");
    return data;
}

export const pay = async paymentId => {
    try {
        const { data } = await axios.put("/api/orders/pay", { paymentId })
        return data;
    }
    catch (error) {}
}