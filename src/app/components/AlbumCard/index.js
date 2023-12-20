import Delete from '@/../../public/icons/delete.svg';
import Update from '@/../../public/icons/update.svg';
import Link from 'next/link';
const AlbumCard = ({album, onDelete, onUpdate}) => {
  return (
    <div className="rounded-[7px] shadow-md bg-main w-[200px] h-[250px] relative mb-7">
      <Link href={`/albums/${album.id}`}>
        <div className="w-full h-[73%] p-3 overflow-hidden">
          <img
            src={album.cover}
            alt={album.title}
            className="object-cover w-full h-full rounded-[7px] transition-transform transform hover:scale-105"
          />
        </div>
      </Link>
      <div className="text-left px-3 ">
        <div className="pr-3">
          <p className="text-white text-[14px] font-medium capitalize pb-1 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">
            {album.title}
          </p>
          <p className="text-[#787A7A] text-[14px] font-semibold">
            {album.type} · Genre
          </p>
        </div>

        <div className="absolute bottom-1 right-2 flex  items-center ">
          {onUpdate ? (
            <button
              className="w-[20px] mr-2 active:scale-75"
              onClick={onUpdate}>
              <img src={Update.src} />
            </button>
          ) : null}
          <button className="w-[15px] active:scale-75" onClick={onDelete}>
            <img src={Delete.src} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
