import Image from 'next/image';
import SideBar from '../components/SideBar';
import {getArtists, getAlbums, getSounds} from '@/app/api';

export default async function Dashboard() {
  const albumsData = await getAlbums();
  const albums = albumsData.length;
  const artistsData = await getArtists();
  const artists = artistsData.length;
  return (
    <div className="flex justify-between">
      <div>
        <SideBar />
      </div>
      <div className="w-[80%] m-[2%]">
        <h1 className="text-main font-[600] text-[30px] mb-[15%]">OVERVIEW</h1>
        <div className="flex w-[100%] justify-between">
          <div className="bg-white p-6 rounded-[12px] flex flex-col items-center w-[32%]">
            <h2 className="text-main text-[22px] font-[600] pb-7">
              Total number of plays
            </h2>
            <div className="bg-main text-second text-center text-[33px] w-full h-1/2 pt-7 mt-5"></div>
          </div>
          <div className="bg-white p-6 rounded-[12px] flex flex-col items-center w-[32%]">
            <h2 className="text-main text-[22px] font-[600] pb-7">
              Total number of artists
            </h2>
            <div className="bg-main text-second text-center text-[33px] w-full h-1/2 pt-7 mt-5">
              {artists}
            </div>
          </div>
          <div className="bg-white p-6 rounded-[12px] flex flex-col items-center w-[32%]">
            <h2 className="text-main text-[22px] font-[600] pb-8">
              Total number of albums
            </h2>
            <div className="bg-main text-second text-center text-[33px] w-full h-1/2 pt-7 pb-[15%] mt-5">
              {albums}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
