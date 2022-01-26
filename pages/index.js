import Head from 'next/head';

import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div className='bg-ash-500 h-screen overflow-hidden'>
      <Head>
        <title>MD Spotify</title>
      </Head>
      <main>
        <Sidebar />
      </main>
    </div>
  );
}
