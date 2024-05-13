import Bagbox from '@/Components/Bagbox'
import Loader from '@/Components/loader'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const products = () => {
    const [data, setdata] = useState(null)
  const [message, setMessage] = useState("");
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);



    
    const fetchdata = async () =>{
        const data = await fetch(`/api/getproducts?products=10&page=${currentPage}`).then(a=>{
            return a.json()
        }).then(a=> {
            setdata(a.userdata)
            setCount(a.totalCount)
        })
    }
    useEffect(() => {
        let cred=localStorage.getItem("cred")

        if(!cred){
        router.push("/admin")
        }
        fetchdata()
      }, [currentPage])
      const deleteItem =(e)=>{
        console.log(e.target.value)
        setMessage("being deleted")
        fetch(`/api/delete?id=${e.target.value}`).then(()=>{
            fetchdata()
        }).then(()=>{
            setMessage("")
        })
      }

      const buttons = [];
    for (let i = 0; i < Math.ceil(count / 10); i++) {
      buttons.push(<button style={{padding:"8px", background:i+1===currentPage ? "rgba(0,0,255,.2)":"rgba(0,0,255,.04)",border:'none',margin:'4px', outline:"none",cursor:"pointer"}} key={i} onClick={()=>{setCurrentPage(i+1)
        setdata('')
        window.scrollTo(0,0)}}>{i + 1}</button>);
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
        }) : 
        <div style={{textAlign:"center",top:"50%",position:"absolute",left:"50%",transform:"translate(-50%,-50%)",transition:"0s"}}>
        <Loader/>
        </div>}
        
        </div>

        <div style={{display:"flex",flexWrap:"wrap",position:"relative",alignItems:"center",textAlign:"center",width:"80vw",justifyContent:"center",left:"50%",transform:"translateX(-50%)"}}><button
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

    </div>
  )
}

export default products
