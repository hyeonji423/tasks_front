import React, { useState } from 'react'
import { MdEditDocument, MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { fetchDeleteItemData, fetchGetItemsData } from "../redux/slices/apiSlice"

import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const Item = ({task}) => {
  const [confirm, setConfirm] = useState(false)
  const {_id, title, description, date, iscompleted, isimportant, userid} = task;
  const dispatch = useDispatch();

  const textLengthOverCut = (text, length, lastText) => {
    if(length === '' || length === null){
      length = 20 // 기본값
    }
    if(lastText === '' || lastText === null){
      lastText = '...'
    }
    if(text.length > length){
      text = text.substr(0, length) + lastText
    }
    return text;
  }


  // Custom Confirm Alert
  const deleteSubmit = () => {
    return new Promise((resolve)=>{
      confirmAlert({
        title: 'Reconfirmation',
        message: 'Are you sure you want to delete this item?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              setConfirm(true)
              resolve(true)
            },
          },
          {
            label: 'No',
            onClick: () => {
              setConfirm(false)
              resolve(false)
            },
          }
        ]
      })
    })
  }


  // Delete Item
  const handleDeleteItem = async() => {
    const result = await deleteSubmit()

    if(!result) return

    if(!_id) {
      toast.error('잘못된 사용자 접근입니다.')
      return
    }

    try {
      // unwrap(): 비동기 함수의 await 값이 인식되지 않을 때 사용
      await dispatch(fetchDeleteItemData(_id)).unwrap()
      toast.success('아이템이 삭제되었습니다.')
      await dispatch(fetchGetItemsData(userid)).unwrap()
    }
    catch (error) {
      toast.error('아이템 삭제에 실패했습니다.')
      console.error('Delete Item Error : '+error)
    }
  }


  return (
    <div className='item w-1/2 lg:w-1/3 h-[25vh] p-[0.25rem]'>
      <div className='w-full h-full border border-neutral-500 rounded-md bg bg-neutral-800 py-3 px-4 flex flex-col justify-between'>
        <div className="upper text-neutral-200">
          <h2 className='item-title text-lg font-normal mb-1.5 relative pt-1 pb-3 flex justify-between px-1'>
            <span className='item-line w-full absolute bottom-1 left-0 h-px bg-neutral-500'></span>
            {title}
            <span className='text-sm py-1 px-3 border border-neutral-500 rounded-md hover:bg-neutral-600 hover:text-neutral-50 cursor-pointer mb-1'>자세히</span>
          </h2>
          <p className='px-1 text-[15px]'>{textLengthOverCut(description, 60, ' ...')}</p>
        </div>
        <div className="lower">
          <p className='date text-sm mb-4 px-1 text-neutral-400'>{date}</p>
          <div className="item-footer flex justify-between mb-px">
            <div className="item-footer-left flex gap-1">
              {
                iscompleted ? (
                  <button className='item-btn bg-green-600 tracking-tight'>completed</button>
                ) : (
                  <button className='item-btn hidden bg-cyan-600 tracking-tight'>Incompleted</button>)
              }
              {
                isimportant && (<button className='item-btn bg-rose-500 tracking-tight'>Important</button>)
              }
            </div>
            <div className="item-footer-right flex gap-1 items-center">
              <button>
                <MdEditDocument className='w-6 h-6' />
              </button>
              <button className='delete' onClick={handleDeleteItem}>
                <MdDelete className='w-6 h-6' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item