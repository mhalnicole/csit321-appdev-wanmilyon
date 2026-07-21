import './css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PalitDaan from './layouts/PalitDaan';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<PalitDaan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
