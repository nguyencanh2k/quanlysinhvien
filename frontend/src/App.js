import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/login/Login';
import Dashboard from './Dashboard';
import Register from './Pages/register/Register';

function App() {
    return (
        <div id="App">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<Dashboard />} />
            </Routes>
        </div>
    );
}

export default App;
