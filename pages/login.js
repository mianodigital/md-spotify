import { getProviders, signIn } from 'next-auth/react';
import React from 'react';

import SpotifyIcon from '../assets/icons/spotify.svg';

function Login({ providers }) {
  return (
    <div className='bg-ash-500 flex flex-col items-center min-h-screen w-full justify-center'>
      <SpotifyIcon className='fill-lime w-52 mb-5' />

      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            className='bg-lime text-ash-400 p-5 rounded-full'
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
