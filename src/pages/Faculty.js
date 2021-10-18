import React from 'react';
import Skeleton from 'react-loading-skeleton';
import PageTitle from '../components/PageTitle';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

import { useGetFaculties } from '../api/resource';

export default function Faculty() {
  const faculties = useGetFaculties();

  return (
    <Layout>
      <div>
        <PageTitle>Faculty</PageTitle>

        <div className='mt-5 flex flex-wrap'>
          {!faculties.data
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

          {faculties.data
            ? faculties.data.data.map(({ id, name }) => (
                <Folder key={id} name={name} id={id} />
              ))
            : null}
        </div>
      </div>
    </Layout>
  );
}

function Folder({ id, name }) {
  return (
    <div className='bg-white px-3 py-6 flex flex-col text-center justify-center items-center rounded-md w-52 mr-4 mt-4'>
      <Link to={`/faculties/${id}`}>
        <img src='/images/folder.png' alt='Folder' />
      </Link>
      <div className='mt-4'>
        <Link
          to={`/faculties/${id}`}
          className='hover:text-green-700 text-gray-400'>
          {name}
        </Link>
      </div>
    </div>
  );
}
