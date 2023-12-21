'use client';
import {useState, useEffect} from 'react';
import Image from 'next/image';
import SideBar from '../components/SideBar';
import {
  getCountArtist,
  getCountAlbums,
  getCountAudios,
  getListenCount,
} from '@/app/api';

export default function Dashboard() {
  const [album, setAlbum] = useState();
  const [artist, setArtist] = useState();
  const [audio, setAudio] = useState();
  const [listenCount, setListenCount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumsData = await getCountAlbums();
        const audioData = await getCountAudios();
        const artistsData = await getCountArtist();
        const playsNumer = await getListenCount();
        setAlbum(albumsData);
        setAudio(audioData);
        setArtist(artistsData);
        setListenCount(playsNumer);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-between ">
      <div className="w-full h-full m-[2%]">
        <div className="mb-12">
          <h1 className="text-white text-[40px] text-center">OVERVIEW</h1>
          <div className="flex items-center mt-12">
            <h2 className="text-white text-[22px] mr-8">
              Record number of playtime :
            </h2>
            <span className="text-third text-[30px]">
              {listenCount?.totalListenCount}
            </span>
          </div>
        </div>

        <div className="flex w-[100%] justify-between">
          <div className="bg-white p-6 rounded-[12px] flex flex-col items-center w-[32%]">
            <h2 className="text-main text-[22px] font-[600] pb-7">
              Total number of artists
            </h2>
            <div className="bg-main text-third text-center text-[33px] w-full h-1/2 pt-7 mt-5">
              {artist?.totalArtistCount}
            </div>
          </div>
          <div className="bg-white p-6 rounded-[12px] flex flex-col items-center w-[32%]">
            <h2 className="text-main text-[22px] font-[600] pb-7">
              Total number of songs
            </h2>
            <div className="bg-main text-third text-center text-[33px] w-full h-1/2 pt-7 mt-5">
              {audio?.totalAudioCount}
            </div>
          </div>
          <div className="bg-white p-6 rounded-[12px] flex flex-col items-center w-[32%]">
            <h2 className="text-main text-[22px] font-[600] pb-8">
              Total number of albums
            </h2>
            <div className="bg-main text-third text-center text-[33px] w-full h-1/2 pt-7 pb-[15%] mt-5">
              {album?.totalAlbumCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
