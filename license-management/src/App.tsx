import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from "./common/components/Navbar"

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
