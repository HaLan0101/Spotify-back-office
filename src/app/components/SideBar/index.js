import Link from 'next/link';
import Artist from '../../../../public/icons/user-pen-solid.svg';
import Album from '../../../../public/icons/file-audio-regular.svg';
import Audio from '../../../../public/icons/circle-play-solid.svg';
import Spotify from '../../../../public/icons/spotify.svg';
import SearchBar from '../SearchBar';
import Image from 'next/image';

function index() {
  return (
    <div className="bg-black text-white h-screen w-1/6 fixed left-0 top-0 p-4">
      <div>
        <div className="flex justify-center items-center mb-[52px] mt-[30px]">
          <Image src={Spotify.src} width={50} height={50} />
          <span className="mf-[15px] text-[25px] font-[600] ml-5 text-[#1DB954]">
            Spotify
          </span>
        </div>
        <div>
          <SearchBar />
          <div className="group bg-main rounded-md mb-10 mt-4 p-2">
            <Link href={'/'}>
              <h3 className="cursor-pointer  text-[25px] font-[600] text-center text-[#F0F8FF]">
                Dashboard
              </h3>
            </Link>
          </div>

          <Link
            href={'/albums'}
            className="flex justify-center items-center pb-6 group ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              height="28"
              width="28"
              viewBox="0 0 384 512"
              className=" group-hover:fill-third">
              <path d="M64 464H320c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM192 272V400c0 6.5-3.9 12.3-9.9 14.8s-12.9 1.1-17.4-3.5L129.4 376H112c-8.8 0-16-7.2-16-16V312c0-8.8 7.2-16 16-16h17.4l35.3-35.3c4.6-4.6 11.5-5.9 17.4-3.5s9.9 8.3 9.9 14.8zm85.8-4c11.6 20 18.2 43.3 18.2 68s-6.6 48-18.2 68c-6.6 11.5-21.3 15.4-32.8 8.8s-15.4-21.3-8.8-32.8c7.5-12.9 11.8-27.9 11.8-44s-4.3-31.1-11.8-44c-6.6-11.5-2.7-26.2 8.8-32.8s26.2-2.7 32.8 8.8z" />
            </svg>
            <h3 className="cursor-pointer ml-5 text-[22px] group-hover:font-[600] group-hover:text-[23px] text-[#F0F8FF]">
              Albums
            </h3>
          </Link>
          <Link
            href={'/artists'}
            className="flex justify-center pb-6 group items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="28"
              width="28"
              fill="white"
              viewBox="0 0 640 512"
              className=" group-hover:fill-third">
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z" />
            </svg>
            <h3 className="cursor-pointer ml-7 text-[22px] group-hover:font-[600] group-hover:text-[23px] text-[#F0F8FF]">
              Artists
            </h3>
          </Link>
          <Link
            href={'/audios'}
            className="flex justify-center pb-6 group items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="28"
              width="28"
              fill="white"
              viewBox="0 0 512 512"
              className=" group-hover:fill-third">
              <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
            </svg>
            <h3 className="cursor-pointer ml-7 text-[21px] group-hover:font-[600] group-hover:text-[22px] text-[#F0F8FF]">
              Songs
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default index;
