import React, { useEffect, useState } from 'react';
import { isArchivedApi } from '../apis/isArchivedApi';
import { listSnapshotVersionsApi } from '../apis/listSnapshotVersionsApi';
import Snapshot from './Snapshot';
import { doArchiveApi } from './../apis/doArchive';


function Input() {
  const isAuthenticated = true;
  const [inputValue, setInputValue] = useState("");
  // const [input, setInput] = useState("z");
  const [listVersions, setListVersions] = useState([]);
  const [isArchived, setIsArchived] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const [archiving, setArchiving] = useState(false);

  const checkIfArchived = async () => {
    try {
      const response = await isArchivedApi.get(inputValue);
      const responseData = response.data.status;
      setIsArchived(responseData === 'archived');

      // If the data is 'archived', stop the interval
      if (isArchived === true) {
        clearInterval(intervalId);
        const listSnapshot = await listSnapshotVersionsApi.get(inputValue);
        setListVersions(listSnapshot.data.snapshot_list);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to call the doArchived API
  const doArchive = async () => {
    try {
      await doArchiveApi.get(inputValue);
    } catch (error) {
      console.error('Error archiving:', error);
    }
  };

  // Handle button click
  const handleButtonClick = async () => {
    setArchiving(true);
    if (inputValue === "") setArchiving(false);
    await checkIfArchived();

    if (isArchived === false) {
      doArchive()
    }

    // Set up the interval to call checkIfArchived every 5 seconds
    const id = setInterval(checkIfArchived, 1000);
    setIntervalId(id);
    setIsArchived(false);
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);

  };
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
          className='input !text-black w-3/4 focus:outline-none md:w-5/6 lg:w-5/6'
          placeholder='https://example.com/blog/deleted.html'
          onChange={handleInputChange}
        />
        <i className="!text-black fa-solid fa-arrow-right ml-3 cursor-pointer lg:p-2 lg:ml-1"
          onClick={handleButtonClick}
        ></i>
      </form>

      {isAuthenticated === true ? (archiving === true ?
        (listVersions.length === 0 ?
          (isArchived === false ?
            (<h4 className='text-center my-5 text-lg'>Website is not archived yet. Archiving...</h4>) :
            (<h4 className='text-center my-5 text-lg'>There are no versions of your website snapshot</h4>))
          :
          (<h4 className='text-center my-5 text-lg'>Snapshot Versions</h4>))
        :
        (<div></div>)
      )
        :
        (<div className='mt-4 text-center font-extralight text-sm'>Guest users are allowed 3 searches per day</div>)
      }

      <div className='output w-5/6 mx-auto'>
        {listVersions.map((item, index) => (<Snapshot name={inputValue} data={item} />))}
      </div>
    </div>
  );
}

export default Input;