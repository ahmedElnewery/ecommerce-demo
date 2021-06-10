import Head from 'next/head'
import React, { useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import { getProducts } from "./../store/actions/productsActions" 
import Product from "./../Components/Products/Product/Product"
import Spinner from "./../Components/UI/Spinner/Spinner"
import Message from './../Components/UI/Message/Message';

const Home = () => {
  const { products, error, loading } = useSelector((state) => state.productList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
   
  }, [dispatch])

  return (
    <div className='home-screen py-5'>
      <Head>
        <title>Ecommerce</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous"/>

      </Head>
      <h3>Lastest Products</h3>
    
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant ="danger">{error}</Message>
      ) : (
   
        <div className='row card-row '>
          {products.map((product) => {
            return (
              <div
                className='col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex'
                key={product._id}
              >
                <Product product={product} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
export default Home