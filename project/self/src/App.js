import logo from './logo.svg';
import './App.css';
import Navigation from './Components/Navigation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blogs from './Components/Blogs';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation />
        <Routes>

          <Route path='/' element={<Blogs />}></Route>
          <Route path='/about' element={<Blogs />}></Route>
          <Route path='/blogs' element={<Blogs />}></Route>
          <Route path='/contact' element={<Blogs />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
