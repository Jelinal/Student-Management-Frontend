import { useState } from "react";

function EditDeleteStudent({ index, action, students, setStudents, onClose }) {
  const [form, setForm] = useState({ ...students[index] });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://8mgscjgv98.execute-api.ap-south-1.amazonaws.com/dev/students", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = [...students];
      updated[index] = form;
      setStudents(updated);
      onClose();
    } catch (error) {
      setNotification("Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${form.name}?`)) return;
    setLoading(true);
    try {
      const url = new URL("https://8mgscjgv98.execute-api.ap-south-1.amazonaws.com/dev/students");
      url.searchParams.append("rollNumber", form.rollNumber);
      url.searchParams.append("email", form.email);

      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      const updated = [...students];
      updated.splice(index, 1);
      setStudents(updated);
      setNotification("Student deleted successfully!");
      setTimeout(() => {
        setNotification("");
        onClose();
      }, 1500);
    } catch (error) {
      setNotification("Failed to delete student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-white p-6 shadow-md rounded border max-h-screen overflow-y-auto">
      {notification && (
        <div className="mb-4 px-4 py-2 rounded text-white" style={{ backgroundColor: notification.includes("✅") ? "#38a169" : "#e53e3e" }}>
          {notification}
        </div>
      )}

      {action === "edit" && (
        <>
          <h3 className="text-xl font-bold mb-4">Edit Student</h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={handleChange} className="input border px-3 py-2 rounded" placeholder="Name" required />
            <input name="email" value={form.email} onChange={handleChange} className="input border px-3 py-2 rounded" placeholder="Email" required />
            <input name="phone" value={form.phone} onChange={handleChange} className="input border px-3 py-2 rounded" placeholder="Phone" />
            <input name="parentName" value={form.parentName} onChange={handleChange} className="input border px-3 py-2 rounded" placeholder="Parent Name" />
            <input name="parentContact" value={form.parentContact} onChange={handleChange} className="input border px-3 py-2 rounded" placeholder="Parent Contact" />
            <input name="relationship" value={form.relationship} onChange={handleChange} className="input border px-3 py-2 rounded" placeholder="Relationship" />
            <input name="rollNumber" value={form.rollNumber} onChange={handleChange} className="input border px-3 py-2 rounded" placeholder="Roll Number" required />
            <input name="class" value={form.class} onChange={handleChange} className="input border px-3 py-2 rounded" placeholder="Class" />
            <input name="section" value={form.section} onChange={handleChange} className="input border px-3 py-2 rounded" placeholder="Section" />
            <input name="stream" value={form.stream} onChange={handleChange} className="input border px-3 py-2 rounded" placeholder="Stream" />
            <input name="gender" value={form.gender} onChange={handleChange} className="input border px-3 py-2 rounded" placeholder="Gender" />
            <input name="dob" value={form.dob} onChange={handleChange} type="date" className="input border px-3 py-2 rounded" />
            <input name="age" value={form.age} onChange={handleChange} type="number" className="input border px-3 py-2 rounded" placeholder="Age" />
            <input name="address" value={form.address} onChange={handleChange} className="input border px-3 py-2 rounded" placeholder="Address" />
            <input name="admissionYear" value={form.admissionYear} onChange={handleChange} className="input border px-3 py-2 rounded" placeholder="Admission Year" />
            <input name="status" value={form.status} onChange={handleChange} className="input border px-3 py-2 rounded" placeholder="Status" />

            <div className="col-span-full flex gap-2 mt-4">
              <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                {loading ? "Saving..." : "Save"}
              </button>
              <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </form>
        </>
      )}

      {action === "delete" && (
        <>
          <h3 className="text-xl font-bold mb-4 text-red-600">Delete Student</h3>
          <p className="mb-4">
            Are you sure you want to delete <strong>{form.name}</strong>?
          </p>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              {loading ? "Deleting..." : "Confirm Delete"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default EditDeleteStudent;
