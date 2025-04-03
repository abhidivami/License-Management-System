// In App component
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import './App.css';
import { AgGridTable } from './common/component/AgGridTable/index';
import Navbar from './common/components/Navbar';
import Sidebar from './common/components/Navbar/Sidebar';
import DetailedViewOfEachRecord from './common/DetailedViewOfRecord/index';
import Analytics from './components/Analytics/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div className="main">
          <Sidebar />
          <Routes>
            <Route path="/" element={<AgGridTable page="home" />} />
            <Route path="/home" element={<AgGridTable page="home"/>} />
            <Route path="/detailedView" element={<DetailedViewOfEachRecord />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/expired" element={<AgGridTable page="expired" />} />
            <Route path="/expiring" element={<AgGridTable page="expiring" />} />
          </Routes>
          {/* <LicenseForm/>
          <AgGridTable/> */}
          <ToastContainer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
