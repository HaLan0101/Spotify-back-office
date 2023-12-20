'use client';
import {useState, useRef, useEffect} from 'react';
import Loader from '../Loader';
import Link from 'next/link';
import index from '../TitleButton';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const callRef = useRef(null);

  useEffect(() => {
    if (input.length > 0) {
      setLoading(true);
      clearTimeout(callRef.current);
      callRef.current = setTimeout(() => {
        fetch('http://localhost:3000/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({keyword: input}),
        })
          .then(response => response.json())
          .then(resultData => {
            console.log(resultData, 'resultdata');
            const {artists, albums, audios} = resultData;
            const searchData = [...artists, ...albums, ...audios];
            setData(searchData);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 300);
    }
  }, [input]);

  const handleLinkClick = () => {
    setInput('');
    setData([]);
  };

  const handleBodyClick = e => {
    if (!e.target.closest('.search-bar')) {
      setInput('');
      setData([]);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);
  // if (loading) return <Loader />;

  return (
    <div className="relative search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={input}
        onChange={e => setInput(e.target.value)}
        className="w-full p-2 bg-main text-white border-2 border-second rounded"
      />
      {loading ? <Loader /> : null}
      <div className="  flex flex-col mt-2 rounded max-h-[400px] w-full overflow-x-hidden absolute top-full left-0 z-50 bg-main group">
        {data.length === 0 && input.length > 0 ? (
          <div className="text-third text-center">Nothing found</div>
        ) : (
          data.map((item, index) => (
            <div
              key={index}
              className="hover:bg-second p-2 text-[12px]  flex flex-col">
              {item.name && (
                <Link
                  href={`/artists/${item.id}`}
                  onClick={handleLinkClick}
                  className="w-full">
                  <span className="text-second group-hover:text-main">
                    ar -
                  </span>
                  {item.name}
                </Link>
              )}
              {item.cover && (
                <Link href={`/albums/${item.id}`} onClick={handleLinkClick}>
                  <span className="text-second">al -</span>
                  {item.title}
                </Link>
              )}
              {item.file && (
                <Link
                  href={`/albums/${item.albumId}`}
                  onClick={handleLinkClick}>
                  <span className="text-second">au -</span>
                  {item.title}
                </Link>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchBar;
