import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AddEditEmployee() {
  const [employee, setEmployee] = useState({ name: "", department: "", salary: "", joiningDate: "", dob: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/employees/${id}`).then((response) => {
        setEmployee(response.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:5000/employees/${id}`, employee);
    } else {
      await axios.post("http://localhost:5000/employees", employee);
    }
    navigate("/");
  };

  return (
    <div className="from-container">
      <h2>{id ? "Edit" : "Add"} Employee</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={employee.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" required />
        <input type="text" name="department" value={employee.department} onChange={handleChange} placeholder="Department" className="w-full border p-2 rounded" required />
        <input type="number" name="salary" value={employee.salary} onChange={handleChange} placeholder="Salary" className="w-full border p-2 rounded" required />
        <input type="date" name="joiningDate" value={employee.joiningDate} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="date" name="dob" value={employee.dob} onChange={handleChange} className="w-full border p-2 rounded" required />
        <button type="submit">{id ? "Update" : "Add"} Employee</button>
      </form>
    </div>
  );
}

export default AddEditEmployee;
