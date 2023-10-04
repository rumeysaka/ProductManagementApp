import styles from "../../styles/ProductItem.module.css"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../../redux/features/ProductSlice"
import { useState } from "react"

const ProductItem = (props) => {
  const { handleDeleteProduct, product } = props
  const products = useSelector((state) => state.products.state)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    let nnew = [...products]
    nnew.map((i, idx) => {
      if (i == product) {
        nnew[idx] = {
          ...product,
          title: data.title,
          price: data.price,
        }
      }
      return nnew
    })
    dispatch(setProducts(nnew))
  }

  if (!product) {
    return
  }
  return (
    <div className={styles.card} key={product.id}>
      <div className={styles.cover}>
        <img src={product.image} />

        <div
          className={styles.deleteBox}
          onClick={() => {
            handleDeleteProduct(product.id)
          }}
        >
          <div className={styles.delete}> &times;</div>
        </div>
      </div>
      <div id={`body${product.id}`} className={styles.body}>
        <div className={styles.header}>
          <div className={styles.h3}>{product.title}</div>
          <div className={styles.price}>{product.price}₺</div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.flex}>
          <div>{product.category}</div>
          <div
            id={`edit${product.id}`}
            className={styles.edit}
            onClick={() => {
              document.getElementById(`form${product.id}`).style.visibility =
                "visible"
              document.getElementById(`close${product.id}`).style.visibility =
                "visible"
              document.getElementById(`edit${product.id}`).style.visibility =
                "hidden"
              document.getElementById(`body${product.id}`).style.visibility =
                "hidden"
            }}
          >
            <p>Düzenle</p>
          </div>
        </div>
      </div>
      <div className={styles.formColumn}>
        <form id={`form${product.id}`} onSubmit={handleSubmit(onSubmit)}>
          <input
            defaultValue={product.title}
            {...register("title", { required: true })}
          />
          <input
            defaultValue={product.price}
            {...register("price", { required: true })}
          />
          {errors.title && errors.price && <span>This field is required</span>}

          <button
            type="submit"
            onClick={() => {
              document.getElementById(`form${product.id}`).style.visibility =
                "hidden"
              document.getElementById(`edit${product.id}`).style.visibility =
                "visible"
              document.getElementById(`close${product.id}`).style.visibility =
                "hidden"
              document.getElementById(`body${product.id}`).style.visibility =
                "visible"
            }}
          >
            Kaydet
          </button>
        </form>

        <div className={styles.close}>
          <p
            id={`close${product.id}`}
            onClick={() => {
              document.getElementById(`form${product.id}`).style.visibility =
                "hidden"
              document.getElementById(`close${product.id}`).style.visibility =
                "hidden"
              document.getElementById(`edit${product.id}`).style.visibility =
                "visible"
              document.getElementById(`body${product.id}`).style.visibility =
                "visible"
            }}
          >
            &times;
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
