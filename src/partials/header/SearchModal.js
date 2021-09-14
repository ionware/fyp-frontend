import React, { useState, useRef, useEffect } from 'react';
import Transition from '../../utils/Transition.js';
import { useGetSearch } from '../../api/resource';

function SearchModal() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const search = useGetSearch(query);

  const trigger = useRef(null);
  const searchContent = useRef(null);
  const searchInput = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !searchOpen ||
        searchContent.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSearchOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!searchOpen || keyCode !== 27) return;
      setSearchOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div>
      {/* Button */}
      <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-150 rounded-full ml-3 ${
          searchOpen && 'bg-gray-200'
        }`}
        onClick={() => {
          setSearchOpen(!searchOpen);
          setImmediate(() => searchInput.current.focus());
        }}
        aria-controls='search-modal'>
        <span className='sr-only'>Search</span>
        <svg
          className='w-4 h-4'
          viewBox='0 0 16 16'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            className='fill-current text-gray-500'
            d='M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z'
          />
          <path
            className='fill-current text-gray-400'
            d='M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z'
          />
        </svg>
      </button>
      {/* Modal backdrop */}
      <Transition
        className='fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity'
        show={searchOpen}
        enter='transition ease-out duration-200'
        enterStart='opacity-0'
        enterEnd='opacity-100'
        leave='transition ease-out duration-100'
        leaveStart='opacity-100'
        leaveEnd='opacity-0'
        aria-hidden='true'
      />
      {/* Modal dialog */}
      <Transition
        id='search-modal'
        className='fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6'
        role='dialog'
        aria-modal='true'
        show={searchOpen}
        enter='transition ease-in-out duration-200'
        enterStart='opacity-0 translate-y-4'
        enterEnd='opacity-100 translate-y-0'
        leave='transition ease-in-out duration-200'
        leaveStart='opacity-100 translate-y-0'
        leaveEnd='opacity-0 translate-y-4'>
        <div
          className='bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg'
          ref={searchContent}>
          {/* Search form */}
          <form className='border-b border-gray-200'>
            <div className='relative'>
              <label htmlFor='modal-search' className='sr-only'>
                Search
              </label>
              <input
                id='modal-search'
                className='w-full border-0 focus:ring-transparent placeholder-gray-400 appearance-none py-3 pl-10 pr-4'
                type='search'
                placeholder='Search Anything…'
                onChange={({ target }) => setQuery(target.value)}
                autoComplete='off'
                ref={searchInput}
              />
              <button
                className='absolute inset-0 right-auto group'
                type='submit'
                aria-label='Search'>
                <svg
                  className='w-4 h-4 flex-shrink-0 fill-current text-gray-400 group-hover:text-gray-500 ml-4 mr-2'
                  viewBox='0 0 16 16'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path d='M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z' />
                  <path d='M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z' />
                </svg>
              </button>
            </div>
          </form>
          <div
            className='py-4 px-2'
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}>
            {/* Recent searches */}
            {search.data ? (
              <div className='mb-3 last:mb-0'>
                <div className='text-xs font-semibold text-gray-400 uppercase px-2 mb-2'>
                  Matches
                </div>
                <ul className='text-sm'>
                  {search.data.data.map(
                    (
                      {
                        id,
                        firstName,
                        lastName,
                        surname,
                        matric_number,
                        gender,
                        email,
                        phone,
                      },
                      index
                    ) => {
                      return index < 16 ? (
                        <li key={id}>
                          <div className='flex items-center p-2 text-gray-800 hover:text-white hover:bg-indigo-500 rounded group'>
                            <img
                              src='/images/human.png'
                              height={30}
                              width={30}
                              className='mr-3'
                              alt='user'
                            />
                            <span>
                              {`${surname} ${firstName} ${lastName} (${gender})`}{' '}
                              -{' '}
                              <span className='font-semibold'>
                                {matric_number}
                              </span>{' '}
                              ({email})
                            </span>
                          </div>
                        </li>
                      ) : null;
                    }
                  )}
                </ul>
              </div>
            ) : null}

            {search.error ? (
              <div className='mb-3 last:mb-0'>
                <div className='text-base text-gray-400 px-2 mb-2'>
                  There is no student that matches your search
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default SearchModal;
