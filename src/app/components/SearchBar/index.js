'use client';
import {useState} from 'react';

const SearchBar = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');

  let timeoutId;

  const handleChange = event => {
    const term = event.target.value;
    setSearchTerm(term);

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      onSearch(term);
    }, 300);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleChange}
      className="w-full p-2 bg-main text-white border-2 border-second rounded "
    />
  );
};

export default SearchBar;
