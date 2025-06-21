import React, { useContext } from 'react'
import { UserContext } from '../../context/useContext'
import Navbar from './Navbar';

const DashboardLayout = ({activeMenu, children}) => {
    const {user} = useContext(UserContext);
  return (
    <div>
        <Navbar activeMenu={activeMenu}>

        </Navbar>
        {user && <div className='container mx-auto pt-4 pb-4'>{children}</div>}
    </div>
  )
}

export default DashboardLayout