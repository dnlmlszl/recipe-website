import React from 'react'
import { useGlobalContext } from '../context'
import logo from '../assets/OE612P0.jpg'
import { FaWindowClose } from 'react-icons/fa'
import { categories } from '../../data.js'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const { isSidebarOpen, closeSidebar } = useGlobalContext()
    
  return (
    <aside className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
        <div className="sidebar-header">
            <img src={logo} alt="recipe" className='logo' />
            <button className='close-btn' onClick={closeSidebar}>
                <FaWindowClose />
            </button>
        </div>
        <ul className="links">
            { categories && categories.map((category, index) => {
                return (
                    <Link to={`/${category}`} key={index} onClick={closeSidebar}>{category}</Link>
                )
            })}
        </ul>
    </aside>
  )
}

export default Sidebar