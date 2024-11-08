import React from 'react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const LoadingSkeleton = () => {
  return (
    <div className='flex flex-col justify-between w-1/3 p-4'>
      <div>
        <Skeleton width='40%' height='30px' />
      </div>
      <div>
        <Skeleton width='100%' height='30px' />
        <Skeleton width='100%' height='30px' />
        <Skeleton width='100%' height='30px' />
        <Skeleton width='100%' height='30px' />
      </div>
    </div>
  )
}

export default LoadingSkeleton