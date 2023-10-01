import styles from "../../styles/ProductItem.module.css"

const ProductItem = (props) => {
  const { handleDeleteProduct, product } = props
  // console.log("product in item", product)

  if (!product) {
    return
  }
  return (
    <div className={styles.card} key={product.id}>
      <div className={styles.cover}>
        <img src={product.image} />
      </div>
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.h3}>{product.title}</div>
          <div className={styles.p}>{product.price}₺</div>
        </div>
        <div className={styles.divider}></div>

        <div>{product.category}</div>
        <div
          className={styles.delete}
          onClick={() => {
            handleDeleteProduct(product.id)
          }}
        >
          sil
        </div>
      </div>
    </div>
  )
}

export default ProductItem
