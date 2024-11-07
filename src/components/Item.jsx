import React from 'react'
import { MdEditDocument, MdDelete } from "react-icons/md";

const Item = () => {
  const desc = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur, nisi. Earum optio esse amet aperiam qui eum provident nam temporibus totam numquam fuga natus est excepturi in recusandae, impedit et!'
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

  return (
    <div className='item w-1/3 h-[25vh] p-[0.25rem]'>
      <div className='w-full h-full border border-neutral-500 rounded-md bg bg-neutral-800 py-3 px-4 flex flex-col justify-between'>
        <div className="upper text-neutral-200">
          <h2 className='item-title text-lg font-normal mb-1.5 relative pt-1 pb-3 flex justify-between px-1'>
            <span className='item-line w-full absolute bottom-1 left-0 h-px bg-neutral-500'></span>
            코딩하기
            <span className='text-sm py-1 px-3 border border-neutral-500 rounded-md hover:bg-neutral-600 hover:text-neutral-50 cursor-pointer mb-1'>자세히</span>
          </h2>
          <p className='px-1 text-[15px]'>{textLengthOverCut(desc, 80, ' ...')}</p>
        </div>
        <div className="lower">
          <p className='date text-sm mb-4 px-1 text-neutral-400'>2024-11-07</p>
          <div className="item-footer flex justify-between mb-px">
            <div className="item-footer-left flex gap-2">
              <button className='item-btn bg-cyan-600 hover:bg-cyan-700'>completed</button>
              {/* <button className='item-btn hidden bg-green-600 hover:bg-green-700'>Incompleted</button> */}
              <button className='item-btn bg-amber-600 hover:bg-amber-700'>Important</button>
            </div>
            <div className="item-footer-right flex gap-1 items-center">
              <button>
                <MdEditDocument className='w-6 h-6' />
              </button>
              <button>
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