'use client';
import {useState, useEffect, useCallback} from 'react';
import {useRouter} from 'next/navigation';
import {deleteArtist, getArtists, updateArtist, createArtist} from '@/app/api';
import Button from '@/app/components/Button';
import ArtistBar from '@/app/components/ItemBar';
import TitleButton from '@/app/components/TitleButton';
import artistsbg from '@/../../public/icons/artistsbg.jpg';
import Modal from '@/app/components/Modal';
import Loader from '@/app/components/Loader';
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);
  const [artistToUpdate, setArtistToUpdate] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleCreate = e => {
    e.preventDefault();
    createArtist({name: name})
      .then(() => {
        setOpenCreateModal(false);
        setName('');
        return getArtists();
      })
      .then(updatedArtists => {
        setArtists(updatedArtists);
        toast.success('Artist created successfully');
      })
      .catch(error => console.error('Error creating artist:', error));
  };

  const handleUpdate = useCallback(
    (e, id) => {
      e.preventDefault();
      updateArtist(id, {name: name})
        .then(res => {
          setArtists(res);
          closeModal();
          setName('');
          toast.success('Artist updated successfully');
        })
        .catch(error => console.error('Error updating artist:', error));
    },
    [setArtists, name],
  );

  const handleDeleteArtist = useCallback(
    id => {
      deleteArtist(id)
        .then(data => {
          setArtists(data);
          toast.success('Artist deleted');
        })
        .catch(error => console.error('Error deleting artist:', error));
    },
    [setArtists],
  );

  const openModal = artist => {
    setArtistToUpdate(artist.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setArtistToUpdate(null);
    setIsModalOpen(false);
  };
  if (loading) return <Loader />;

  return (
    <div className="w-full">
      <ToastContainer position="bottom-right" />
      <div>
        <div className="flex justify-center h-[300px]">
          <img src={artistsbg.src} className="h-full " />
        </div>
        <div className="p-[30px]">
          <TitleButton
            title="Artist"
            onClick={() => setOpenCreateModal(true)}
          />
          <div className="flex text-[25px] text-main font-semibold pt-3 mx-[40px]">
            <p className="pr-[40px]">Id</p>
            <p>Name</p>
          </div>
          <ul className="mt-4 mx-[20px]">
            {artists &&
              artists.map((artist, index) => (
                <ArtistBar
                  key={index}
                  item={artist}
                  href={`/artists/${artist.id}`}
                  onDelete={() => handleDeleteArtist(artist.id)}
                  onUpdate={() => openModal(artist)}
                />
              ))}
          </ul>
        </div>
      </div>

      {openCreateModal && (
        <Modal onClose={() => setOpenCreateModal(false)}>
          <form onSubmit={handleCreate} className="mt-4 flex justify-center">
            <input
              type="text"
              placeholder="Name"
              onChange={e => setName(e.target.value)}
              className="bg-main text-white border-2 border-second  p-2 mr-3 rounded"
            />
            <Button type="submit">Create</Button>
          </form>
        </Modal>
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <form
            onSubmit={e => {
              handleUpdate(e, artistToUpdate);
            }}
            className="mt-4 flex justify-center">
            <input
              type="text"
              placeholder="Updated Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-main text-white border-2 border-second  p-2 mr-3 rounded"
            />
            <Button type="submit">Update</Button>
          </form>
        </Modal>
      )}
    </div>
  );
}
