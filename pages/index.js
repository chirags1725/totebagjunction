import Head from "next/head";
import { useState,useEffect } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Bagbox from "../Components/Bagbox";
import Loader from "@/Components/loader";
import { Fade } from 'react-awesome-reveal';


const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [data, setdata] = useState(null)
    
    const fetchdata = async () =>{
        let data = await fetch(`/api/getproducts`).then(a=>{
            return a.json()
        }).then(a=> {
            setdata(a)
            sessionStorage.setItem('data',JSON.stringify(a))
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

  return (
    <>
      <Fade duration={'1000'}>
      <div className={styles.home}>
        <div className={styles.left}>
          <h1>New Arrivals</h1>
          
          <br></br><Link href="/shop">Browse Shop &rarr;</Link>
        </div>

        <div className={styles.right}>
          {/* <img className={styles.homeimg} src="https://i.etsystatic.com/21162700/r/il/a26648/4314612039/il_570xN.4314612039_pio8.jpg"></img> */}
        </div>
      </div>
      </Fade>


      <h1 className={styles.bagshead}>Latest Arrivals</h1>
      <div className={styles.bags}>
        {data ? data.slice(0,8).map((e)=>{
          return <Link href={`/shop/${e._id}`} key={e._id} >
            <Bagbox price={e.price} title={e.title} image={e.image}></Bagbox>
            </Link>
        }) : <Loader />}
      </div>
    </>
  );
}
