'use client';
import {useState, useEffect} from 'react';
import {
  getAudios,
  deleteAudio,
  getAlbums,
  createAudio,
  updateAudio,
} from '@/app/api';
import ItemBar from '@/app/components/ItemBar';
import songsbg from '@/../../public/icons/songsbg.jpg';
import Modal from '@/app/components/Modal';
import TitleButton from '@/app/components/TitleButton';
import Button from '@/app/components/Button';
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Sounds() {
  const [audios, setAudios] = useState([]);
  const [audioTitle, setAudioTitle] = useState();
  const [audioFile, setAudioFile] = useState();
  const [selectedAlbum, setSelectedAlbum] = useState();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updatedAudio, setUpdatedAudio] = useState();
  const [albums, setAlbums] = useState();

  useEffect(() => {
    getAudios()
      .then(data => {
        setAudios(data);
      })
      .catch(error => {
        console.error('Error fetching audios:', error);
      });
  }, []);

  useEffect(() => {
    getAlbums()
      .then(data => {
        setAlbums(data);
      })
      .catch(error => {
        console.error('Error fetching audios:', error);
      });
  }, []);

  const handleCreateAudio = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', audioTitle);
    formData.append('audioFile', audioFile);
    formData.append('albumId', selectedAlbum);
    createAudio(formData)
      .then(data => {
        getAudios().then(data => setAudios(data));
        setOpenCreateModal(false);
        setAudioTitle('');
        setAudioFile(null);
        setSelectedAlbum('');
        toast.success('Audio created successfully');
      })
      .catch(error => {
        console.error('Error creating audio:', error);
      });
  };

  const handleUpdateAudio = (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', audioTitle);
    formData.append('audioFile', audioFile);
    updateAudio(id, formData)
      .then(() => {
        getAudios().then(data => setAudios(data));
        setOpenUpdateModal(false);
        setAudioTitle('');
        setAudioFile(null);
        setSelectedAudioId(null);
        toast.success('Audio updated successfully');
      })
      .catch(error => {
        console.error('Error updating audio:', error);
      });
  };

  const update = audio => {
    setOpenUpdateModal(true);
    setUpdatedAudio(audio.id);
  };

  const handleDelete = audioId => {
    deleteAudio(audioId)
      .then(data => {
        setAudios(data);
      })
      .catch(error => {
        console.error('Error deleting audio:', error);
      });
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <div className="w-full h-[300px] overflow-hidden">
        <img src={songsbg.src} className="w-full h-full object-cover" />
      </div>
      <TitleButton title="Audios" onClick={() => setOpenCreateModal(true)} />
      <div className="flex justify-between w-[60%]">
        <div className="text-second flex font-semibold text-[20px] pl-[5%]">
          <p className="pr-[39px]">Id</p>
          <p>Title</p>
        </div>
        <div className="text-second flex font-semibold text-[20px] justify-between w-[35%]">
          <p>Artist</p>
          <p className="pr-2">Album</p>
        </div>
      </div>
      <ul className="mx-[20px]">
        {audios &&
          audios.map(audio => (
            <ItemBar
              item={audio}
              onDelete={() => handleDelete(audio.id)}
              onUpdate={() => update(audio)}
              showAlbum
              showArtist
            />
          ))}
      </ul>
      {openCreateModal && (
        <Modal onClose={() => setOpenCreateModal(false)}>
          <form
            onSubmit={e => {
              handleCreateAudio(e);
            }}
            className="flex flex-col items-center p-4 space-y-4">
            <input
              type="text"
              placeholder="Title"
              onChange={e => setAudioTitle(e.target.value)}
              className="w-full px-4 py-2 rounded"
            />

            <label className="flex items-center justify-center w-full p-4 bg-gray-100  rounded cursor-pointer">
              <span className="text-base text-gray-600">
                {audioFile ? audioFile.name : 'Upload audio file'}
              </span>
              <input
                type="file"
                accept="audio/*"
                onChange={e => setAudioFile(e.target.files[0])}
                className="hidden"
              />
            </label>
            <select
              value={selectedAlbum}
              onChange={e => setSelectedAlbum(e.target.value)}
              className="w-full px-4 py-2  rounded ">
              <option value="">Select Album</option>
              {albums.map(album => (
                <option key={album.id} value={album.id}>
                  {album.title}
                </option>
              ))}
            </select>
            <Button onClick={handleCreateAudio}>Create Audio</Button>
          </form>
        </Modal>
      )}
      {openUpdateModal && (
        <Modal onClose={() => setOpenUpdateModal(false)}>
          <form
            onSubmit={e => {
              handleUpdateAudio(e, updatedAudio);
            }}
            className="flex flex-col items-center p-4 space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={audioTitle}
              onChange={e => setAudioTitle(e.target.value)}
              className="w-full px-4 py-2 rounded"
            />
            <label className="flex items-center justify-center w-full p-4 bg-gray-100 rounded cursor-pointer">
              <span className="text-base text-gray-600">
                {audioFile ? audioFile.name : 'Upload audio file'}
              </span>
              <input
                type="file"
                accept="audio/*"
                onChange={e => setAudioFile(e.target.files[0])}
                className="hidden"
              />
            </label>
            <Button type="submit">Update Audio</Button>
          </form>
        </Modal>
      )}
    </div>
  );
}
