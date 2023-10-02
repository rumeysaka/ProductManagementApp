import styles from "../../styles/ProductItem.module.css"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../../redux/features/ProductSlice"

const ProductItem = (props) => {
  const { handleDeleteProduct, product } = props
  const products = useSelector((state) => state.products.state)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    let nnew = [...products]
    nnew.map((i, idx) => {
      if (i == product) {
        console.log(idx)
        nnew[idx] = {
          ...product,
          title: data.title,
          price: data.price,
        }
      }
      return nnew
    })

    // nnew[editId - 1] = {
    //   ...product,
    //   title: data.title,
    //   price: data.price,
    // }

    console.log(nnew)
    dispatch(setProducts(nnew))
    console.log("products", products)
  }

  // console.log(watch("example"))

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
          <div className={styles.price}>{product.price}₺</div>
        </div>
        <div className={styles.divider}></div>
        <div>{product.category}</div>
        <div className={styles.flex}>
          <p
            id={`edit${product.id}`}
            className={styles.delete}
            onClick={() => {
              document.getElementById(`form${product.id}`).style.visibility =
                "visible"
              document.getElementById(`close${product.id}`).style.visibility =
                "visible"
              document.getElementById(`edit${product.id}`).style.visibility =
                "hidden"
            }}
          >
            edit
          </p>
          <div
            className={styles.delete}
            onClick={() => {
              handleDeleteProduct(product.id)
            }}
          >
            sil
          </div>
        </div>
        <div className={styles.row}>
          <p
            id={`close${product.id}`}
            onClick={() => {
              document.getElementById(`form${product.id}`).style.visibility =
                "hidden"
              document.getElementById(`close${product.id}`).style.visibility =
                "hidden"
              document.getElementById(`edit${product.id}`).style.visibility =
                "visible"
            }}
          >
            x
          </p>
          <form
            id={`form${product.id}`}
            style={{ visibility: "hidden" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* register your input into the hook by invoking the "register" function */}
            <input
              defaultValue={product.title}
              {...register("title", { required: true })}
            />

            {/* include validation with required or other standard HTML validation rules */}
            <input
              defaultValue={product.price}
              {...register("price", { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.title && errors.price && (
              <span>This field is required</span>
            )}

            <input type="submit" />
          </form>
        </div>
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      </div>
    </div>
  )
}

export default ProductItem
