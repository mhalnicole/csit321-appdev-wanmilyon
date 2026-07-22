import './css/App.css';
import './css/Transitions.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PalitDaan from './layouts/PalitDaan';
import Login from './pages/Login';
import SignUp from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<PalitDaan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
