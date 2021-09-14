import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useLocation, useHistory } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import { useGetSession, useGetStudent } from '../api/resource';

export default function Students() {
  const [selectedSession, setSelectedSession] = useState('');

  const params = new URLSearchParams(useLocation().search);
  const sessions = useGetSession(params.get('session'));
  const students = useGetStudent(params.get('session'));
  const history = useHistory();

  useEffect(() => {
    if (selectedSession && selectedSession.value)
      history.push(`/students?session=${selectedSession.value}`);
  }, [selectedSession]);

  return (
    <Layout>
      <div>
        <PageTitle>Manage Students</PageTitle>

        <div className='mt-6 p-6 bg-white'>
          <div className='flex w-full justify-end mb-5'>
            <div className='w-3/12'>
              {sessions.isLoading ? (
                <Skeleton height={25} />
              ) : (
                <Select
                  placeholder='Select a session'
                  value={selectedSession}
                  onChange={setSelectedSession}
                  options={sessions.data.data.map((session) => ({
                    label: session.year,
                    value: session.id,
                  }))}
                />
              )}
            </div>
          </div>
          {/** students table. */}

          {!students.data ? (
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
                            Student
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Email address
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Phone Number
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Gender
                          </th>
                          <th scope='col' className='relative px-6 py-3'>
                            <span className='sr-only'>Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        {students.data.data.map((student) => (
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
  const {
    surname,
    firstName,
    lastName,
    session,
    email,
    gender,
    phone,
    matric_number,
  } = data;

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
            <div className='text-sm font-medium text-gray-900'>{`${firstName} ${lastName} ${surname}`}</div>
            <div className='text-sm text-gray-500'>{matric_number}</div>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{email}</div>
        <div className='text-sm text-gray-500'>{session}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <span className='px-2 inline-flex text-xs leading-5 font-semibold'>
          {phone}
        </span>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        {String(gender).toUpperCase() === 'M' ? 'Male' : 'Female'}
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
        <a
          href='#//endregion'
          className='text-indigo-600 hover:text-indigo-900'>
          Edit
        </a>
      </td>
    </tr>
  );
}
