import React, { useEffect, useState } from "react";
import styles from '@/styles/login.module.css'
const signup = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  // const submitData = {name:"n",phone:"1",email:"ew",password:"dewoi"}
  // const fetchdata = async () => {
  //   try {
  //     // let qr =
  //     const res = await fetch(`http://localhost:3000/api/signup`, {
  //       method: "POST",
  //       body: JSON.stringify(submitData),
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchdata();
  // }, []);

  const handleChange = (e)=>{
    switch (e.target.name) {
      case 'name':
        setName(e.target.value)
        break;
      case 'phone':
        setPhone(e.target.value)
        break;
      case 'email':
        setEmail(e.target.value)
        break;
      case 'password':
        setPass(e.target.value)
        break;
    }
  }
  return <div className={styles.container}>
    <form>
      <h2>Sign Up</h2>
    <input name="name" value={name} required  type="text" onChange={handleChange} placeholder="Name"></input><br></br>
    <input name="phone" value={phone} required  type="text" onChange={handleChange} placeholder="Phone"></input><br></br>
    <input name="email" value={email} required type="email" onChange={handleChange} placeholder="Email"></input><br></br>
    <input name="password" value={pass} required type="text" onChange={handleChange} placeholder="Password"></input><br></br>
    <button type="submit">Submit</button>
    </form>
  </div>;
};

export default signup;
