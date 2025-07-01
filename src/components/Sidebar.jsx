import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded hover:bg-blue-500 hover:text-white ${
      location.pathname === path ? "bg-blue-600 text-white" : "text-gray-800"
    }`;

  return (
    <div className="w-64  bg-blue-100  p-4 shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-600 text-center ">Admin Panel</h2>
      <nav className="flex flex-col space-y-6 ">
        <Link to="/admin/view-students" className={linkClass("/admin/view-students")}>
          View Students
        </Link>
        <Link to="/admin/add-student" className={linkClass("/admin/add-student")}>
          Add Student
        </Link>
        <Link to="/admin/manage-students" className={linkClass("/admin/manage-students")}>
          Edit/Delete Students
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
