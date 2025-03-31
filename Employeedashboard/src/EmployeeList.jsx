import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/employees").then((response) => {
      setEmployees(response.data);
    });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await axios.delete(`http://localhost:5000/employees/${id}`);
      setEmployees(employees.filter((emp) => emp._id !== id));
    }
  };

  return (
    <div>
        <center>
      <Link to="/add" className="btn-add">ADD EMPLOYEE</Link></center>
      {employees.length > 0 && (
  <table className="employee-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {employees.map((employee) => (
        <tr key={employee._id} className="text-center">
          <td>{employee.name}</td>
          <td>{employee.department}</td>
          <td>${employee.salary}</td>
          <td>
            <button onClick={() => handleDelete(employee._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </td>
          <td>
            <Link to={`/edit/${employee._id}`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Update</Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}
    </div>
  );
}

export default EmployeeList;
