import Head from "next/head"
import { useState } from "react"
import Product from "../components/Products/product"
import styles from "../styles/Home.module.css"
import Navbar from "../components/navbar"


export default function Home(data) {
  let products = Object.entries(data?.data)

  console.log("products", products)

  const deleteProduct = (id) => {
    console.log(id)
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setProducts(products.filter((i) => i.id != id))
      })
  }
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {!products ? (
          <div>load</div>
        ) : (
          products.map((item) => {
            return (
              <Product
                key={item[0]}
                product={item[1]}
                onDeleteProduct={deleteProduct}
              />
            )
          })
        )}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("https://fakestoreapi.com/products")
  const data = await res?.json()
  // Pass data to the page via props
  return { props: { data } }
}
