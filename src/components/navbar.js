import React, { useState } from "react"
import styles from "../styles/Navbar.module.css"

function Navbar() {
  const [showToggle, setShowToggle] = useState(false)
  return (
    <>
      <div className={styles.mainHeader}>
        <a href="index.html" className={styles.title}>
          Logo
        </a>{" "}
        <div
          id="toggleIcon"
          onClick={() => {
            setShowToggle(!showToggle)
          }}
        >
          <div className={styles.toggleIcon}></div>
          <div className={styles.toggleIcon}></div>
          <div className={styles.toggleIcon}></div>
        </div>
      
      <div className={styles.mainNav}>
        <a href="#">About</a>
        <a href="#">Team</a>
        <a href="#">Event Highlights</a>
        <a href="#">Collaboration</a>
        <a href="#">Contact Us</a>
      </div>
</div>
      {showToggle && (
        <div className={styles.toggleMenu} id="toggleMenu">
          <a href="#">About</a>
          <a href="#">Team</a>
          <a href="#">Event Highlights</a>
          <a href="#">Collaboration</a>
          <a href="#">Contact Us</a>
        </div>
      )}
    </>
  )
}

export default Navbar
