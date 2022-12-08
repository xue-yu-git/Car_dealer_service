import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturersForm from './ManufacturerForm';
import AutomobileList from './Automobile';
import AutomobilesForm from './AutomobileForm';
import ModelsList from './ModelsList';
import ModelsForm from './ModelsForm';
import SalesPersonList from './SalesPersonList';
import SalespersonForm from './SalesPersonForm';
import CustomersList from './CustomersList';
import CustomersForm from './CustomersForm';
import SalesList from './SalesList';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';


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
            <Route path="new" element={<CustomersForm />} />
          </Route>
          <Route path="technicians">
            <Route index element={<TechnicianList />} />
            <Route path="new" element={<TechnicianForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
