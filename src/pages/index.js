// import "globals.css"
import Navbar from "../components/navbar"
import Head from "next/head"
import Products from "../components/Products/products"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../redux/features/ProductSlice"
import { useEffect } from "react"

export default function Home(data) {
  const dispatch = useDispatch()
  let products = Object.entries(data?.data)

  useEffect(() => {
    dispatch(setProducts(products))
  }, [])

  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <Navbar />
      <Products />
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
