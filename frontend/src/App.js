import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/login/Login';
import Dashboard from './Dashboard';
import Register from './components/register/Register';
import axios from 'axios';

function App() {
    const [currentUser, setCurrentUser] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem('accessToken');
        if (user) {
            setCurrentUser(user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${user}`;
        }
    }, []);
    return (
        <div id="App">
            <Routes>
                {currentUser && <Route path="/*" element={<Dashboard />} />}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;
