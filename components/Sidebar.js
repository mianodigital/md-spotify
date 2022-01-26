import { LibraryIcon, SearchIcon } from '@heroicons/react/outline';
import { CogIcon, HeartIcon, HomeIcon, PlusCircleIcon, RssIcon } from '@heroicons/react/solid';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

function Sidebar() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div className='text-coal-500 p-5 text-sm border-r border-ash-300'>
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
        <p className='cursor-pointer hover:text-acid-100'>Playlists</p>
      </div>
    </div>
  );
}

export default Sidebar;