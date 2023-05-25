import { Link } from 'react-router-dom'
import image from '../assets/3828537.jpg'

const Error = () => {
  return (
    <section className='section error-page'>
      <div className="error-container">
        <h1>oops! <span>it's a dead end bro!</span></h1>
        <Link className='btn btn-white' to="/">back home</Link>
      </div>
      <div className="error-image">
        <img src={image} alt="Not found" />
      </div>
    </section>
  )
}

export default Error