import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AgGridTable } from "./common/component/AgGridTable/index"
import { Provider } from "react-redux"
import { store } from "./Redux/Store"
import { LicenseForm } from "./components/LicenseForm/index"
import { ExampleComponent } from "./pages"
import Navbar from './common/components/Navbar'
import Sidebar from './common/components/Navbar/Sidebar'
// import Navbar from "./common/components/Navbar"

function App() {

  return (
    <>
      {/* <DetailedViewOfEachRecord /> */}
      
      {/* <LicenseForm />
      <AgGridTable/>
      <ExampleComponent/> */}
     
      
      <Provider store={store} >
     
      <BrowserRouter> 
        <Navbar />
        <div className='main'>
          <Sidebar />
          <AgGridTable/>
        </div>
        <Routes>
          {/* <Route path='/home' element={<Navbar />} /> */}
        </Routes>
     </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
