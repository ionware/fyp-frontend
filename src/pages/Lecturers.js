import React from 'react';
import Skeleton from 'react-loading-skeleton';
import PageTitle from '../components/PageTitle';
import Layout from '../components/Layout';
import { useGetUsers } from '../api/resource';

export default function Lecturers() {
  const users = useGetUsers();

  return (
    <Layout>
      <div>
        <PageTitle>Department Lecturers</PageTitle>

        <div className='mt-6 p-6 bg-white'>
          {!users.data ? (
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
                            Email Address
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Phone Number
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Admin Right?
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        {users.data.data.map((student) => (
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
  const { title, firstName, lastName, email, phone, role } = data;
  return (
    <tr>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
          <div className='flex-shrink-0 h-10 w-10'>
            <img
              className='h-10 w-10 rounded-full'
              src='/images/human.png'
              alt=''
            />
          </div>
          <div className='ml-4'>
            <div className='text-sm font-medium text-gray-900'>{`${title} ${firstName} ${lastName}`}</div>
            <div className='text-sm text-gray-500'>{email}</div>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{email}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
        <span className='px-2 inline-flex text-xs leading-5 font-semibold'>
          {phone}
        </span>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            role > 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
          {role > 1 ? 'Yes' : 'No'}
        </span>
      </td>
    </tr>
  );
}
