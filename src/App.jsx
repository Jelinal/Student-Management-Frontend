
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import ViewStudents from "./components/pages/admin/ViewStudents";
import AddStudent from "./components/pages/admin/AddStudent";
import StudentDashboard from "./components/pages/student/StudentDashboard";
import ManageStudents from "./components/pages/admin/ManageStudents";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="view-students" element={<ViewStudents />} />
          <Route path="add-student" element={<AddStudent />} />
           <Route path="manage-students" element={<ManageStudents />} />
        </Route>

      
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
