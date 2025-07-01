import { useEffect, useState } from "react";
import EditDeleteStudent from "./EditDeleteStudent";

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("https://8mgscjgv98.execute-api.ap-south-1.amazonaws.com/dev/students");
        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students", error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div className="flex-1 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-600">Manage Students Details</h2>
        {students.length === 0 ? (
          <p className="text-gray-500">No students found.</p>
        ) : (
          <div className="overflow-x-auto shadow ring-1 ring-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
              <thead className="bg-blue-100 sticky top-0">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 font-semibold text-gray-700 border-l border-gray-300">Email</th>
                  <th className="px-6 py-3 font-semibold text-gray-700 border-l border-gray-300">Class</th>
                  <th className="px-6 py-3 font-semibold text-center text-gray-700 border-l border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {students.map((student, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 transition duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 border-l border-gray-200">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 border-l border-gray-200">
                      {student.class}
                    </td>
                    <td className="px-6 py-4 text-center border-l border-gray-200">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedIndex(idx);
                            setActionType("edit");
                          }}
                          className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedIndex(idx);
                            setActionType("delete");
                          }}
                          className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      
      {selectedIndex !== null && selectedIndex < students.length && (
        <EditDeleteStudent
          index={selectedIndex}
          action={actionType}
          students={students}
          setStudents={setStudents}
          onClose={() => {
            setSelectedIndex(null);
            setActionType(null);
          }}
        />
      )}
    </div>
  );
}

export default ManageStudents;
