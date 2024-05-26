import React, { useEffect, useState } from 'react';
import Snapshot from './Snapshot';
import { Modal, Spin, message, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getListSnapshots, checkArchive, doArchive } from '../redux/action';


function Input() {
  const [inputValue, setInputValue] = useState("");
  const [intervalId, setIntervalId] = useState(null);
  const [openModal, setOpenModal] = useState(false)


  const dispatch = useDispatch()
  const archived = useSelector((state) => state.snapshot.isArchived)
  const listSnapshots = useSelector((state) => state.snapshot.listSnapshot)
  const statusProgress = useSelector((state) => state.snapshot.status)

  const checkIfArchived = async () => {
    dispatch(checkArchive(inputValue))
    if (archived === true) {
      clearInterval(intervalId)
      dispatch(getListSnapshots(inputValue))
    }
  };

  //click button arrow
  const handleButton = () => {
    // check archive or not
    if (inputValue === "") {
      notification.error({ message: "Please input URL", duration: 3 })
    } else {
      dispatch(checkArchive(inputValue))
      if (archived === true) {
        dispatch(getListSnapshots(inputValue))
      } else {
        notification.info({ message: "This url is not archived", duration: 3 })
        setOpenModal(true)
      }
    }
  }

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);


  //retain
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClearInput = () => {
    setInputValue("")
  }

  //modal handle
  const handleCancel = () => {
    setOpenModal(false)
  }

  const handleArchive = async () => {
    dispatch(doArchive(inputValue))
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

      {listSnapshots.length > 0 && (<h4 className='text-center my-5 text-lg'>Snapshot Versions</h4>)}

      <div className='output w-5/6 mx-auto'>
        {listSnapshots.map((item, index) => (<Snapshot key={index} name={inputValue} data={item} />))}
      </div>

      <Modal title="Confirm" open={openModal} onOk={handleArchive} onCancel={handleCancel}>
        <p>Your URl <b>{inputValue}</b> is not archived. Do you want to archive it?</p>
      </Modal>
    </div>
  );
}

export default Input;