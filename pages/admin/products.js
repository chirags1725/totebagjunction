import Bagbox from '@/Components/Bagbox'
import Loader from '@/Components/loader'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const products = () => {
    const [data, setdata] = useState(null)
  const [message, setMessage] = useState("");
  const router = useRouter()



    
    const fetchdata = async () =>{
        let data = await fetch(`/api/getproducts`).then(a=>{
            return a.json()
        }).then(a=> {
            setdata(a)
            sessionStorage.setItem('data',JSON.stringify(a))
        })
    }
    useEffect(() => {
        let cred=localStorage.getItem("cred")

        if(!cred){
        router.push("/admin")
        }
        if (typeof window !== 'undefined') {
          const savedData = sessionStorage.getItem('data');
          if (savedData) {
            setdata(JSON.parse(savedData))
          }
          else{
            fetchdata()
          }
        }
        // if(!data){
        //   fetchdata()
        //   }
      
      }, [])
      const deleteItem =(e)=>{
        console.log(e.target.value)
        setMessage("being deleted")
        fetch(`/api/delete?id=${e.target.value}`).then(()=>{
            fetchdata()
        }).then(()=>{
            setMessage("")
        })
      }
    

    
  return (
    <div>
        {message && (
      <p style={{position:"fixed",top:"80px",left:"0px", background: "lightgreen", textAlign: "center", marginBottom: "16px", padding: "10px",position:'fixed',top:'80px',zIndex:'10000',width:'100vw' }}>
          {message}
        </p>
        )}
        <div style={{display:"flex",maxWidth:"100vw",flexWrap:"wrap",columnGap:"10px",rowGap:"20px"}}>
        {data ? data.map((e)=>{
          return <div  key={e._id} >
            <Bagbox price={e.price} title={e.title} image={e.image}></Bagbox>
            <button style={{height:"fit-content",
                width:"fit-content",
                padding:"10px 20px",
                backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    top:"50%"
            }} onClick={deleteItem} value={e._id}>
                Delete</button>
            </div>
        }) : <Loader />}
        
        </div>
    </div>
  )
}

export default products
