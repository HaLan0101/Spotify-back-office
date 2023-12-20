'use client';
import {useState, useEffect, useCallback} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {useParams} from 'next/navigation';
import Modal from '@/app/components/Modal';
import {
  getAlbum,
  createAudioAlbum,
  deleteAudioAlbum,
  updateAudioAlbum,
} from '@/app/api';
import TitleButton from '@/app/components/TitleButton';
import Loader from '@/app/components/Loader';
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@/app/components/Button';
import ItemBar from '@/app/components/ItemBar';
import Link from 'next/link';

const AlbumPage = () => {
  const [album, setAlbum] = useState();
  const {id} = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [audioTitle, setAudioTitle] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updatedAudio, setUpdatedAudio] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAlbum = id => {
      getAlbum(id)
        .then(data => {
          setAlbum(data);
        })
        .catch(error => {
          console.error('Error fetching album:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchAlbum(id);
  }, [id]);

  const handleCreate = e => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title', audioTitle);
    formData.append('audioFile', audioFile);
    formData.append('albumId', album.id);
    createAudioAlbum(formData)
      .then(updatedAlbum => {
        setAlbum(prevAlbum => ({
          ...prevAlbum,
          audios: updatedAlbum.audiosInAlbum,
        }));
        setIsModalOpen(false);
        toast.success('Audio added  successfully');
        setAudioFile(null);
        setAudioTitle('');
      })
      .catch(error => {
        console.error('Error adding audio:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateAudio = (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', audioTitle);
    formData.append('audioFile', audioFile);
    updateAudioAlbum(id, formData)
      .then(updatedAlbum => {
        setAlbum(prevAlbum => ({
          ...prevAlbum,
          audios: updatedAlbum.audiosInAlbum,
        }));
        setOpenUpdateModal(false);
        toast.success('Audio updated successfully');
        setAudioFile(null);
        setAudioTitle('');
      })
      .catch(error => {
        console.error('Error updating audio:', error);
      });
  };

  const update = audio => {
    setOpenUpdateModal(true);
    setUpdatedAudio(audio.id);
  };

  const handleDelete = useCallback(audioId => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this audio?',
    );
    if (!isConfirmed) {
      return;
    }
    setLoading(true);
    deleteAudioAlbum(audioId)
      .then(updatedAlbum => {
        setAlbum(prevAlbum => ({
          ...prevAlbum,
          audios: updatedAlbum.audiosInAlbum,
        }));
        toast.success('Audio delete successfully');
      })
      .catch(error => {
        console.error('Error deleting audio:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    const reorderedAudios = Array.from(album.audios);
    const [movedAudio] = reorderedAudios.splice(result.source.index, 1);
    reorderedAudios.splice(result.destination.index, 0, movedAudio);
    setAlbum(prevAlbum => ({
      ...prevAlbum,
      audios: reorderedAudios,
    }));
  };

  if (loading) return <Loader />;

  return (
    <div>
      <ToastContainer />
      <div>
        {album && album.cover && (
          <div className="w-full h-[300px] p-[12px] flex  items-center">
            <img
              className="h-full object-cover"
              src={album.cover}
              alt={album.title}
            />
            <div className="text-second ml-[20px]">
              <p className="text-[22px] font-bold"> Title</p>
              <p className="text-[40px] text-white">{album.title}</p>
              <p className=" w-fit mt-[15px] text-[17px] font-semibold uppercase text-second">
                Genre · <span className="text-white ">{album?.type}</span>
              </p>
              <Link href={`/artists/${album?.artist?.id}`}>
                <p className=" w-fit mt-[15px] text-[17px] font-semibold uppercase text-second">
                  Artist ·{' '}
                  <span className="text-white hover:border-b-2">
                    {album?.artist?.name}
                  </span>
                </p>
              </Link>
            </div>
          </div>
        )}
        <div>
          <TitleButton title="audio" onClick={() => setIsModalOpen(true)} />
        </div>
        <div className="mx-[20px]">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {album &&
                    album.audios?.map((audio, index) => (
                      <Draggable
                        key={audio.id}
                        draggableId={audio.id.toString()}
                        index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <ItemBar
                              item={audio}
                              onDelete={() => handleDelete(audio.id)}
                              onUpdate={() => update(audio)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
