import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { deleteById, getAll, search } from '../services/productServices';
import Search from '../components/Search';
import NotFound from '../components/NotFound/NotFound';
import Price from '../components/Price';
import { toast } from 'react-toastify';
import { Title } from '../components/Input/Input';

export default function ProductsAdminPage() {

  const [products, setProducts] = useState()
  const { searchTerm } = useParams()

  useEffect(() => {
    loadProducts();
  }, [searchTerm])

  const loadProducts = async () => {
    const foods = searchTerm ? await search(searchTerm) : await getAll();
    setProducts(foods)
  }

  const ProductsNotFound = () => {
    if (products && products.length > 0) return;
    return searchTerm ? (
      <NotFound linkRoute="/admin/products" linkText="Show All" />      
    ) : (
      <NotFound linkRoute="/dashboard" linkText="Back to dashboard!" />
    );
  }

  const deleteProduct = async product => {
    const confirmed = window.confirm(`Delete Product ${product.name}?`);
    if (!confirmed) return;
    
    await deleteById(product.id);
    toast.success(`"${product.name}" has been removed`)
    setProducts(products.filter(f => f.id !== product.id))
  }

  return (
    <>
      <div className="admin_container">
        <div className='admin_product_list'>
          <Title title="Manage Products" margin='1rem auto' />
          <Search
            searchRoute="/admin/products/"
            defaultRoute="/admin/products"
            margin="0 auto"
          />
          <Link to='/admin/addProduct' className="add_product neon-button">
            add product +            
          </Link>
          <ProductsNotFound />
          {
            products && 
            products.map(product => (
              <div key={product.id} className='list_item'>
                <img src={product.imageUrl} alt={product.name} />
                <Link to={"/product/" + product.id}>{product.name}</Link>
                <Price price={product.price} />
                <div className='actions'>
                  <Link to={"/admin/editProduct/" + product.id}>Edit</Link>
                  <Link onClick={() => deleteProduct(product)}>Delete</Link>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
