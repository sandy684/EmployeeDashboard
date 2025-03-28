import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeList from "./EmployeeList";
import AddEditEmployee from "./AddEditEmployee";
import './App.css'

function App() {
  return (
    <Router>
      <div className="container">
        <center>
        <h1 className="title">Employee Dashboard</h1>
        </center>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<AddEditEmployee />} />
          <Route path="/edit/:id" element={<AddEditEmployee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
