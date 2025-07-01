import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img src="/student.svg" alt="Logo" className="h-10 w-10 object-contain" />
        <h1 className="text-2xl font-bold">Student Management System</h1>
      </div>
      <div className="flex items-center gap-4 text-md">
        <span className="text-lg">Logged in as: <strong>{role}</strong></span>
        <button
          className="bg-red-600 text-white-600 px-4 py-1 rounded hover:bg-red-700"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
