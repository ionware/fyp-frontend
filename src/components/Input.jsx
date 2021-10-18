import React from 'react';
import PropTypes from 'prop-types';

export default function Input({ type, label, value, onChange, placeholder }) {
  return (
    <div className='my-2'>
      <label className='font-semibold mb-1 block text-sm'>{label}</label>
      <input
        type={type}
        value={value}
        className='py-1 px-3 w-full text-sm border-gray-300 active:outline-none outline-none rounded'
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

Input.defaultProps = {
  type: 'text',
};
