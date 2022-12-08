import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './inventory/ManufacturersList';
import ManufacturersForm from './inventory/ManufacturerForm';
import AutomobileList from './inventory/Automobile';
import AutomobilesForm from './inventory/AutomobileForm';
import ModelsList from './inventory/ModelsList';
import ModelsForm from './inventory/ModelsForm';
import SalesPersonList from './sales/SalesPersonList';
import SalespersonForm from './sales/SalesPersonForm';
import CustomersList from './sales/CustomersList';
import CustomersForm from './sales/CustomersForm';
import SalesList from './sales/SalesList';
import SalesForm from './sales/SalesForm';
import TechnicianForm from './service/TechnicianForm';
import TechnicianList from './service/TechnicianList';
import AppointmentForm from './service/AppointmentForm';
import AppointmentList from './service/AppointmentList';
import AppointmentHistoryList from './service/AppointmentHistoryList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturersList />} />
            <Route path="new" element={<ManufacturersForm />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="new" element={<AutomobilesForm />} />
          </Route>
          <Route path="models">
            <Route index element={<ModelsList />} />
            <Route path="new" element={<ModelsForm />} />
          </Route>
          <Route path="salespersons">
            <Route index element={<SalesPersonList />} />
            <Route path="new" element={<SalespersonForm />} />
          </Route>
          <Route path="customers">
            <Route index element={<CustomersList />} />
            <Route path="new" element={<CustomersForm />} />
          </Route>
          <Route path="sales">
            <Route index element={<SalesList />} />
            <Route path="new" element={<SalesForm />} />
          </Route>
          <Route path="technicians">
            <Route index element={<TechnicianList />} />
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route index element={<AppointmentList />} />
            <Route path="new" element={<AppointmentForm />} />
            <Route path="history" element={<AppointmentHistoryList />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
