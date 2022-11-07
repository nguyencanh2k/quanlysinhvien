import './App.css';
import SideBar from './Pages/Sidebar';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import Student from './Pages/student/Student';
import AddStudent from './Pages/student/AddStudent';
import EditStudent from './Pages/student/EditStudent';
import ViewStudent from './Pages/student/ViewStudent';
import User from './Pages/user/User';
import AddUser from './Pages/user/AddUser';
import EditUser from './Pages/user/EditUser';
import ViewUser from './Pages/user/ViewUser';

function App() {
    return (
        <div id="wrapper">
            <SideBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/list-student" element={<Student />} />
                        <Route path="/add-student" element={<AddStudent />} />
                        <Route path="/edit-student/:id" element={<EditStudent />} />
                        <Route path="/view-student/:id" element={<ViewStudent />} />
                        <Route path="/list-user" element={<User />} />
                        <Route path="/add-user" element={<AddUser />} />
                        <Route path="/edit-user/:id" element={<EditUser />} />
                        <Route path="/view-user/:id" element={<ViewUser />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default App;
