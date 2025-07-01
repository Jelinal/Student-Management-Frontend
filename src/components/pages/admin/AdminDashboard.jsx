
import { Outlet } from "react-router-dom";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import Footer from "../../Footer";

function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet /> 
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
