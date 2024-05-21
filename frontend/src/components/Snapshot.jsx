import React from 'react';


function Snapshot({ name, data }) {
  const utcDate = new Date(data.created_time);
  
  function convertToTimeZone(date, offset) {
    const localTime = new Date(date.getTime() + offset * 60 * 60 * 1000);
    return localTime;
  }

  const vietnamOffset = 7;
  const vietnamTime = convertToTimeZone(utcDate, vietnamOffset);

  const formattedVietnamTime = vietnamTime.toISOString().slice(0, 19).replace('T', ' ');
  return (
    <div href={`/${data.snapshot_id}`} className='md:w-5/6 lg:w-5/6 mx-auto my-2 h-20 bg-slate-200 text-black cursor-pointer px-3'>
      <a href={`/${data.snapshot_id}`}>
        <h2 className='font-bold'>Snapshot for {name}</h2>
        <p className='font-thin italic text-sm'>Saved at: {formattedVietnamTime}</p>
      </a>
    </div>
  );
}

export default Snapshot;