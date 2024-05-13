import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Bagbox from '@/Components/Bagbox';
import styles from '@/styles/shop.module.css'
import Loader from './loader';


const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState(null);


  const fetchdata = async() =>{
    await fetch(`/api/getproducts?page=${1}`).then(a=>{
    return a.json()
}).then(a=> {
    setData(a.userdata)
})}
  useEffect(() => {
    fetchdata()
    
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredResults = data.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase()) || item.price.toLowerCase().includes(query.toLowerCase()) || item.color.toLowerCase().includes(query.toLowerCase()) 
    
    );
    setSearchResults(filteredResults);
    if(query == ""){
        setSearchResults([])
    }
  };

  return (
    <div className={styles.search} style={{marginBottom:"40px"}}>
      {data ? <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by name"
      /> : <div style={{position:"absolute",left:"50%",marginTop:"10px"}}><Loader></Loader></div>}
      <ul>
      <div className={styles.bags}>
        {searchResults.map(e => (
            <Link href={`/shop/${e._id}`} key={e._id} onClick={window.location.reload}>
            <Bagbox price={e.price} title={e.title} image={e.image}></Bagbox>
          </Link>
        ))}
        </div>
      </ul>
    </div>
  );
};

export default SearchPage;
