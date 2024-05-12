import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/admin.module.css'
import Link from 'next/link'

const admin = () => {
    let router= useRouter()
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [price, setprice] = useState('')
    const [color, setcolor] = useState('')
    const [image, setImage] = useState('')
    const [data, setdata] = useState(null)
    const [message, setMessage] = useState("");


    const [error, setError] = useState(null)

    const handleTitle = (e) =>{
        settitle(e.target.value)
    }
    const handledesc = (e) =>{
        setdescription(e.target.value)
    }
    const handleprice = (e) =>{
        setprice(e.target.value)
    }
    const handlecolor = (e) =>{
        setcolor(e.target.value)
    }
    const handleimage = (e) => {
        const files = event.target.files;
    if (files.length === 0) {
        return;
    }
        const file = e.target.files[0]
        if (file.size > 1024*1024) {
            setError('File size exceeds the maximum allowed size (1MB). Please select a smaller file.');
            return;
        }
        const reader = new FileReader()
        reader.onloadend = () =>{
            
            if (reader.result) {
                const base64string = reader.result.split(',')[1]
            setImage(base64string)
            setError(null)
            } else {
                setError('Failed to read the selected file.');
            }
        }

        reader.readAsDataURL(file);
    }

    useEffect(()=>{
        let cred=localStorage.getItem("cred")

        if(!cred){
        router.push("/admin")
        }
    },[])


    const clg= async (e)=>{
        const jsonData = {
            title:title,
            color:color,
            description:description,
            price:price,
            image:image
          };
        
          fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ jsonData }),

          }).then((response)=>{
        return response.json()
            
    }).then((a)=>{
        setMessage(a.message)
        setTimeout(()=>setMessage(''),2000)
    })

    }
  return (
    <div className={styles.admin}>
        {message && (
      <p style={{position:"fixed",top:"80px",left:"0px", background: "red", textAlign: "center", marginBottom: "16px", padding: "10px",position:'fixed',top:'80px',zIndex:'10000',width:'100vw' }}>
          {message}
        </p>
        )}

        {error && error}
        <form onSubmit={clg}>
      <input type='text'  required  value={title} onChange={handleTitle} placeholder='Title'/>
      <input type='text'  required value={description} onChange={handledesc} placeholder='Description'/>
      <input type='text'  required value={color} onChange={handlecolor} placeholder='Colour'/>
      <input type='number' required  value={price} onChange={handleprice} placeholder='Price'/>
      <input type='file' required accept='image/*' onChange={handleimage}/>
      <button type='submit' disabled={error} value="Submit">Submit</button>
        </form>
        <h1 style={{marginTop:"10px"}}>Orders: </h1>
        <button onClick={()=>{
            router.push('/admin/orders')
        }}>Orders</button>

<h1 style={{marginTop:"10px"}}>Products</h1>
        <button onClick={()=>{
            router.push('/admin/products')
        }}>Products</button>
    </div>
  )
}

export default admin
