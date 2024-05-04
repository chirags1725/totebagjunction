import React from "react";
import styles from "@/styles/Navbar.module.css";
import Head from "next/head";
import { FiMenu } from "react-icons/fi";
import { CiShoppingCart,CiSearch } from "react-icons/ci";
import { useState } from "react";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";
import SearchPage from "./search";

const Navbar = () => {
  const [shownav, setshownav] = useState(false)
  const [search, setsearch] = useState(false)

  const toggle = () =>{
    setshownav(!shownav)
  }
  const togglesearch = () =>{
    setsearch(!search)
  }
  return (
    <>
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.icon}>
          {shownav ? <IoCloseOutline onClick={toggle}/> : <FiMenu onClick={toggle} />}
        </div>
        <div className={styles.logo} style={{fontWeight:"800"}}><Link href="/">Tote Bag Junction</Link></div>
      </div>

      <div className={styles.right}>
        {search ? <IoCloseOutline style={{fontSize:'2em'}} onClick={togglesearch}/> : <CiSearch className={styles.search}  onClick={togglesearch}/>}

        <Link href={"/cart"}><CiShoppingCart className={styles.cart}/></Link>

      </div>
    </div>
    <div className={`${styles.menu} ${shownav ? styles.show : ''}`}>
      <div className={styles.links}>
      <Link href={"/"} onClick={toggle}>Home</Link>
      <Link href={"/shop"} onClick={toggle}>Shop</Link>
      
      </div>
    </div>
    {search && <SearchPage onClick={togglesearch}></SearchPage>}
      </>
  );
};

export default Navbar;
