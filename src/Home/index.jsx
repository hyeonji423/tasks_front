import React from 'react'
import Navbar from '../components/Navbar'
import ItemPanel from '../components/ItemPanel'

const index = () => {
  return (
    <div className='page-section'>
      <Navbar menuIdx={0}/>
      <ItemPanel pageTitle='All Items' />
    </div>
  )
}

export default index