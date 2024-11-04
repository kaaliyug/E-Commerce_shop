// connect frontend from backend and data is coming from backened
import axios from "axios"

// for get all products by getAll function
export const getAll = async () => {
    const { data } = await axios.get("/api/products")
    return data;
}

/**
 * gets the searchTerm as input
 */
export const search = async searchTerm => 
{
    const { data } = await axios.get("/api/products/search/" + searchTerm);
    return data;
}

export const getAllTags = async ()=> 
{
    const { data } = await axios.get("/api/products/tags");
    return data;
}

export const getAllByTag = async tag => {
    if (tag === "All") return getAll();
    const { data } = await axios.get("/api/products/tag/" + tag)
    return data;
}

export const getById = async productId =>
{
    const { data } = await axios.get("/api/products/" + productId)
    return data;
}

export async function deleteById(productId) {
    await axios.delete("/api/products/" + productId);
}

export async function update(product) {
    await axios.put("/api/products", product);
}

export async function add(product) {
    const { data } = await axios.post("/api/products", product);
    return data;
}