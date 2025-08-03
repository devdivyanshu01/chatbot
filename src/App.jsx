import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './header';
import Layout from './layout';
import SignIn from './signin';
import Signup from './signup';
import TermsOfService from './terms';
import PrivacyPolicy from './privacy';
import './App.css';
import ChatHistoryMobile from './mobilehistory';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mobilehistory" element={<ChatHistoryMobile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;