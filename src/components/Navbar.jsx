import logo from '../assets/OE612P0.jpg'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'

const Navbar = () => {
  
  const {openSidebar} = useGlobalContext()

  return (
    <nav className='navbar'>
      <div className="nav-center">
        <Link to="/">
          <img src={logo} alt="Mr Chef" className='logo' width={50} height={50}/>
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <button onClick={openSidebar}>categories</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar