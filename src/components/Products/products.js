import ProductItem from "./productItem"
import styles from "../../styles/Products.module.css"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../../redux/features/ProductSlice"
import { useState } from "react"

const Products = () => {
  const dispatch = useDispatch()
  let products = useSelector((state) => state.products.state)
  let categories = useSelector((state) => state.categories.state)
  const [category, setCategory] = useState("")
  const handleDeleteProduct = (id) => {
    console.log(id)
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(setProducts(products.filter((i) => i.id != json.id)))
      })
  }
  const changeOrder = (ordering) => {
    fetch(`https://fakestoreapi.com/products?sort=${ordering}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(setProducts(json))
      })
  }
  const changeCategories = (category) => {
    setCategory(category)
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(setProducts(json))
      })
  }

  return (
    <>
      <div className={styles.columns}>
        <div className={styles.sideMenu}>
          <h2>Categories</h2>
          {categories?.map((i) => (
            <p
              onClick={() => {
                changeCategories(i)
              }}
            >
              {i[0].toUpperCase() + i.slice(1)}
            </p>
          ))}
        </div>
        <div className={styles.main}>
          <h2>{category[0].toUpperCase() + category.slice(1)}</h2>
          <div className={styles.wrapper}>
            {!products ? (
              <div>load</div>
            ) : (
              products.map((item) => {
                return (
                  <ProductItem
                    key={item.id}
                    handleDeleteProduct={handleDeleteProduct}
                    product={item}
                  />
                )
              })
            )}
          </div>
        </div>
        <div className={styles.dropdown}>
          <p>Sıralama Ölçütü</p>

          <div className={styles.dropdownContent}>
            <div>
              <input
                type="radio"
                onClick={() => {
                  changeOrder("desc")
                }}
              />
              <label for="orderType">Artan Sıralama</label>
            </div>
            <div>
              <input
                type="radio"
                name="ordering"
                value="ascending"
                onClick={() => changeOrder("asc")}
              />
              <label for="orderType" name="ordering" value="descending">
                Azalan Sıralama
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
