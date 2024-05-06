import React, { useEffect, useState } from 'react';
import styles from '@/styles/checkout.module.css'; 


const CheckoutPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');


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


    return (
        <div className={styles.checkout}>
          <form>
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
            <div className={styles.input} sty>
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
              <input type='text' disabled value={state} required />
              {/* <span>State</span> */}
            </div>
            <div className={styles.input}>
              <input type='text' disabled value={district}></input>
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
    <button type='submit'>button</button>
    </form>
    </div>
    );
}

// export async function getServerSideProps() {

//   // let data = localStorage.getItem("cart")
//   // console.log(data) 

// }


export default CheckoutPage;
