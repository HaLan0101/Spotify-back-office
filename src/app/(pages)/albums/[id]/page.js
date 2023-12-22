'use client';
import {useState, useEffect, useCallback} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import Image from 'next/image';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {
  getAlbum,
  createAudioAlbum,
  deleteAudioAlbum,
  updateAudioAlbum,
  updateAlbum,
} from '@/app/api';
import TitleButton from '@/app/components/TitleButton';
import Update from '@/../../public/icons/update.svg';
import Loader from '@/app/components/Loader';
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemBar from '@/app/components/ItemBar';
import {types} from '../../../../../public/typeList';
import Modal from '@/app/components/Modal';
import FormAlbum from '@/app/components/FormAlbum';
import FormAudio from '@/app/components/FormAudio';

const AlbumPage = () => {
  //album
  const [album, setAlbum] = useState();
  const {id} = useParams();
  const [albumTitle, setAlbumTitle] = useState();
  const [albumCover, setAlbumCover] = useState();
  const [selectedType, setSelectedType] = useState();
  const [updateAlbumModal, setUpdateAlbumModal] = useState({
    isOpen: false,
    id: null,
  });
  //audio
  const [audioTitle, setAudioTitle] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updatedAudio, setUpdatedAudio] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //album
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

  const handleUpdateAlbum = (e, id) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', albumTitle);
    formData.append('imageFile', albumCover);
    formData.append('type', selectedType);
    updateAlbum(id, formData)
      .then(data => {
        setAlbum(data);
        setUpdateAlbumModal(false);
        toast.success('Album updated successfully');
      })
      .catch(error => {
        console.error('Error creating album:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateAlbumMod = useCallback(album => {
    setUpdateAlbumModal({
      isOpen: true,
      id: album.id,
    });
    setAlbumTitle(album.title);
    setSelectedType(album.type);
  }, []);

  //audio

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
    setAudioTitle(audio.title);
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
  const handleCoverChange = useCallback(e => {
    const file = e.target.files[0];
    setAlbumCover(file);
  }, []);
  if (loading) return <Loader />;

  return (
    <div>
      <ToastContainer />
      <div>
        {album && album.cover && (
          <div className="w-full h-[300px] p-[12px] flex  items-center">
            <Image
              width={300}
              height={300}
              objectFit="cover"
              src={album.cover}
              alt={album.title}
            />
            <div className="text-second ml-[20px]">
              <p className="text-[22px] font-bold flex items-center">
                {' '}
                Title{' '}
                <button
                  onClick={() => updateAlbumMod(album)}
                  className="ml-2 w-[30px] h-[30px]">
                  <img src={Update.src} className="w-[30px] h-[30px]" />
                </button>
              </p>

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
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            setAudioTitle('');
          }}>
          <FormAudio
            onSubmit={handleCreate}
            audioTitle={audioTitle}
            setAudioTitle={setAudioTitle}
            audioFile={audioFile}
            setAudioFile={setAudioFile}
          />
        </Modal>
      )}
      {openUpdateModal && (
        <Modal
          onClose={() => {
            setOpenUpdateModal(false);
            setAudioTitle('');
          }}>
          <FormAudio
            onSubmit={e => handleUpdateAudio(e, updatedAudio)}
            audioTitle={audioTitle}
            setAudioTitle={setAudioTitle}
            audioFile={audioFile}
            setAudioFile={setAudioFile}
            isUpdate
          />
        </Modal>
      )}
      {updateAlbumModal.isOpen && (
        <Modal onClose={() => setUpdateAlbumModal({isOpen: false, id: null})}>
          <FormAlbum
            onSubmit={e => handleUpdateAlbum(e, updateAlbumModal.id)}
            isUpdate
            title={albumTitle}
            setTitle={setAlbumTitle}
            types={types}
            cover={albumCover}
            handleCoverChange={handleCoverChange}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </Modal>
      )}
    </div>
  );
};

export default AlbumPage;
