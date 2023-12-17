'use client';
import {useState, useEffect} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {useParams} from 'next/navigation';
import Modal from '@/app/components/Modal';
import {getAlbum, createAudio, deleteAudio, updateAudio} from '@/app/api';
import TitleButton from '@/app/components/TitleButton';
import Button from '@/app/components/Button';
import ItemBar from '@/app/components/ItemBar';
import Link from 'next/link';

const AlbumPage = () => {
  const [album, setAlbum] = useState(null);
  const {id} = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [audioTitle, setAudioTitle] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updatedAudio, setUpdatedAudio] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAlbum = id => {
      getAlbum(id)
        .then(data => {
          setAlbum(data);
        })
        .catch(error => {
          console.error('Error fetching album:', error);
        });
    };
    fetchAlbum(id);
  }, [id]);

  const handleCreate = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', audioTitle);
    formData.append('audioFile', audioFile);
    formData.append('albumId', album.id);
    createAudio(formData)
      .then(res => {
        setAlbum(prevAlbum => ({
          ...prevAlbum,
          audios: res.audios,
        }));
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error('Error adding audio:', error);
      });
  };
  const handleUpdateAudio = (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', audioTitle);
    formData.append('audioFile', audioFile);
    updateAudio(id, formData)
      .then(data => {
        getAlbums().then(data => setAlbums(data));
        setOpenUpdateModal(false);
        setAudioTitle('');
        setAudioFile(null);
        setSelectedAudioId(null);
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
      .then(() => {
        setAlbum(prevAlbum => ({
          ...prevAlbum,
          audios: prevAlbum.audios.filter(audio => audio.id !== audioId),
        }));
      })
      .catch(error => {
        console.error('Error deleting audio:', error);
      });
  };

  return (
    <div>
      <div>
        <div className="">
          {album && album.cover && (
            <div className="w-1/3 h-[300px] p-[12px] ">
              <img
                className="w-full h-full object-cover"
                src={album.cover}
                alt={album.title}
              />
            </div>
          )}
          <div>
            <Link href={`/artists/${album?.artist.id}`}>
              <p className=" w-fit mx-[20px] mt-[15px] text-[20px] font-semibold uppercase text-second hover:text-white">
                Artist · {album?.artist.name}
              </p>
            </Link>
            <TitleButton title="audio" onClick={() => setIsModalOpen(true)} />
          </div>
        </div>

        <div className="mx-[20px]">
          <ul>
            {album &&
              album.audios?.map((audio, index) => (
                <ItemBar
                  item={audio}
                  onDelete={() => handleDelete(audio.id)}
                  onUpdate={() => update(audio)}
                />
              ))}
          </ul>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <form
            onSubmit={handleCreate}
            className="flex flex-col items-center p-4 space-y-4">
            <label className="text-white w-full">
              Title:
              <input
                type="text"
                value={audioTitle}
                onChange={e => setAudioTitle(e.target.value)}
                className="w-full text-black px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-second"
              />
            </label>
            <label className="flex items-center justify-center w-full p-4 bg-gray-100  rounded cursor-pointer">
              <span className="text-base text-gray-600">
                {audioFile ? audioFile.name : 'Choose Audio File'}
              </span>
              <input
                type="file"
                accept="audio/*"
                onChange={e => setAudioFile(e.target.files[0])}
                className="hidden"
              />
            </label>
            <Button type="submit">Create</Button>
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
};

export default AlbumPage;
