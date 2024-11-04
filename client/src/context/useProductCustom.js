import axios from 'axios';
import  { useState } from 'react'



export default function useProductCustom(selectedCategory) {

    const [products, setProducts] = useState([]) 
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null) 
    
    
    const getAllByCategory = async selectedCategory => {
      const baseUrl = "/api/products";
      try {
           let url = baseUrl;
          console.log(selectedCategory)
           if(selectedCategory) {
           url += `/category/product?category=${selectedCategory}`
          }
          const { data } = await axios.get(url)
          setIsLoading(false);
          return data;
      }
      catch(error) {
        console.log(error);
        setError(`Error fetching data. Please try again later. ${error}`)
        setIsLoading(false)
      }
  }


  return { getAllByCategory };
}