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
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(setProducts(json))
      })
  }
  const getAllProducts = () => {
    fetch("https://fakestoreapi.com/products/")
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
          <div>
            <input
              type="checkbox"
              name="category"
              onClick={() => {
                getAllProducts()
              }}
            />
            <label name="category">All</label>
            {categories?.map((i) => (
              <div className={styles.categories}>
                <input
                  type="checkbox"
                  name="category"
                  value={i}
                  onClick={() => {
                    changeCategories(i)
                  }}
                />
                {/* {i[0]?.toUpperCase() + i?.slice(1)} */}
                <label name="category">
                  {i[0]?.toUpperCase() + i?.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.flex}>
            <h2>
              {category && category[0]?.toUpperCase() + category?.slice(1)}
            </h2>
            <div className={styles.dropdown}>
              <p>Sıralama Ölçütü</p>

              <div className={styles.dropdownContent}>
                <div>
                  <input
                    type="radio"
                    name="ordering"
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
      </div>
    </>
  )
}

export default Products
