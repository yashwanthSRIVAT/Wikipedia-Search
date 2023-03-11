import React, { useState, useEffect, useRef } from 'react';
import Wiki from './Wiki';
import './styles/styles.css';

function WikipediaSearch() {
  const [searchTerm, setSearchTerm] = useState('programming');
  const [searchResults, setSearchResults] = useState([]);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    const getSearchResults = () => {
      fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          const results = data[1].map((text, index) => ({
            color: index % 2 === 0 ? '#eeddee' : '#e2c7e2',
            text,
            link: data[3][index],
          }));
          setSearchResults(results);
        });
    };

    if (searchTerm.length > 0) {
      searchTimeoutRef.current = setTimeout(getSearchResults, 500);
    } else {
      searchTimeoutRef.current = setTimeout(() => setSearchResults([]), 200);
    }

    return () => clearTimeout(searchTimeoutRef.current);
  }, [searchTerm, searchTimeoutRef]);

  const handleSearchTermChange = event => {
    const newSearchTerm = event.target.value;
    clearTimeout(searchTimeoutRef.current);
    setSearchTerm(newSearchTerm);
  };

  return (
    <div id = 'wiki-search'>
      <h1 id = 'title'>Wikipedia Search</h1>
      <input
        data-test-id = 'searchterm'
        type="text"
        placeholder = "Search..."
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      {searchResults.length > 0 && ( searchResults.map(result => (
              <Wiki
                color = {result.color}
                title = {result.text}
                link = {result.link} />
          ))
      )}
    </div>
  );
}

export default WikipediaSearch;
