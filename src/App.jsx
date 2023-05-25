import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// Import components
import Navbar from './components/Navbar'
import Sidebar from "./components/Sidebar"
// Import pages
import Home from './pages/Home'
import About from './pages/About'
import Singlerecipe from './pages/Singlerecipe'
import SingleCategory from "./pages/SingleCategory"
import Error from "./pages/Error"

const App = () => {
  
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipe/:id" element={<Singlerecipe />} />
        <Route path="/:category" element={<SingleCategory />} />
        <Route path="*" element={<Error />} />
      </Routes>      
    </Router>
  )
}

export default App
