import React from 'react';

function UrlItem({ data }) {
  const utcDate = new Date(data.timestamp);

  function convertToTimeZone(date, offset) {
    const localTime = new Date(date.getTime() + offset * 60 * 60 * 1000);
    return localTime;
  }

  const vietnamOffset = 7;
  const vietnamTime = convertToTimeZone(utcDate, vietnamOffset);

  const formattedVietnamTime = vietnamTime.toISOString().slice(0, 19).replace('T', ' ');

  return (
    <div className='flex justify-between md:w-5/6 lg:w-5/6 mx-auto my-2 h-20 bg-slate-300 text-black cursor-pointer px-3'>
      <div>
        <h2 className='font-bold'>{data.url}</h2>
        <p className='font-thin italic text-sm'>Saved at: {formattedVietnamTime}</p>
      </div>
    </div>
  );
}

export default UrlItem;