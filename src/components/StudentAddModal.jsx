import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import Input from './Input';
import {
  useGetDepartments,
  useGetSession,
  usePostStudent,
} from '../api/resource';

export default function StudentAddModal({ isOpen, onClose, callback }) {
  const cancelButtonRef = useRef(null);
  const [surname, setSurname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState(null);
  const [matricNo, setMatricNo] = useState('');
  const [department, setDepartment] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const genderOptions = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
  ];

  const departments = useGetDepartments();
  const sessions = useGetSession();
  const createStudent = usePostStudent();

  const handleSubmit = () => {
    if (isLoading) return;

    const data = {
      surname,
      firstName,
      lastName,
      email,
      gender: gender.value,
      phone,
      matricNo,
      department_id: department.value,
      session_id: session.value,
    };

    setIsLoading(true);

    createStudent.mutate(data, {
      onSuccess: (response) => {
        setIsLoading(false);
        if (callback) callback(response);
        toast.success('Student was added successfully.');
        onClose();
      },
      onError: (error) => {
        toast.error(
          'An error occured. Please try again or contact administrator'
        );
        setIsLoading(false);
      },
    });
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={onClose}>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div>
                  <div></div>
                  <div>
                    <Input
                      label='Surname'
                      value={surname}
                      onChange={({ target }) => setSurname(target.value)}
                      placeholder='Surname'
                    />
                    <Input
                      label='First name'
                      value={firstName}
                      onChange={({ target }) => setFirstName(target.value)}
                      placeholder='First name'
                    />
                  </div>
                  <div>
                    <Input
                      label='Last name'
                      value={lastName}
                      onChange={({ target }) => setLastName(target.value)}
                      placeholder='Last name'
                    />
                  </div>
                  <div>
                    <Input
                      label='Matriculation Number'
                      value={matricNo}
                      onChange={({ target }) => setMatricNo(target.value)}
                      placeholder='19/47CS/029'
                    />
                  </div>
                  {departments.data ? (
                    <div className='my-2'>
                      <label className='font-semibold mb-1 block text-sm'>
                        Select Department
                      </label>
                      <Select
                        value={department}
                        onChange={setDepartment}
                        options={
                          departments.data.data.map(({ id, name }) => ({
                            label: name,
                            value: id,
                          })) || {}
                        }
                      />
                    </div>
                  ) : null}

                  {sessions.data ? (
                    <div className='my-2'>
                      <label className='font-semibold mb-1 block text-sm'>
                        Select Academic Session
                      </label>
                      <Select
                        value={session}
                        onChange={setSession}
                        options={
                          sessions.data.data.map(({ id, year }) => ({
                            label: year,
                            value: id,
                          })) || {}
                        }
                      />
                    </div>
                  ) : null}
                  <div className='my-2'>
                    <label className='font-semibold mb-1 block text-sm'>
                      Gender
                    </label>
                    <Select
                      value={gender}
                      onChange={setGender}
                      options={genderOptions}
                    />
                  </div>
                  <div>
                    <Input
                      type='tel'
                      label='Phone number'
                      value={phone}
                      onChange={({ target }) => setPhone(target.value)}
                      placeholder='Mobile number'
                    />
                  </div>
                  <div>
                    <Input
                      type='email'
                      label='Email address'
                      value={email}
                      onChange={({ target }) => setEmail(target.value)}
                      placeholder='Email'
                    />
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button
                  type='button'
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={isLoading ? () => {} : handleSubmit}>
                  {isLoading ? 'Loading...' : 'Add Student'}
                </button>
                <button
                  type='button'
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={onClose}
                  ref={cancelButtonRef}>
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
