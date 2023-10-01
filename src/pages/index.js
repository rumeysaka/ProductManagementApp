// import "globals.css"
import Navbar from "../components/navbar"
import Head from "next/head"
import Products from "../components/Products/products"

export default function Home(data) {
  let products = Object.entries(data?.data)

  console.log("products", products)

  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <Navbar />
      <Products data={products} />
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
