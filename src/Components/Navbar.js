import React from 'react'
import { useNavigate } from 'react-router-dom';
import css from './Navbar.module.css'

function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={css.nabBarBox}>
        <div className={css.leftBar}>
          <div
            onClick={() => navigate("/dashboard")}
            className={css.navLink}
          >
            Create
          </div>
          <div
            onClick={() => navigate("/collection")}
            className={css.navLink}
          >
            Collection
          </div>
        </div>
        <div
          onClick={() => navigate("/")}
          className={css.navLink}
        >
          Logout
        </div>
      </div>
    </div>
  )
}

export default Navbar