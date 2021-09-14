import React from 'react';
import Skeleton from 'react-loading-skeleton';
import PageTitle from '../components/PageTitle';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

import { useGetSession } from '../api/resource';

export default function Session() {
  const sessions = useGetSession();

  return (
    <Layout>
      <div>
        <PageTitle>Academic Year</PageTitle>

        <div className='mt-5 flex flex-wrap'>
          {!sessions.data
            ? 'abcdefg'.split('').map((char) => (
                <div key={char}>
                  <Skeleton
                    height={150}
                    width={150}
                    className='bg-gray-900 mr-4 mt-4'
                  />
                </div>
              ))
            : null}

          {sessions.data
            ? sessions.data.data.map(({ id, year }) => (
                <Folder key={id} year={year} id={id} />
              ))
            : null}
        </div>
      </div>
    </Layout>
  );
}

function Folder({ id, year }) {
  return (
    <div className='bg-white px-3 py-6 flex flex-col justify-center items-center rounded-md w-40 mr-4 mt-4'>
      <Link to={`/students?session=${id}`}>
        <img src='/images/folder.png' alt='Folder' />
      </Link>
      <div className='mt-4'>
        <Link
          to={`/students?session=${id}`}
          className='hover:text-green-700 text-gray-400'>
          {year}
        </Link>
      </div>
    </div>
  );
}
