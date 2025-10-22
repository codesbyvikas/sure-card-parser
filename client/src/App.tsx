import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './Components/NavBar'
// import UploadPage from './screens/UploadPage';
import CardResultPage from './screens/ResultPage';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element ={<CardResultPage/>} />
      </Routes>
    </Router>
  );
}

export default App
