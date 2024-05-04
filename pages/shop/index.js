import React, { useEffect, useState } from 'react'
// import styles from '@/styles/box.module.css'
import styles from "@/styles/shop.module.css";
import Link from 'next/link';
import Image from 'next/image'
import Bagbox from '@/Components/Bagbox'
import Loader from '@/Components/loader';

const shop = () => {
    const [data, setdata] = useState(null)
    
    const fetchdata = async () =>{
        let data = await fetch(`/api/getproducts`).then(a=>{
            return a.json()
        }).then(a=> {
            setdata(a)
            sessionStorage.setItem('data',JSON.stringify(a))
            console.log(a)
        })
    }

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const savedData = sessionStorage.getItem('data');
        if (savedData) {
          setdata(JSON.parse(savedData))
        }
        else{
          fetchdata()
        }
      }
      if(!data){
        fetchdata()
        }
    
    }, [])
    
    // const [base64Image, setBase64Image] = useState(null);

    // const handleFileChange = event => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             // Convert the image to base64 string
    //             const base64String = reader.result.split(',')[1];
    //             console.log(base64String)
    //             setBase64Image(base64String);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };
  return (
    <div className={styles.all}>
      <h2 className={styles.bagshead}>Shop from our latest collection</h2>
      <div className={styles.bags}>
        {data ? data.map((e)=>{
          return <Link href={`/shop/${e._id}`} key={e._id} >
          <Bagbox price={e.price} title={e.title} image={e.image}></Bagbox>
        </Link>
        }) : <Loader/>}

      </div>
      <center style={{marginTop:'20px',fontWeight:"600",fontSize:'1.1em'}}>{data && `Showing ${data.length} products`}</center>


    </div>
  )
}

export default shop
