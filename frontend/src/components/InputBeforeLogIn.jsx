import React from 'react';
import PropTypes from 'prop-types';

InputBeforeLogIn.propTypes = {

};

function InputBeforeLogIn(props) {
  return (
    <div>
      <h2
        className='text-center text-2xl font-medium mt-20 mb-8
        md:text-4xl
        lg:pt-20 lg:text-5xl
        '
      >
        World Web
      </h2>
      <form className='rounded-full h-11 w-5/6 md:w-4/6 mx-auto py-2 border-slate-200 border-2 bg-white lg:h-16 lg:w-2/5 lg:py-4'>
        <i className="!text-black fa-solid fa-xmark p-1 ml-3 mr-2 cursor-pointer lg:p-2 lg:mx-3"></i>
        <input
          className='input w-3/4 focus:outline-none md:w-5/6 lg:w-5/6'
          placeholder='https://example.com/blog/deleted.html'
        />
        <i className="search !text-black fa-solid fa-arrow-right ml-3 cursor-pointer lg:p-2 lg:ml-1"></i>
      </form>
      <div className='mt-4 text-center font-extralight text-sm'>Guest users are allowed 3 searches per day</div>
      <div className='output'></div>
    </div>
  );
}

export default InputBeforeLogIn;