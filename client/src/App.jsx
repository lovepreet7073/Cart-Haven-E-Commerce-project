import './App.css';
import { Route, Routes } from 'react-router-dom';
import CustomerRoutes from './Routers/CustomerRoutes';
import AdminRoutes from './Routers/AdminRoutes';
import { Toaster } from 'react-hot-toast';  // Import the Toaster component

function App() {
  return (
    <div className=''>
      <Toaster /> {/* Toaster added here for global toast notifications */}
      <Routes>
        <Route path='/*' element={<CustomerRoutes />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
