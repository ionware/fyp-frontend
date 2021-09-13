import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import useAppState from '../../state/useAppState';
import { useAuth } from '../../api/auth';
import FooterSmall from './Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  const mutation = useAuth();
  const { setToken, setUser, token } = useAppState();

  if (token || isLoggedIn) return <Redirect to='/dashboard' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mutation.isLoading) return;

    if (!email || !password) {
      toast.error('Please type your email and password.');
      return;
    }

    mutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          // set user and token.
          const user = data.data;
          setUser(user);
          setToken(user.token);

          setTimeout(() => setIsLoggedIn(true), 4000);

          toast.success(
            'Authentication successful. You will be redirected to your dashboard.'
          );
        },
        onError: (error) => {
          if (error.data) {
            return toast.error(
              error.data.message || 'Something unexpected happened.'
            );
          }
          toast.error('An error occured. Please try again.');
        },
      }
    );
  };

  return (
    <>
      <main>
        <section className='absolute w-full h-full'>
          <div
            className='absolute top-0 w-full h-full bg-white'
            style={{
              backgroundImage: 'url(/images/bg-01.jpg)',
              backgroundSize: '100%',
              backgroundRepeat: 'no-repeat',
            }}></div>
          <div className='container mx-auto px-4 h-full'>
            <div className='flex content-center items-center justify-center h-full'>
              <div className='w-full lg:w-4/12 px-4'>
                <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0'>
                  <div className=' mb-0 px-6 py-6'>
                    <div className='text-center flex justify-center'>
                      <img
                        src='/images/logo.png'
                        alt='Logo'
                        className='w-24 h-24'
                      />
                    </div>
                  </div>
                  <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                    <div className='text-gray-500 text-center mb-3 font-bold'>
                      <h3 className='uppercase'>Sign into your account</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className='relative w-full mb-3'>
                        <label
                          className='block uppercase text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-password'>
                          Email
                        </label>
                        <input
                          type='email'
                          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                          placeholder='Email'
                          value={email}
                          onChange={({ target }) => setEmail(target.value)}
                          style={{ transition: 'all .15s ease' }}
                        />
                      </div>

                      <div className='relative w-full mb-3'>
                        <label
                          className='block uppercase text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-password'>
                          Password
                        </label>
                        <input
                          type='password'
                          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                          placeholder='Password'
                          value={password}
                          onChange={({ target }) => setPassword(target.value)}
                          style={{ transition: 'all .15s ease' }}
                        />
                      </div>
                      <div>
                        <label className='inline-flex items-center cursor-pointer'>
                          <input
                            id='customCheckLogin'
                            type='checkbox'
                            className='form-checkbox border-0 rounded text-green-800 ml-1 w-5 h-5'
                            style={{ transition: 'all .15s ease' }}
                          />
                          <span className='ml-2 text-sm font-semibold text-gray-600'>
                            Remember me
                          </span>
                        </label>
                      </div>

                      <div className='text-center mt-6'>
                        <button
                          className='bg-green-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full'
                          type='submit'
                          style={{ transition: 'all .15s ease' }}>
                          {mutation.isLoading ? (
                            <ClipLoader color='#fff' size={20} />
                          ) : (
                            'Sign In'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='flex flex-wrap mt-6'>
                  <div className='w-1/2'>
                    <a
                      href='#pablo'
                      onClick={(e) => e.preventDefault()}
                      className='text-gray-300'>
                      <small>Forgot password?</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
