import ProductItem from "./productItem"
import styles from "../../styles/Products.module.css"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../../redux/features/ProductSlice"

const Products = () => {
  const dispatch = useDispatch()

  let products = useSelector((state) => state.products.state)

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
  const changeOrder = () => {
    fetch("https://fakestoreapi.com/products?sort=desc")
      .then((res) => res.json())
      .then((json) => {
        dispatch(setProducts(json))
      })
  }

  return (
    <>
      <div className={styles.sortingElement}>
        <div className={styles.dropdown}>
          <p>Sıralama Ölçütü</p>
        </div>

        <div className={styles.dropdownContent}>
          <form type="submit">
            <input
              type="radio"
              name="orderType"
              value="ascending"
              onClick={() => changeOrder()}
            />
            Artan Sıralama
            <label for="orderType">Artan Sıralama</label>
            <input type="radio" name="orderType" value="descending" />
            <label for="orderType">Azalan Sıralama</label>
          </form>
        </div>
      </div>
      <div></div>

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
    </>
  )
}

export default Products
