import React, { useState } from 'react';

function UrlItem({ data }) {
  const [bookmarked, setBookmarked] = useState(false)
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

      {bookmarked ?
        <img className='h-6 mt-3 mr-3' onClick={() => setBookmarked(false)} src='bookmarked.png' alt='' />
        : <img className='h-6 mt-3 mr-3' onClick={() => setBookmarked(true)} src='not-bookmark.png' alt='' />}
    </div>
  );
}

export default UrlItem;