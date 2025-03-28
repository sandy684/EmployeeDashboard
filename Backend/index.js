const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/employeeDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const employeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  salary: Number,
  joiningDate: Date,
  dob: Date,
});

const Employee = mongoose.model("Employee", employeeSchema);

app.post("/employees", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).send(newEmployee);
  } catch (err) {
    res.status(400).send(err);
  }
});


app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).send(employees);
  } catch (err) {
    res.status(500).send(err);
  }
});


app.put("/employees/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(updatedEmployee);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete("/employees/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
