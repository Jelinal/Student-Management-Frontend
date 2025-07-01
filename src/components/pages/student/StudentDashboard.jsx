import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Header";
import Footer from "../../Footer";

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [form, setForm] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("username"); 
    const role = localStorage.getItem("role");

    if (!email || role !== "student") {
      navigate("/login");
      return;
    }

    const allStudents = JSON.parse(localStorage.getItem("students")) || [];
    const loggedInStudent = allStudents.find((s) => s.email === email);

    if (!loggedInStudent) {
      alert("Student record not found.");
      navigate("/login");
      return;
    }

    setStudent(loggedInStudent);
    setForm(loggedInStudent);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];
    const updated = allStudents.map((s) =>
      s.email === form.email ? { ...s, ...form } : s
    );
    localStorage.setItem("students", JSON.stringify(updated));
    setStudent(form);
    setEditMode(false);
    alert("Profile updated!");
  };

  if (!form) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-6 bg-gray-100">
        <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Profile</h2>
            <button
              onClick={() => setEditMode(!editMode)}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>

         
          <div>
            <h3 className="font-bold text-lg mb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "age", "gender", "dob", "phone", "address"].map((key) => (
                <input
                  key={key}
                  name={key}
                  value={form[key] || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="form-input"
                />
              ))}
            </div>
          </div>

          
          <div>
            <h3 className="font-bold text-lg mb-2">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Roll Number:</strong> {form.rollNumber}</p>
              <p><strong>Class:</strong> {form.class}</p>
              <p><strong>Section:</strong> {form.section}</p>
              <p><strong>Stream:</strong> {form.stream}</p>
              <p><strong>Admission Year:</strong> {form.admissionYear}</p>
              <p><strong>Status:</strong> {form.status}</p>
            </div>
          </div>

         
          <div>
            <h3 className="font-bold text-lg mb-2">Parent / Guardian</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["parentName", "parentContact", "relationship"].map((key) => (
                <input
                  key={key}
                  name={key}
                  value={form[key] || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="form-input"
                />
              ))}
            </div>
          </div>

          {editMode && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default StudentDashboard;
