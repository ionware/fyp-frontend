import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import { useGetKeys } from '../api/resource';

export default function Session() {
  const keys = useGetKeys();

  return (
    <Layout>
      <div>
        <PageTitle>Manage API Keys</PageTitle>

        <div className='mt-6 p-6 bg-white'>
          {!keys.data ? (
            <Skeleton count={10} height={35} />
          ) : (
            <div className='flex flex-col'>
              <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                  <div className='shadow overflow-hidden border-b border-gray-200'>
                    <table className='min-w-full divide-y divide-gray-200'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Name
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Keys (Public / Secret)
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Access status
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Signned By
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        {keys.data.data.map((student) => (
                          <TableRow key={student.id} data={student} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function TableRow({ data }) {
  const { name, public_key, private_key, active, user } = data;
  return (
    <tr>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
          <div className='ml-4'>
            <div className='text-sm font-medium text-gray-900'>{name}</div>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{public_key}</div>
        <div className='px-2 inline-flex text-xs leading-5 font-semibold'>
          {private_key}
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
          {active ? 'Active' : 'Revoked'}
        </span>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
        <span className='px-2 inline-flex text-xs leading-5 font-semibold'>
          {`${user.title} ${user.firstName}`}
        </span>
      </td>
    </tr>
  );
}
