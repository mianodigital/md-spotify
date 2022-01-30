import React from 'react';
import { useRecoilState } from 'recoil';

import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../lib/time';

function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id),
      setIsPlaying(true),
      spotifyApi.play({
        uris: [track.track.uri],
      });
  };
  return (
    <div
      className='grid grid-cols-2 bg-ash-400 text-coal-400 py-4 px-5 hover:bg-ash-300 rounded-lg cursor-pointer'
      onClick={playSong}
    >
      <div className='flex item-center space-x-4'>
        <p>{order + 1}</p>
        <img
          className='h-12 w-12'
          src={track.track.album.images[0].url}
          alt=''
        />
        <div className=''>
          <p className='text-acid-100 w-36 lg:w-64 truncate'>
            {track.track.name}
          </p>
          <p className='w-40 text-sm'>{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className='flex item-center justify-between ml-auto md:ml-0'>
        <p className='w-40 hidden md:inline truncate text-sm'>
          {track.track.album.name}
        </p>
        <p className='text-sm'>
          {millisToMinutesAndSeconds(track.track.duration_ms)}
        </p>
      </div>
    </div>
  );
}

export default Song;
