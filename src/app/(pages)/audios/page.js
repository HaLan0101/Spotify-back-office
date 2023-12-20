'use client';
import {useState, useEffect, useMemo, useCallback} from 'react';
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
import Loader from '@/app/components/Loader';
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(false);

  const fetchAudios = page => {
    setLoading(true);
    getAudios(page)
      .then(newData => {
        setAudios(newData);
      })
      .catch(error => {
        console.error('Error fetching audios:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAudios(page);
  }, [page]);

  const fetchAlbums = useMemo(
    () => async () => {
      setLoading(true);
      try {
        const data = await getAlbums();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleCreateAudio = e => {
    setLoading(true);
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
      })
      .catch(error => {
        console.error('Error creating audio:', error);
      })
      .finally(() => {
        setLoading(false);
        toast.success('Audio created successfully');
      });
  };

  const handleUpdateAudio = (e, id) => {
    setLoading(true);
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
      })
      .catch(error => {
        console.error('Error updating audio:', error);
      })
      .finally(() => {
        setLoading(false);
        toast.success('Audio updated successfully');
      });
  };

  const update = audio => {
    setOpenUpdateModal(true);
    setUpdatedAudio(audio.id);
  };

  const handleDelete = audioId => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this audio?',
    );
    if (isConfirmed) {
      setLoading(true);
      deleteAudio(audioId)
        .then(data => {
          setAudios(data);
          toast.success('Audio deleted successfully');
        })
        .catch(error => {
          console.error('Error deleting audio:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleLoadPlus = useCallback(
    e => {
      e.preventDefault();
      setPage(prevPage => prevPage + 1);
      fetchAudios(page + 1);
    },
    [fetchAudios, page],
  );
  const handleLoadMinus = useCallback(
    e => {
      e.preventDefault();
      setPage(prevPage => prevPage - 1);
      fetchAudios(page - 1);
    },
    [fetchAudios, page],
  );
  if (loading) return <Loader />;
  return (
    <div className="w-full">
      <ToastContainer />
      <div className="w-full h-[300px] overflow-hidden">
        <img
          src={songsbg.src}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <TitleButton title="Audios" onClick={() => setOpenCreateModal(true)} />
      <div className="flex  w-full justify-between ">
        <div className="text-second flex justify-between font-semibold text-[20px] ml-[3%] w-[10%]">
          <p className="">Id</p>
          <p>Title</p>
        </div>
        <div className="text-second flex font-semibold text-[20px] w-[59%]">
          <p className="w-[225px]">Artist</p>
          <p className="">Album</p>
        </div>
      </div>
      <ul className="mx-[20px]">
        {audios &&
          audios.map(audio => (
            <ItemBar
              key={audio.id}
              item={audio}
              onDelete={() => handleDelete(audio.id)}
              onUpdate={() => update(audio)}
              showAlbum
              showArtist
            />
          ))}
      </ul>
      <div className="flex justify-between p-5 w-[30%] m-auto">
        {page != 0 && (
          <Button onClick={handleLoadMinus}>
            <p className="px-6">Back</p>
          </Button>
        )}
        {audios?.length > 0 && (
          <Button onClick={handleLoadPlus}>
            <p className="px-6">More</p>
          </Button>
        )}
      </div>
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
