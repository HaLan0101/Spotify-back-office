'use client';
import {useState, useEffect, useMemo, useCallback} from 'react';
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
import Loader from '@/app/components/Loader';
import AlbumCard from '@/app/components/AlbumCard';
import Link from 'next/link';
import Image from 'next/image.js';
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import {types} from '../../../../public/typeList.js';
import 'react-toastify/dist/ReactToastify.css';
import FormAlbum from '@/app/components/FormAlbum';

export default function Page() {
  const [title, setTitle] = useState('');
  const [cover, setCover] = useState(null);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState();
  const [selectedAlbum, setSelectedAlbum] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const albumsData = useMemo(() => {
    setLoading(true);
    getAlbums()
      .then(data => {
        setAlbums(data);
      })
      .catch(error => {
        console.error('Error fetching artists:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    getArtists()
      .then(data => {
        setArtists(data);
      })
      .catch(error => {
        console.error('Error fetching artists:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = id => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this album?',
    );
    if (!isConfirmed) {
      return;
    }
    deleteAlbum(id)
      .then(data => {
        setAlbums(data);
        toast.success('Album deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting album:', error);
      });
  };

  const handleSubmit = e => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('imageFile', cover);
    formData.append('artistId', selectedArtist);
    formData.append('type', selectedType);
    createAlbum(formData)
      .then(data => {
        getAlbums().then(data => setAlbums(data));
        setModalOpen(false);
        setCover(null);
        setTitle('');
        setSelectedArtist(null);
      })
      .catch(error => {
        console.error('Error creating album:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdate = (e, id) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('imageFile', cover);
    formData.append('type', selectedType);
    updateAlbum(id, formData)
      .then(data => {
        setUpdateModal(false);
        setCover(null);
        getAlbums().then(data => setAlbums(data));
        toast.success('Album updated successfully');
      })
      .catch(error => {
        console.error('Error creating album:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateMod = useCallback(album => {
    setUpdateModal(true);
    setSelectedAlbum(album.id);
    setTitle(album.title);
    setSelectedType(album.type);
  }, []);

  const handleCoverChange = useCallback(e => {
    const file = e.target.files[0];
    setCover(file);
  }, []);
  if (loading) return <Loader />;
  return (
    <div>
      <ToastContainer />
      <div className="mx-5">
        <div className="w-full h-[300px] overflow-hidden">
          <Image
            width={800}
            height={300}
            src={AlbumBackground.src}
            alt="albums"
          />
        </div>
        <TitleButton title="album" onClick={() => setModalOpen(true)} />
        <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3  w-full m-4">
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
          <FormAlbum
            onSubmit={e => handleUpdate(e, selectedAlbum)}
            isUpdate
            title={title}
            setTitle={setTitle}
            cover={cover}
            types={types}
            handleCoverChange={handleCoverChange}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedArtist={selectedArtist}
            setSelectedArtist={setSelectedArtist}
          />
        </Modal>
      )}
      {modalOpen && (
        <Modal
          onClose={() => {
            setModalOpen(false);
            setCover(null);
          }}>
          <FormAlbum
            onSubmit={e => handleSubmit(e)}
            title={title}
            setTitle={setTitle}
            cover={cover}
            handleCoverChange={handleCoverChange}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedArtist={selectedArtist}
            setSelectedArtist={setSelectedArtist}
          />
        </Modal>
      )}
    </div>
  );
}
