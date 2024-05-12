import React, { useEffect, useState } from 'react';
import styles from '@/styles/checkout.module.css'; 
import { useRouter } from "next/navigation";
import sha256 from "crypto-js/sha256";
import { redirect } from "next/navigation";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
// import styles from "@/styles/shop.module.css";


const CheckoutPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");



  const [cartItems, setCartItems] = useState([]);

  // Function to retrieve items from local storage
  useEffect(() => {
    const localStorageItems = localStorage.getItem('cartItems');
    if (localStorageItems) {
      setCartItems(JSON.parse(localStorageItems));
    }
  }, []);

  const handlePhone = (e) => {
    const input = e.target.value.replace(/\D/g, '');

    // Limit input to 10 digits
    const limitedInput = input.slice(0, 10);
    setPhone(limitedInput);
  };
  const handleName = (e) => {
    setName(e.target.value)
  };
  const handleEmail = (e) => {
    setEmail(e.target.value)
  };
  const handleZip = (e) => {
    const newValue = e.target.value;
    setZip(newValue)
    if (newValue.length === 6) {

      let zipdata = fetch(`https://api.postalpincode.in/pincode/${newValue}`).then((a)=>{
      return a.json()
    }).then((a)=>{
      if(a[0].Message == "No records found"){
        setState("Invalid zip code")
        setDistrict("Invalid zip code")
      }
      else{
        console.log(a)

        setState(a[0].PostOffice[0].State)
        setDistrict(a[0].PostOffice[0].District)
      }

    })
    // console.log(zipdata)
    }
    else{
      setState('')
        setDistrict('')
    }

   
  };
  const handleAddress = (e) => {
    setAddress(e.target.value)
  };

  const calculatePrice = async () =>{
    const cart = localStorage.getItem("cartItems") || []
    try{
      JSON.parse(cart)
      if(JSON.parse(cart).length > 0){
    // console.log(JSON.parse(cart)[0])
    const ids = []
    JSON.parse(cart).forEach(e=>{
      let a = [e.id,e.quantity]
      ids.push(a)
    })
    // console.log(ids)

    const response = await fetch('/api/getprices', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(ids), // body data type must match "Content-Type" header
    }).then(a=>{
      return (a.json())
    }).then(a=>{
      if(a.error){
        setMessage(a.error)
        setTimeout(() => {
          setMessage('');
        }, 4000);
      }
      else{
      console.log(a.price)
      }
    })
  
  }else{
    setMessage("Empty Cart");

    setTimeout(() => {
      setMessage("");
    }, 2000);
    
  }
}catch(error){
  setMessage("Empty Cart");

    setTimeout(() => {
      setMessage("");
    }, 2000);
}
  }



    return (
      <>
          {message && (
      <p style={{position:"fixed",top:"80px",left:"0px", background: "red", textAlign: "center", marginBottom: "16px", padding: "10px",position:'fixed',top:'80px',zIndex:'10000',width:'100vw' }}>
          {message}
        </p>
        )}
        <div className={styles.checkout}>
        
          <form onSubmit={(e) => {e.preventDefault()}}>
          <h1>Checkout</h1>
          <h3>1. Delivery Details</h3>

          <div className={styles.double}>
            <div className={styles.input}>
              <input type='text' required value={name}
        onChange={handleName}/>
              <span>Name</span>
            </div>
            <div className={styles.input}>
              <input type='email' required value={email}
        onChange={handleEmail}></input>
              <span>Email</span>
            </div>
          </div>


          <div className={styles.double}>
            <div className={styles.input}>
              <textarea type='text' required rows={'4'} value={address}
        onChange={handleAddress}/>
              <span>Address</span>
            </div>
          </div>



          <div className={styles.double}>
            <div className={styles.input}>
              <input type='text' maxLength={10} // Restricts typing after 10 characters
      pattern="[0-9]*" minLength={10} required value={phone}
        onChange={handlePhone}
/>
              <span>Phone</span>
            </div>
            <div className={styles.input}>
              <input type='number' minLength={'6'} maxLength={'6'} required value={zip}
        onChange={handleZip}></input>
              <span>Zipcode</span>
            </div>
          </div>


          <div className={styles.double}>
            <div className={styles.input}>
              <input type='text' disabled placeholder='State' value={state} required />
              {/* <span>State</span> */}
            </div>
            <div className={styles.input}>
              <input type='text' disabled placeholder='District' value={district}></input>
              {/* <span>District</span> */}
            </div>
          </div>

          <h3>2. Apply promo code</h3>
        

        <div className={styles.promo}>
        <div className={styles.input}>
              <input type='text' />
              <span>Have a promo code?</span>
            </div>

        <button className={styles.button} onClick={(e)=>{e.preventDefault()}}>Apply</button>
        </div>



        <div>
      <h3>3. Cart Review & Pay</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Color</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.color}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button type='submit' onClick={calculatePrice} className={styles.pay} >Pay now</button>
    </form>
    {error && error}
    </div>
    </>
    );
}

// export async function getServerSideProps() {

//   // let data = localStorage.getItem("cart")
//   // console.log(data) 

// }


export default CheckoutPage;
