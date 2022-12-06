import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturersForm from './ManufacturerForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index path="/" element={<MainPage />} />
          <Route path="manufacturers" element={<ManufacturersList />} />
          <Route path="manufacturers/new" element={<ManufacturersForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
