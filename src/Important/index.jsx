import React from 'react'
import Navbar from '../components/Navbar'
import ItemPanel from '../components/ItemPanel'

const index = () => {
  return (
    <div className='page-section'>
      <Navbar menuIdx={3}/>
      <ItemPanel pageTitle='Important Items' filterCompleted='all' filterImportant={true} />
    </div>
  )
}

export default index