import { useNavigate } from "react-router-dom";



function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
     
      <header className="bg-blue-600 text-white px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/student.svg" alt="Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-2xl font-bold">Student Management System</h1>
          </div>
          
        </div>
      </header>

      
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-pink-200 opacity-60 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-200 opacity-60 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 opacity-60 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

     
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 bg-transparent">
        <h2 className="text-4xl font-bold mb-4 text-blue-700 animate-fadeInUp">Welcome to the Student Management System</h2>
        <p className="text-lg text-gray-700 mb-6 max-w-xl">
          Manage student records efficiently with our serverless cloud-powered solution.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-700"
        >
          Get Started
        </button>
      </main>

      
      <footer className="bg-blue-600 text-center py-4 text-sm text-white">
        &copy; {new Date().getFullYear()} Student Management System. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
