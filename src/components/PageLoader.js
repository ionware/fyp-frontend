import React from 'react';
import { ClipLoader } from 'react-spinners';

export default function PageLoader() {
  return (
    <div
      className='flex justify-center items-center content-center'
      style={{ height: '100vh' }}>
      <div className='text-center'>
        <ClipLoader color='#2ecc71' size={40} />
        <p className='text-gray-400'>Please wait...</p>
      </div>
    </div>
  );
}
