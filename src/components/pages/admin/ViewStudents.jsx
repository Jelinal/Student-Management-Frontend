import { useEffect, useState } from "react";

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("https://8mgscjgv98.execute-api.ap-south-1.amazonaws.com/dev/students");
        if (!response.ok) throw new Error("Failed to fetch students");
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError("Unable to fetch students. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-600">All Students Details</h2>

        {loading ? (
          <p className="text-gray-500">Loading students...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
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
                {students.length > 0 ? (
                  students.map((s, index) => (
                    <tr
                      key={index}
                      className="hover:bg-blue-50 transition duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {s.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 border-l border-gray-200">
                        {s.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 border-l border-gray-200">
                        {s.class}
                      </td>
                      <td className="px-6 py-4 text-center border-l border-gray-200">
                        <button
                          onClick={() => setSelectedStudent(s)}
                          className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center text-gray-500 py-8"
                    >
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      
      {selectedStudent && (
        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Student Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Email:</strong> {selectedStudent.email}</p>
            <p><strong>Age:</strong> {selectedStudent.age}</p>
            <p><strong>Gender:</strong> {selectedStudent.gender}</p>
            <p><strong>DOB:</strong> {selectedStudent.dob}</p>
            <p><strong>Phone:</strong> {selectedStudent.phone}</p>
            <p><strong>Address:</strong> {selectedStudent.address}</p>
            <p><strong>Roll Number:</strong> {selectedStudent.rollNumber}</p>
            <p><strong>Class:</strong> {selectedStudent.class}</p>
            <p><strong>Section:</strong> {selectedStudent.section}</p>
            <p><strong>Stream:</strong> {selectedStudent.stream}</p>
            <p><strong>Admission Year:</strong> {selectedStudent.admissionYear}</p>
            <p><strong>Status:</strong> {selectedStudent.status}</p>
            <p><strong>Parent Name:</strong> {selectedStudent.parentName}</p>
            <p><strong>Parent Contact:</strong> {selectedStudent.parentContact}</p>
            <p><strong>Relationship:</strong> {selectedStudent.relationship}</p>
          </div>
          <button
            onClick={() => setSelectedStudent(null)}
            className="mt-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default ViewStudents;
