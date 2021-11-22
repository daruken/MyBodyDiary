import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'
import Signup from './Pages/Login/Signup'
import Nav from './Pages/Nav'
import './App.css';

function App() {
  document.title = "MyBodyDiary"

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
