import Link from 'next/link';
import Button from '../Button';
import Image from 'next/image';
import Update from '@/../../public/icons/update.svg';
import Delete from '@/../../public/icons/delete.svg';

const ArtistComponent = ({item, onDelete, onUpdate, showAlbum, showArtist}) => {
  return (
    <div className="flex justify-between my-[12px] bg-main rounded-[15px] p-[20px] items-center">
      <div className="flex justify-between items-center w-[90%]">
        <div className="flex items-center w-full">
          <span className="text-[#D9DDDC]">{item.id}</span>
          {item.title ? (
            <p className="text-white capitalize  ml-10 ">{item.title}</p>
          ) : (
            <Link href={`/artists/${item.id}`}>
              <p className="text-white capitalize hover:text-second ml-10 cursor-pointer">
                {item.name}
              </p>
            </Link>
          )}
        </div>
        <div className="flex items-center w-[55%]">
          {showArtist && (
            <Link href={`/artists/${item.artist.id}`} className="w-[240px]">
              <p className="text-white capitalize hover:text-second cursor-pointer ml-30px">
                {item.artist.name}
              </p>
            </Link>
          )}
          {showAlbum && (
            <Link href={`/albums/${item.album.id}`} className="w-[400px] ">
              <p className="text-white capitalize hover:text-second ml-2 cursor-pointer">
                {item.album.title}
              </p>
            </Link>
          )}
        </div>
      </div>
      <div className="flex space-x-2 ">
        <button onClick={onDelete} className="active:scale-95">
          <Image
            width={Delete.width}
            height={Delete.height}
            src={Delete.src}
            alt="dlete icon"
          />
        </button>
        <button onClick={onUpdate} className="active:scale-95">
          <Image
            width={Delete.width}
            height={Delete.height}
            src={Update.src}
            alt="update icon"
          />
        </button>
      </div>
    </div>
  );
};

export default ArtistComponent;
