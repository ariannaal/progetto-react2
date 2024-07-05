
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Homepage from './components/Homepage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailPage from './components/DetailPage'
import MyNavbar from './components/MyNavbar';



function App() {

  return (
    <>
      <BrowserRouter>
        <div>
          <MyNavbar className="text-center" />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/detail/:lat/:lon" element={<DetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
