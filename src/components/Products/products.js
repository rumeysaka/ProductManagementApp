import { useForm } from "react-hook-form"
import ProductItem from "./productItem"
import styles from "../../styles/Products.module.css"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../../redux/features/ProductSlice"
import { useState } from "react"

const Products = () => {
  const dispatch = useDispatch()
  const [showSideMenu, setShowSideMenu] = useState(true)
  let products = useSelector((state) => state.products.state)
  let categories = useSelector((state) => state.categories.state)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [showModal, setShowModal] = useState(false)
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
    setCategory(category)
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
    setShowModal(false)
    reset()
  }
  return (
    <>
      <div id="myModal" className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <p>New Product</p>

            <span
              className={styles.close}
              onClick={() => {
                document.getElementById("myModal").style.visibility = "hidden"
              }}
            >
              &times;
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.card}>
              <div className={styles.cover}></div>
              <div className={styles.body}>
                <div className={styles.header}>
                  <div>
                    <label>İsim</label>
                    <input {...register("title", { required: true })} />
                    {errors.title && <span>Bu alanı doldurunuz.</span>}
                  </div>
                  <div className={styles.price}>
                    <label>Fiyat</label>
                    <input {...register("price", { required: true })} />
                    {errors.price && <span>Bu alanı doldurunuz.</span>}
                  </div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.footer}>
                  {" "}
                  <label>Açıklama</label>
                  <input {...register("description", { required: true })} />
                  {errors.description && <span>Bu alanı doldurunuz.</span>}
                  <label>Kategori</label>
                  <input {...register("category", { required: true })} />
                  {errors.category && <span>Bu alanı doldurunuz.</span>}
                  <button type="submit">Kaydet</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.columns}>
        {showSideMenu && (
          <div className={styles.sideMenu} id="sideMenu">
            <h2>Kategoriler</h2>
            <div>
              <input
                type="checkbox"
                name="category"
                onClick={() => {
                  getAllProducts()
                  setCategory("Products")
                }}
              />
              <label name="category">Hepsi</label>
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

                  <label name="category">
                    {i[0]?.toUpperCase() + i?.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className={styles.main}>
          <div className={styles.flex}>
            <h2>
              {category ? (
                category[0]?.toUpperCase() + category?.slice(1)
              ) : (
                <div>Ürünler</div>
              )}
            </h2>
            <div className={styles.dropdown}>
              <p
                className={styles.dropdownP}
                onClick={() => setShowSideMenu(!showSideMenu)}
              >
                Kategorileri Göster
              </p>
              <div>
                <button
                  id="myBtn"
                  onClick={() =>
                    (document.getElementById("myModal").style.visibility =
                      "visible")
                  }
                >
                  +
                </button>
              </div>{" "}
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
