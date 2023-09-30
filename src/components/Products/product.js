import styles from "../../styles/Product.module.css"

const Products = ({ product, onDeleteProduct }) => {
  const handleDelete = (id) => {
    console.log(id)

    onDeleteProduct(id)
  }
  return (
    <div className={styles.card} key={product.id}>
      <div className={styles.cover}>
        <img src={product.image} />
      </div>
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.title}>{product.title}</div>
          <div className={styles.price}>{product.price}₺</div>
        </div>
        <div className={styles.divider}></div>

        <div>{product.category}</div>
        <div className={styles.delete}>sil</div>
      </div>
    </div>
  )
}

export default Products
