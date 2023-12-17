'use client';
import {useState, useEffect} from 'react';
import {
  deleteAlbum,
  getAlbums,
  getArtists,
  createAlbum,
  updateAlbum,
} from '@/app/api';
import Modal from '@/app/components/Modal';
import AlbumBackground from '@/../../public/icons/albumBackground.jpg';
import TitleButton from '@/app/components/TitleButton';
import AlbumCard from '@/app/components/AlbumCard';
import Link from 'next/link';
import Button from '@/app/components/Button';
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
  const [title, setTitle] = useState('');
  const [cover, setCover] = useState(null);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState();
  const [selectedAlbum, setSelectedAlbum] = useState();

  useEffect(() => {
    getAlbums()
      .then(data => {
        setAlbums(data);
      })
      .catch(error => {
        console.error('Error fetching artists:', error);
      });
  }, []);

  useEffect(() => {
    getArtists()
      .then(data => {
        setArtists(data);
      })
      .catch(error => {
        console.error('Error fetching artists:', error);
      });
  }, []);

  const handleDelete = id => {
    deleteAlbum(id)
      .then(data => {
        setAlbums(data);
        toast.success('Album deleted');
      })
      .catch(error => console.error('Error deleting artist:', error));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('imageFile', cover);
    formData.append('artistId', selectedArtist);
    console.log(title, selectedArtist, cover);
    createAlbum(e, formData)
      .then(data => {
        setModalOpen(false);
        setTitle('');
        setSelectedArtist(null);
        getAlbums().then(data => setAlbums(data));
      })
      .catch(error => {
        console.error('Error creating album:', error);
      });
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('imageFile', cover);
    updateAlbum(id, formData)
      .then(data => {
        setUpdateModal(false);
        getAlbums().then(data => setAlbums(data));
        toast.success('Album updated successfully');
      })
      .catch(error => {
        console.error('Error creating album:', error);
      });
  };

  const updateMod = album => {
    setUpdateModal(true);
    setSelectedAlbum(album.id);
  };

  const handleCoverChange = e => {
    const file = e.target.files[0];
    setCover(file);
  };
  return (
    <div>
      <ToastContainer />
      <div className="mx-5">
        <div className="w-full h-[300px] overflow-hidden">
          <img
            src={AlbumBackground.src}
            className="w-full h-full object-cover"
          />
        </div>
        <TitleButton title="album" onClick={() => setModalOpen(true)} />
        <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 w-full m-4">
          {albums &&
            albums.map((album, index) => (
              <AlbumCard
                onDelete={() => handleDelete(album.id)}
                onUpdate={() => updateMod(album)}
                album={album}
              />
            ))}
        </ul>
      </div>
      {updateModal && (
        <Modal
          onClose={() => {
            setUpdateModal(false);
            setCover(null);
          }}>
          <form
            onSubmit={e => {
              handleUpdate(e, selectedAlbum);
            }}
            className="flex flex-col items-center p-4 space-y-4">
            <input
              onChange={e => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              value={selectedAlbum.name}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-second"
            />
            <label className="flex items-center justify-center w-full p-4 bg-gray-100 border-2  rounded cursor-pointer">
              <span className="text-base text-gray-600">
                {cover ? cover.name : 'Upload Cover Image'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
              />
            </label>
            <Button type="submit">Update</Button>
          </form>
        </Modal>
      )}

      {modalOpen && (
        <Modal
          onClose={() => {
            setModalOpen(false);
            setCover(null);
          }}>
          <form
            onSubmit={e => {
              handleSubmit(e);
            }}
            className="flex flex-col items-center p-4 space-y-4">
            <input
              onChange={e => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              className="w-full px-4 py-2  rounded"
            />
            <label className="flex items-center justify-center w-full p-4 bg-gray-100  rounded cursor-pointer">
              <span className="text-base text-gray-600">
                {cover ? cover.name : 'Upload Cover Image'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
              />
            </label>
            <select
              value={selectedArtist}
              onChange={e => setSelectedArtist(e.target.value)}
              className="w-full px-4 py-2  rounded ">
              <option value="">Select Artist</option>
              {artists.map(artist => (
                <option key={artist.id} value={artist.id}>
                  {artist.name}
                </option>
              ))}
            </select>
            <Button type="submit">Create Album</Button>
          </form>
        </Modal>
      )}
    </div>
  );
}
