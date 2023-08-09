import Navigation from './Components/Navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './Components/About';
import Contact from './Components/Contact';
import MyBlogs from './Components/MyBlogs';
import './App.css';
import Search from './Components/Search';
import Pagination from './Components/Pagination';
import Fetch from './New/Fetch';


function App() {
  return (
    <>
    <div className="App">
      
        <BrowserRouter >
          <Navigation />
          <Search />
          <Pagination />
          <Routes>
            <Route path='/' element={<MyBlogs />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/blogs' element={<MyBlogs />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
          </Routes>
        </BrowserRouter>
        {/* <Fetch /> */}
    </div>
    </>
  );
}

export default App;
