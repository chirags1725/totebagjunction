import React, { useEffect, useState } from 'react'
// import styles from '@/styles/box.module.css'
import styles from "@/styles/shop.module.css";
import Link from 'next/link';
import Image from 'next/image'
import Bagbox from '@/Components/Bagbox'
import Loader from '@/Components/loader';
import Footer from '@/Components/Footer';

const shop = () => {
    const [data, setdata] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);

    
    const fetchdata = async () =>{
        await fetch(`/api/getproducts?products=10&page=${currentPage}`).then(a=>{
            return a.json()
        }).then(a=> {
            setdata(a.userdata)
            setCount(a.totalCount)
        })
    }
    console.log(count)


    useEffect(() => {
      fetchdata()
    
    }, [])
    

    const buttons = [];
    for (let i = 0; i < Math.ceil(count / 10); i++) {
      buttons.push(<button style={{padding:"8px", background:i+1===currentPage ? "rgba(0,0,255,.2)":"rgba(0,0,255,.04)",border:'none',margin:'4px', outline:"none",cursor:"pointer"}} key={i} onClick={()=>{setCurrentPage(i+1)
        setdata('')
        window.scrollTo(0,0)}}>{i + 1}</button>);
    }
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <center style={{marginTop:'20px',fontWeight:"600",fontSize:'1.1em'}}>{data && `Showing ${data.length} products`}</center>
      <div style={{display:"flex",flexWrap:"wrap",position:"relative",alignItems:"center",textAlign:"center",width:"80vw",justifyContent:"center",left:"50%",transform:"translateX(-50%)",marginTop:"40px",marginBottom:"40px"}}><button
  disabled={currentPage === 1}
  onClick={() => {setCurrentPage(currentPage - 1)
    setdata('')
    window.scrollTo(0,0)
  }}style={{
    padding: '8px 16px',
    margin: '0 8px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: currentPage === 1 ? '#ccc' : '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
  }}
>
  Previous Page
</button>
{/* {Array.from({ length: count }, (_, i) => (
  <button key={i}>{i + 1}</button>
))} */}
{buttons}
<button
disabled={currentPage === Math.ceil(count / 10)}
  onClick={() => {setCurrentPage(currentPage + 1)
    setdata('')
    window.scrollTo(0,0)
  }}
  style={{
    padding: '8px 16px',
    margin: '0 8px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: currentPage === Math.ceil(count / 10) ? '#ccc' : '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: currentPage === Math.ceil(count / 10) ? 'not-allowed' : 'pointer',
  }}
>
  Next Page
</button>
</div>



<Footer></Footer>
    </div>
  )
}

export default shop
