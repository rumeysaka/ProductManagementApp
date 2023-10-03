import { useForm } from "react-hook-form"
import ProductItem from "./productItem"
import styles from "../../styles/Products.module.css"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../../redux/features/ProductSlice"
import { useState } from "react"

const Products = () => {
  const dispatch = useDispatch()
  let products = useSelector((state) => state.products.state)
  let categories = useSelector((state) => state.categories.state)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

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

  const onSubmit = (data) => {
    const { title, price, description, category } = data
    dispatch(
      setProducts([
        ...products,
        {
          id: products.length + 1,
          title: title,
          price: price,
          description: description,
          category: category,
        },
      ])
    )
    console.log("prody", products)
  }
  // var modal = document.getElementById("myModal")

  // // // Get the button that opens the modal
  // // var btn = document.getElementById("myBtn")

  // // // Get the <span> element that closes the modal
  // // var span = document.getElementsByClassName("close")[0]

  // // // When the user clicks on the button, open the modal
  // // btn.onclick = function () {
  // //   modal.style.display = "block"
  // // }

  // // // When the user clicks on <span> (x), close the modal
  // // span.onclick = function () {
  // //   modal.style.display = "none"
  // // }

  // // // When the user clicks anywhere outside of the modal, close it
  // window.onclick = function (event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none"
  //   }
  // }

  return (
    <>
      <div id="myModal" className={styles.modal}>
        <div className={styles.modalContent}>
          <span
            className={styles.close}
            onClick={() => {
              document.getElementById("myModal").style.display = "none"
            }}
          >
            &times;
          </span>
          <div>
            dsfsdfd
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}
              <input {...register("title", { required: true })} />
              {/* include validation with required or other standard HTML validation rules */}
              <input {...register("price", { required: true })} />
              <input {...register("description", { required: true })} />
              <input {...register("category", { required: true })} />
              {/* errors will return when field validation fails  */}
              {errors.title && errors.price && (
                <span>This field is required</span>
              )}

              <input type="submit" />
            </form>
          </div>
        </div>
      </div>
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
              <div>
                <button
                  id="myBtn"
                  onClick={() => {
                    document.getElementById("myModal").style.display = "block"
                  }}
                >
                  +
                </button>
              </div>
              <div>
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
