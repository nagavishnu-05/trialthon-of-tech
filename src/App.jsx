import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OpeningPage from './OpeningPage';
import SignUp from './SignUp';
import Login from './Login';
import StudentView from './Student/StudentView';
import AdminView from './Admin/AdminView';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/studentview" element={<StudentView />} />
      <Route path="/admin" element={<AdminView />} />
      </Routes>
    </Router>
  );
}

export default App
