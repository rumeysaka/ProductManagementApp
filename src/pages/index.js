import { useState } from "react"
import Product from "../components/Products/product"
import styles from "../styles/Home.module.css"
import Navbar from "../components/navbar"

export default function Home(data) {
  let products = Object.entries(data?.data)

  console.log("products", products)

  const deleteProduct = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        products = products.filter((i) => i[1].id !== json.id)
        console.log(products)
      })
  }
  const changeOrder = () => {
    fetch("https://fakestoreapi.com/products?sort=desc")
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        let products = res.data
      })
  }

  return (
    <>
      <Navbar />
      <div className={styles.sortingElement}>
        <div className={styles.dropdown}>
          <p>Sıralama Ölçütü</p>
        </div>
        <div className={styles.dropdownContent}>
          <p>Artan Sıralama</p>
          <p>Azalan Sıralama</p>
        </div>
      </div>
      <div onClick={() => changeOrder()}></div>

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
