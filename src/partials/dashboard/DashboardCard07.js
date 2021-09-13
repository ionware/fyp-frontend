import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useGetStudent } from '../../api/resource';

function Row({ data }) {
  const {
    surname,
    firstName,
    lastName,
    session,
    email,
    gender,
    matric_number,
  } = data;
  return (
    <tr>
      <td className='p-2'>
        <div className='flex items-center'>
          <div className='text-gray-800'>{`${firstName} ${lastName} ${surname}`}</div>
        </div>
      </td>
      <td className='p-2'>
        <div className=''>{matric_number}</div>
      </td>
      <td className='p-2'>
        <div className=' text-green-500'>{session}</div>
      </td>
      <td className='p-2'>
        <div className=''>{email}</div>
      </td>
      <td className='p-2'>
        <div className=' text-light-blue-500'>
          {String(gender).toUpperCase() === 'M' ? 'Male' : 'Female'}
        </div>
      </td>
    </tr>
  );
}
function DashboardCard07() {
  const students = useGetStudent();

  return (
    <>
      <div className='col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200'>
        <header className='px-5 py-4 border-b border-gray-100'>
          <h2 className='font-semibold text-gray-800'>
            Recently added students
          </h2>
        </header>
        <div className='p-3'>
          {/* Table */}
          <div className='overflow-x-auto'>
            {students.isLoading ? (
              <div className='w-full'>
                <Skeleton height={30} width='100%' count={6} />
              </div>
            ) : null}
            {!students.data ? null : (
              <table className='table-auto w-full'>
                {/* Table header */}
                <thead className='text-xs uppercase text-gray-400 bg-gray-50 rounded-sm'>
                  <tr>
                    <th className='p-2'>
                      <div className='font-semibold text-left'>Name</div>
                    </th>
                    <th className='p-2'>
                      <div className='font-semibold'>Matric Number</div>
                    </th>
                    <th className='p-2'>
                      <div className='font-semibold'>Session</div>
                    </th>
                    <th className='p-2'>
                      <div className='font-semibold'>Email</div>
                    </th>
                    <th className='p-2'>
                      <div className='font-semibold'>Gender</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className='text-sm font-medium divide-y divide-gray-100'>
                  {/* Row */}
                  {students.data.data.map((student, index) => {
                    return index < 6 ? (
                      <Row data={student} key={student.email} />
                    ) : null;
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardCard07;
