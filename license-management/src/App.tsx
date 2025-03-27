import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './common/components/Navbar'
import Sidebar from './common/components/Navbar/Sidebar'
// import Navbar from "./common/components/Navbar"

function App() {

  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          {/* <Route path='/home' element={<Navbar />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
