import { LibraryIcon, SearchIcon } from '@heroicons/react/outline';
import { CogIcon, HeartIcon, HomeIcon, PlusCircleIcon, RssIcon } from '@heroicons/react/solid';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import useSpotify from '../hooks/useSpotify';

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  console.log(playlists);
  return (
    <div className='text-coal-300 p-5 text-sm border-r border-ash-300 overflow-y-scroll h-screen scrollbar-hide'>
      <div className='space-y-4'>
        <button className='flex items-center space-x-2 hover:text-acid-100'>
          <CogIcon className='h-5 w-5' onClick={() => signOut()} />
          <p>Log out</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-acid-100'>
          <HomeIcon className='h-5 w-5' />
          <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-acid-100'>
          <SearchIcon className='h-5 w-5' />
          <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-acid-100'>
          <LibraryIcon className='h-5 w-5' />
          <p>Library</p>
        </button>
        <hr className='border-t-[0.1px] border-ash-200' />
        <button className='flex items-center space-x-2 hover:text-acid-100'>
          <PlusCircleIcon className='h-5 w-5 ' />
          <p>Create Playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-acid-100'>
          <HeartIcon className='h-5 w-5 fill-lime' />
          <p>Favorites</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-acid-100'>
          <RssIcon className='h-5 w-5' />
          <p>Episodes</p>
        </button>
        <hr className='border-t-[0.1px] border-ash-200' />

        {playlists.map((playlist) => (
          <p key={playlist.id} className='cursor-pointer hover:text-acid-100'>
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
