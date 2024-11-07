import React from 'react'
import Navbar from '../components/Navbar'
import ItemPanel from '../components/ItemPanel'

const index = () => {
  return (
    <div className='page-section'>
      <Navbar menuIdx={1}/>
      <ItemPanel pageTitle='Completed Items' />
    </div>
  )
}

export default index