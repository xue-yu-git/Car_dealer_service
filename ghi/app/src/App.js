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
          <Route path="automobiles" element={<AutomobileList />} />
          <Route path="automobiles/new" element={<AutomobilesForm />} />
          <Route path="models" element={<ModelsList />} />
          <Route path="models/new" element={<ModelsForm />} />
          <Route path="salespersons">
            <Route index element={<SalesPersonList />} />
            <Route path="new" element={<ManufacturersForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
