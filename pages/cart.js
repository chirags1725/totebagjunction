import React, { useState, useEffect } from "react";
import Link from "next/link";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    }
  }, []);

  const removeItem = (index) => {
    const updatedCartItems = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedCartItems);
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2);
  };


  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Cart</h1>
      {cartItems.length === 0 ? (
        <p style={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Color</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index} style={styles.tr}>
                <td style={styles.td}>{item.title}</td>
                <td style={styles.td}>{item.color}</td>
                <td style={styles.td}>{item.quantity}</td>
                <td style={styles.td}>{item.price}</td>
                <td style={styles.td}><button style={styles.removeBtn} onClick={() => removeItem(index)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}



      <div style={styles.bottom}>
        <div className={styles.total}>Total: &#8377;{calculateTotalPrice()} <span style={{fontSize:'2em', lineHeight:'2em', fontWeight:'10', color:'#00000080'}}> | </span> {cartItems.length === 1 ? cartItems.length + ' Item' : cartItems.length + ' Items'} </div>
        <div><Link style={{ fontSize: "14px", padding: "12px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }} href={'/checkout'}>Buy Now</Link></div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  emptyCart: {
    fontSize: "18px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    border: "1px solid #ddd",
    overflowX: "auto"
  },
  th: {
    backgroundColor: "#f2f2f2",
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    borderTop: "1px solid #ddd",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
  removeBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  bottom: {
    position:'fixed',
    bottom:'0px',
    left: 0,
    right: 0,
    paddingLeft:'7vw',
    paddingRight:'7vw',
    height:'60px',
    width:'86vw',
    transform:'translate(-50%)',
    borderTop:'1px solid gray',
    marginLeft:'0px',
    left:'50%',
    backgroundColor:'white',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    lineHeight:'80px',
    justifyContent:'space-between'

  },
};

export default CartPage;
