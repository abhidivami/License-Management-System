// In App component
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import './App.css';
import { AgGridTable } from './common/component/AgGridTable/index';
import Navbar from './common/components/Navbar';
import Sidebar from './common/components/Navbar/Sidebar';
import DetailedViewOfEachRecord from './common/DetailedViewOfRecord/index';
import { LicenseForm } from './components/LicenseForm';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div className="main">
          <Sidebar />
          <Routes>
            <Route path="/" element={<AgGridTable />} />
            <Route path="/detailedView" element={<DetailedViewOfEachRecord />} />
            <Route path="/expired" element={<AgGridTable/>} />
          </Routes>
          {/* <LicenseForm/>
          <AgGridTable/> */}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
