// import "globals.css"
import Navbar from "../components/navbar"
import Head from "next/head"
import Products from "../components/Products/products"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../redux/features/ProductSlice"
import { useEffect } from "react"
import { setCategories } from "../redux/features/CategorySlice"

export default function Home(data, categories) {
  const dispatch = useDispatch()

  const cate = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => dispatch(setCategories(json)))
  }

  useEffect(() => {
    cate()
    dispatch(setProducts(data?.data))
  }, [])

  console.log(categories)
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
  const res = await fetch("https://fakestoreapi.com/products")
  const data = await res?.json()

  return { props: { data } }
}
