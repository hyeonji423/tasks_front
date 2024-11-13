import React from 'react'
import Navbar from '../components/Navbar'
import ItemPanel from '../components/ItemPanel'

const index = () => {
  return (
    <div className='page-section'>
      <Navbar menuIdx={2}/>
      <ItemPanel pageTitle='Proceeding Items' filterCompleted={false} />
    </div>
  )
}

export default index