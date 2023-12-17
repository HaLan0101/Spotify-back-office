import Delete from '@/../../public/icons/delete.svg';
import Update from '@/../../public/icons/update.svg';
import Link from 'next/link';
const AlbumCard = ({album, onDelete, onUpdate}) => {
  return (
    <div className="rounded-[7px] shadow-md bg-main w-[200px] h-[250px]">
      <Link href={`/albums/${album.id}`}>
        <div className="w-full h-[73%] p-3 overflow-hidden">
          <img
            src={album.cover}
            alt={album.title}
            className="object-cover w-full h-full rounded-[7px] transition-transform transform hover:scale-105"
          />
        </div>
      </Link>
      <div className="text-left px-3 relative">
        <p className="text-white font-medium capitalize pb-1">{album.title}</p>
        <p className="text-[#787A7A] text-[14px] font-semibold">· Album</p>
        <div className="absolute bottom-1 right-2 flex flex-col">
          {onUpdate ? (
            <button className="w-[15px] pb-2" onClick={onUpdate}>
              <img src={Update.src} />
            </button>
          ) : null}
          <button className="w-[15px]" onClick={onDelete}>
            <img src={Delete.src} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
