import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/shop.module.css";
import Link from "next/link";
import Head from "next/head";
import { FaAngleLeft } from "react-icons/fa6";
import Loader from "@/Components/loader";

export default function Page(props) {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");
  const [colorIndex, setColorIndex] = useState(0);

  const incrementQuantity = () => {
    if (quantity < 50) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { slug } = props;
        const response = await fetch(`/api/getproduct?id=${slug}`);
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  const addToCart = () => {
    if (colorIndex === null) { 
      setMessage("Please select a color");
      return;
    }

    const newItem = {
      id: props.slug,
      quantity: quantity,
      color: data[0].color.split(',')[colorIndex],
      title:data[0].title,
      price:data[0].price
    };

    const updatedCartItems = [...cartItems, newItem];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
    setQuantity(1);

    setMessage("Item added successfully");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const handleColorClick = (index,color) => {
    setColorIndex(index); 
  };

  const back=()=>{
    router.back()

  }

  return (
    <>
    
      <div onClick={back} style={{color:"blue",fontSize:'16px',padding:"10px 20px",lineHeight:'16px',display:'flex',position:"relative",marginLeft:"20px",marginTop:"10px",width:"fit-content"}}><FaAngleLeft></FaAngleLeft>Back</div>

      {message && (
        <p style={{ background: "lightgreen", textAlign: "center", marginBottom: "16px", padding: "10px",position:'fixed',top:'80px',zIndex:'10000',width:'100vw' }}>
          {message}
        </p>
      )}
      {data ? (
        <div className={styles.data}>
          <div className={styles.img}>
            <img src={`data:image/png;base64,${data[0].image}`} alt="Image" />
          </div>
          <div>
            <div className={styles.title}>{data[0].title}</div>
            <div className={styles.desc}>{data[0].description}</div>
            <div className={styles.price}>&#8377; {data[0].price}</div>
            <div className={styles.colors}>
              {data &&
                data[0].color.split(",").map((color, index) => (
                  <div key={index} style={{ backgroundColor: color, border : index === colorIndex ? '2px solid blue' :'1px solid black' , boxShadow: index === colorIndex && '0px 0px 5px black'}} className={styles.color} onClick={() => handleColorClick(index,color)}></div>
                ))}
            </div>
            <div style={{ marginLeft:"20px",marginTop: "20px", display: "flex", alignItems: "center", marginBottom: "24px" }}>
              <button style={{ fontSize: "18px", marginRight: "8px", padding: "4px 8px", border: "1px solid #ccc", borderRadius: "4px" }} onClick={decrementQuantity}>
                -
              </button>
              <span style={{ fontSize: "18px", fontWeight: "bold", marginRight: "8px" }}>{quantity}</span>
              <button style={{ fontSize: "18px", marginRight: "8px", padding: "4px 8px", border: "1px solid #ccc", borderRadius: "4px" }} onClick={incrementQuantity}>
                +
              </button>
            <button style={{ marginLeft:"20px",fontSize: "14px", padding: "20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }} onClick={addToCart}>
              Add to Cart
            </button>
            </div>
          </div>
        </div>
      ) : (
        <Loader/>
      )}

    </>

  );
}


export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  return { props: { slug: slug } };
};
