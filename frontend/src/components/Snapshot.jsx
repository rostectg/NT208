import React from 'react';
import { useNavigate } from 'react-router';


function Snapshot({ name, data }) {
  const navigate = useNavigate()
  const utcDate = new Date(data.created_time);

  function convertToTimeZone(date, offset) {
    const localTime = new Date(date.getTime() + offset * 60 * 60 * 1000);
    return localTime;
  }

  const vietnamOffset = 7;
  const vietnamTime = convertToTimeZone(utcDate, vietnamOffset);

  const formattedVietnamTime = vietnamTime.toISOString().slice(0, 19).replace('T', ' ');

  const handleDirect = () => {
    return navigate(`/${data.snapshot_id}`)
  }
  return (
    <div onClick={handleDirect} className='md:w-5/6 lg:w-5/6 mx-auto my-2 h-20 bg-slate-300 text-black cursor-pointer px-3'>
      <h2 className='font-bold'>Snapshot for {name}</h2>
      <p className='font-thin italic text-sm'>Saved at: {formattedVietnamTime}</p>
    </div>
  );
}

export default Snapshot;