import React from "react"
import styles from "../styles/Navbar.module.css"

function Click() {
  var navbar = document.querySelector(".main-nav ul")
  navbar.classList.toggle("active")
}

function Navbar() {
  return (
    <div className={styles.mainHeader}>
      <a href="index.html" className={styles.title}>
        Logo
      </a>
      <div className={styles.mainNav}>
        <a href="#">About</a>
        <a href="#">Team</a>
        <a href="#">Event Highlights</a>
        <a href="#">Collaboration</a>
        <a href="#">Contact Us</a>
      </div>
    </div>
  )
}

export default Navbar
