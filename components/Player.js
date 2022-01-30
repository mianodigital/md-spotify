import { ReplyIcon, SwitchHorizontalIcon, VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import { FastForwardIcon, PauseIcon, PlayIcon, RewindIcon, VolumeUpIcon } from '@heroicons/react/solid';
import { debounce } from 'lodash';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';
import useSpotify from '../hooks/useSpotify';

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log('Now Playing:', data.body?.item);
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume]);

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 500),
    []
  );

  return (
    <div className='h-24 bg-gradient-to-b from-ash-300 to-ash-500 text-coal-400 border-t border-ash-200 grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
      <div className='flex items-center space-x-4'>
        <img
          className='hidden md:inline w-10 h-10'
          src={songInfo?.album?.images?.[0]?.url}
          alt=''
        />
        <div className=''>
          <h3 className='text-acid-100'>{songInfo?.name}</h3>
          <p className='text-xs'>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      <div className='flex items-center justify-evenly'>
        <SwitchHorizontalIcon className='button' />
        <RewindIcon className='button' />
        {isPlaying ? (
          <PauseIcon
            className='button w-10 h-10 active:text-lime'
            onClick={handlePlayPause}
          />
        ) : (
          <PlayIcon
            className='button w-10 h-10 active:text-lime'
            onClick={handlePlayPause}
          />
        )}
        <FastForwardIcon className='button' />
        <ReplyIcon className='button' />
      </div>
      <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
        <VolumeDownIcon
          className='button'
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          className='form-input w-14 md:w-28'
          type='range'
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          className='button'
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  );
}

export default Player;
