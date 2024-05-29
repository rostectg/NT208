import { Modal, Spin, message, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { snapshotAction } from '../redux/action';
import UrlItem from './UrlItem';
import { recentViewedApi } from '../apis/bookmark';

function RecentViewed() {
  const [inputValue, setInputValue] = useState("");
  const [intervalId, setIntervalId] = useState(null);
  const [openModal, setOpenModal] = useState(false)

  const dispatch = useDispatch()
  const archived = useSelector((state) => state.snapshot.isArchived)
  // const listRecentViewed = useSelector((state) => state.bookmark.recentViewedURLs)
  const statusProgress = useSelector((state) => state.snapshot.status)

  useEffect(() => {
    async function test() {
      const res = await recentViewedApi.post()
      console.log("recent: ", res);
    }
  }, [])

  const checkIfArchived = async () => {
    dispatch(snapshotAction.checkArchive(inputValue))
    if (archived === true) {
      clearInterval(intervalId)
      dispatch(snapshotAction.getListSnapshots(inputValue))
    }
  };

  const handleButton = () => {
    if (inputValue === "") {
      notification.error({ message: "Please input URL", duration: 3 })
    } else {
      dispatch(snapshotAction.checkArchive(inputValue))
      if (archived === true) {
        dispatch(snapshotAction.getListSnapshots(inputValue))
      } else {
        notification.info({ message: "This url is not archived", duration: 3 })
        setOpenModal(true)
      }
    }
  }

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClearInput = () => {
    setInputValue("")
  }

  const handleCancel = () => {
    setOpenModal(false)
  }

  const handleArchive = async () => {
    dispatch(snapshotAction.doArchive(inputValue))
    setOpenModal(false)
    message.loading("Archiving snapshot or your URL...")
    const id = setInterval(checkIfArchived, 1000)
    setIntervalId(id)
  }

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
        <i className="!text-black fa-solid fa-xmark p-1 ml-3 mr-2 cursor-pointer lg:p-2 lg:mx-3"
          onClick={handleClearInput}></i>
        <input
          className='input !text-black w-3/4 focus:outline-none md:w-5/6 lg:w-5/6'
          placeholder='https://www.example.com'
          onChange={handleInputChange}
          value={inputValue}
        />

        {statusProgress === "PENDING" ? <Spin /> :
          (<i className="!text-black fa-solid fa-arrow-right ml-3 cursor-pointer lg:p-2 lg:ml-1"
            onClick={handleButton}
          ></i>)}
      </form>

      <h4 className='text-center my-5 text-lg'>Recent Viewed Snapshots</h4>

      <div className='output w-5/6 mx-auto'>
      </div>

      <Modal title="Confirm" open={openModal} onOk={handleArchive} onCancel={handleCancel}>
        <p>Your URl <b>{inputValue}</b> is not archived. Do you want to archive it?</p>
      </Modal>
    </div>
  );
}

export default RecentViewed;