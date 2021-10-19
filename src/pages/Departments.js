import React from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import { useGetFacultyById, useGetKeys } from '../api/resource';

export default function Departments() {
  const keys = useGetKeys();
  const { id } = useParams();

  const faculty = useGetFacultyById(id);

  return (
    <Layout>
      <div>
        <PageTitle>
          {faculty.data ? faculty.data.data.name : 'Departments'}
        </PageTitle>

        <div className='mt-6 p-6 bg-white'>
          {!faculty.data ? (
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
                            Number of Students
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        {Array.isArray(faculty.data.data.departments)
                          ? faculty.data.data.departments.map((department) => (
                              <TableRow key={department.id} data={department} />
                            ))
                          : null}
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
  const { name, students } = data;
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
        <div className='text-sm text-gray-900'>{students || 0}</div>
      </td>
    </tr>
  );
}
