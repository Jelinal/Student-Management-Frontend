import { useState } from "react";

function AddStudent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    dob: "",
    phone: "",
    address: "",
    rollNumber: "",
    class: "",
    section: "",
    stream: "",
    admissionYear: "",
    status: "Active",
    parentName: "",
    parentContact: "",
    relationship: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const payload = {
        body: JSON.stringify({
          rollNumber: form.rollNumber,
          name: form.name,
          email: form.email,
          age: Number(form.age),
          gender: form.gender,
          dob: form.dob,
          phone: form.phone,
          address: form.address,
          class: form.class,
          section: form.section,
          stream: form.stream,
          admissionYear: Number(form.admissionYear),
          status: form.status,
          parentName: form.parentName,
          parentContact: form.parentContact,
          relationship: form.relationship,
        }),
      };

      const response = await fetch("https://8mgscjgv98.execute-api.ap-south-1.amazonaws.com/dev/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload.body,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Student successfully added to the database!");
        setForm({
          name: "",
          email: "",
          age: "",
          gender: "",
          dob: "",
          phone: "",
          address: "",
          rollNumber: "",
          class: "",
          section: "",
          stream: "",
          admissionYear: "",
          status: "Active",
          parentName: "",
          parentContact: "",
          relationship: "",
        });
      } else {
        setMessage(`Error: ${result?.message || "Something went wrong."}`);
      }
    } catch (error) {
      console.error("API error:", error);
      setMessage("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-600">Add Student Details</h2>

      {message && <div className="mb-4 p-3 rounded bg-gray-100 text-sm">{message}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-6">
        
        <div>
          <h3 className="text-lg font-bold mb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="form-input" />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="form-input" />
            <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} className="form-input" />
            <select name="gender" value={form.gender} onChange={handleChange} className="form-input">
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input name="dob" type="date" value={form.dob} onChange={handleChange} className="form-input" />
            <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="form-input" />
            <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} className="form-input" />
          </div>
        </div>

       
        <div>
          <h3 className="text-lg font-bold mb-2">Academic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="rollNumber" placeholder="Roll Number" value={form.rollNumber} onChange={handleChange} className="form-input" />
            <select name="class" value={form.class} onChange={handleChange} className="form-input">
              <option value="">Select Grade</option>
              <option>VIII</option>
              <option>IX</option>
              <option>X</option>
            </select>
            <input name="section" placeholder="Section" value={form.section} onChange={handleChange} className="form-input" />
            <select name="stream" value={form.stream} onChange={handleChange} className="form-input">
              <option value="">Select Stream</option>
              <option>Science</option>
              <option>Commerce</option>
              <option>Arts</option>
            </select>
            <input name="admissionYear" type="number" placeholder="Admission Year" value={form.admissionYear} onChange={handleChange} className="form-input" />
            <select name="status" value={form.status} onChange={handleChange} className="form-input">
              <option value="Active">Active</option>
              <option value="Graduated">Graduated</option>
              <option value="Dropped">Dropped</option>
            </select>
          </div>
        </div>

       
        <div>
          <h3 className="text-lg font-bold mb-2">Parent / Guardian Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="parentName" placeholder="Parent / Guardian Name" value={form.parentName} onChange={handleChange} className="form-input" />
            <input name="parentContact" placeholder="Contact Number" value={form.parentContact} onChange={handleChange} className="form-input" />
            <select name="relationship" value={form.relationship} onChange={handleChange} className="form-input">
              <option value="">Select Relationship</option>
              <option>Father</option>
              <option>Mother</option>
              <option>Brother</option>
              <option>Sister</option>
              <option>Uncle</option>
              <option>Aunty</option>
            </select>
          </div>
        </div>

        
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Add Student"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;
