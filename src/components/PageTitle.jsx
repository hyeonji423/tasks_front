import React from 'react'

const PageTitle = ({title}) => {
  return (
    <div className='page-title text-xl font-semibold py-2 px-2 mb-6 relative w-fit'>
        {title}
      <span className='underbar absolute w-full h-px bg-neutral-300 left-0 bottom-1'></span>
    </div>
  )
}

export default PageTitle