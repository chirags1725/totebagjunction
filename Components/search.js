import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Bagbox from '@/Components/Bagbox';
import styles from '@/styles/shop.module.css'


const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("data");
    if (storedData) {
      // Parse stored data from string to array
      setData(JSON.parse(storedData));
    }
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredResults = data.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
    if(query == ""){
        setSearchResults([])
    }
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by name"
      />
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
