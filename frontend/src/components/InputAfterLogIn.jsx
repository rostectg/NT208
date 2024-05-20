import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isArchivedApi } from '../apis/isArchivedApi';
import { listSnapshotVersionsApi } from '../apis/listSnapshotVersionsApi';

InputAfterLogIn.propTypes = {

};

function InputAfterLogIn(props) {
  const [input, setInput] = useState("");
  const [listVersions, setListVersions] = useState([])

  const getInput = () => {
    const inputValue = document.querySelector("input").value;
    if (inputValue !== "") {
      setInput(inputValue);
    }
  }
  useEffect(() => {
    async function checkArchived() {
      const isArchived = await isArchivedApi.get(input);
      if (isArchived.data.status === "archived") {
        const listSnapshot = await listSnapshotVersionsApi.get(input);
        setListVersions(listSnapshot.data.snapshot_list);
      }
    }
   }, [input])
  return (
    <div>
      <h2 className='text-center text-2xl font-medium mt-20 mb-8
    md:text-4xl
    lg:pt-20 lg:text-5xl
    '
      >
        World Web
      </h2>
      <form className='rounded-full h-11 w-5/6 md:w-4/6 mx-auto py-2 border-slate-200 border-2 bg-white lg:h-16 lg:w-2/5 lg:py-4'>
        <i className="!text-black fa-solid fa-xmark p-1 ml-3 mr-2 cursor-pointer lg:p-2 lg:mx-3"></i>
        <input
          className='w-3/4 focus:outline-none md:w-5/6 lg:w-5/6'
          placeholder='https://example.com/blog/deleted.html'
        />
        <i className="!text-black fa-solid fa-arrow-right ml-3 cursor-pointer lg:p-2 lg:ml-1"
          onClick={getInput}
        ></i>
      </form>

      <h4
        className='text-center mt-5 text-lg'
      >Recently Viewed</h4>
      <div className='output'></div>
    </div>
  );
}

export default InputAfterLogIn;