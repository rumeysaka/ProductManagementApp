import ProductItem from "./productItem"
import styles from "../../styles/Products.module.css"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../../redux/features/ProductSlice"
import { useEffect } from "react"

const Products = () => {
  const dispatch = useDispatch()
  //   const deleteProduct = (id) => {
  //     fetch(`https://fakestoreapi.com/products/${id}`)
  //       .then((res) => res.json())
  //       .then((json) => {
  //         products = products.filter((i) => i[1].id !== json.id)
  //         console.log(products)
  //       })
  //   }
  //   const changeOrder = () => {
  //     fetch("https://fakestoreapi.com/products?sort=desc")
  //       .then((res) => res.json())
  //       .then((json) => {
  //         console.log(json)
  //         let products = res.data
  //       })
  //   }

  // console.log(useSelector(getProducts))

  const products = useSelector((state) => state.products.state)
  console.log(products)
  // console.log(products)

  return (
    <>
      <div className={styles.sortingElement}>
        <div className={styles.dropdown}>
          <p>Sıralama Ölçütü</p>
        </div>
        <div className={styles.dropdownContent}>
          <p>Artan Sıralama</p>
          <p>Azalan Sıralama</p>
        </div>
      </div>
      <div></div>

      <div className={styles.wrapper}>
        {!products ? (
          <div>load</div>
        ) : (
          products.map((item) => {
            return <ProductItem key={item[0]} product={item[1]} />
          })
        )}
      </div>
    </>
  )
}

export default Products
