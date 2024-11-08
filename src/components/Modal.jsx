import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/slices/modalSlice';

const Modal = () => {
  const dispatch = useDispatch()
  const { modalType, task } = useSelector((state)=>state.modal)
  // console.log(modalType, task);
  
  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  const showModalTitle = (modalType, str1, str2, str3) => {
    switch(modalType){
      case 'update':
        return str1
      case 'details':
        return str2
      default:
        return str3
    }
  }

  const modalTitle = showModalTitle(modalType, '할 일 수정하기', '할 일 상세 보기', '할 일 추가하기')

  return (
    <div className='modal fixed bg-neutral-950 bg-opacity-60 w-full h-full left-0 top-0 flex items-center justify-center z-50'>
      <div className='form-wrapper bg-neutral-700 rounded-xl w-1/2 h-[40vh] relative p-4'>
        <h2 className='text-lg border-b border-neutral-300 w-fit'>{modalTitle}</h2>
        <IoIosCloseCircle className='absolute right-3 top-4 cursor-pointer w-7 h-7' onClick={handleCloseModal} />
      </div>
    </div>
  )
}

export default Modal