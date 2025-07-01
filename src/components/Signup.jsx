import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      alert("All fields are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.username === form.username);
    if (exists) {
      alert("Username already exists.");
      return;
    }

    const newUser = { ...form, role: "admin" };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Admin signup successful! Please log in.");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      <header className="bg-blue-600 text-white px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src="/student.svg"
              alt="Logo"
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-2xl font-bold">Student Management System</h1>
          </div>
        </div>
      </header>

      
      <div
        className="flex-grow flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1391730574/vector/light-sky-blue-and-faded-white-coloured-ombre-rustic-and-smudged-painted-plastered-scratched.jpg?s=612x612&w=0&k=20&c=0UzbHPlW4Tjor2v9Lont1XJmacbm7uUljglrSENFU3I=')",
        }}
      >
        <form
          className="bg-white bg-opacity-90 p-8 rounded shadow-md w-full max-w-sm backdrop-blur"
          onSubmit={handleSignup}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Signup</h2>

          <label className="block mb-2 text-sm">Username</label>
          <input
            name="username"
            className="w-full px-3 py-2 mb-3 border rounded"
            onChange={handleChange}
            required
          />

          <label className="block mb-2 text-sm">Email</label>
          <input
            name="email"
            type="email"
            className="w-full px-3 py-2 mb-3 border rounded"
            onChange={handleChange}
            required
          />

          <label className="block mb-2 text-sm">Password</label>
          <input
            name="password"
            type="password"
            className="w-full px-3 py-2 mb-6 border rounded"
            onChange={handleChange}
            required
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Signup as Admin
          </button>

          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer underline"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Signup;
