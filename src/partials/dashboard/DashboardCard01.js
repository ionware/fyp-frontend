import React from 'react';
import Icon from '../../images/icon-01.svg';

function DashboardCard01({ amount = 0 }) {
  return (
    <div className='flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200'>
      <div className='px-5 pt-5'>
        <header className='flex justify-between items-start mb-2'>
          <img src={Icon} width='32' height='32' alt='Icon 01' />
        </header>
        <h2 className='text-lg font-semibold text-gray-800 mb-2'>Students</h2>
        <div className='text-xs font-semibold text-gray-400 uppercase mb-1'>
          Number of all students
        </div>
        <div className='flex items-start pb-5'>
          <div className='text-3xl font-bold text-gray-800 mr-2'>{amount}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard01;
