import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './Components/NavBar'
import UploadPage from './screens/UploadPage';
import CardResultPage from './screens/ResultPage';
import SignInPage from './screens/LoginPage';
import FAQPage from './screens/FAQPage';
import ContactPage from './screens/ContactPage';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element ={<UploadPage/>} />
        <Route path='/signin' element ={<SignInPage/>} />
        <Route path='/result' element ={<CardResultPage/>}/>
        <Route path='/faq' element ={<FAQPage/>}/>
        <Route path='contact' element ={<ContactPage/>}/>
      </Routes>
    </Router>
  );
}

export default App
