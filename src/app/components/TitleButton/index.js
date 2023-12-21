import Add from '@/../../public/icons/add.svg';
import Image from 'next/image';

export default function index({onClick, title}) {
  return (
    <div className="p-[20px] mt-2">
      <h2 className="text-3xl font-bold text-white mb-4 capitalize">{title}</h2>
      <button className="text-white  flex items-center" onClick={onClick}>
        <Image
          width={Add.width}
          height={Add.height}
          src={Add.src}
          alt="all icon"
        />
        <p className="pl-2 text-[14px]">Add {title}</p>
      </button>
    </div>
  );
}
