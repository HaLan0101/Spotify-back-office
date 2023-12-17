'use client';
import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {getArtist, deleteAlbum} from '@/app/api';
import AlbumCard from '@/app/components/AlbumCard';
import Background from '@/../../public/icons/background1.jpg';
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ArtistPage = () => {
  const [artist, setArtist] = useState([]);
  const {id} = useParams();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchArtist = id => {
      getArtist(id)
        .then(data => {
          setArtist(data);
          setAlbums(data.albums || []);
        })
        .catch(error => {
          console.error('Error fetching artist:', error);
        });
    };
    fetchArtist(id);
  }, [id, albums]);

  const albumsNr = albums.length;

  const handleDeleteAlbumFromArtist = albumId => {
    deleteAlbum(albumId).then(() => {
      getArtist(id).then(updatedArtist => {
        setAlbums(updatedArtist.albums || []);
        toast.success('Album was deleted');
      });
    });
  };

  return (
    <div className="">
      <ToastContainer />
      <div className="w-full h-[300px] overflow-hidden p-1">
        <img src={Background.src} className="w-full h-full object-cover" />
      </div>
      <h1 className="text-white text-[25px] capitalize mx-11 my-2">
        {artist.name}
      </h1>
      <p className="text-second mx-11 font-semibold">
        Total number of albums · {albumsNr}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 w-full m-11">
        {artist.albums &&
          artist.albums.map(album => (
            <AlbumCard
              album={album}
              onDelete={() => handleDeleteAlbumFromArtist(album.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default ArtistPage;
