import { useState, useEffect } from "react";
import "./styles.css";

function StudentForm({ onSubmit, selected }) {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    if (selected) setStudent(selected);
  }, [selected]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!student.name || !student.email || !student.age) {
      alert("All fields are required");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(student.email)) {
      alert("Invalid email");
      return;
    }

    // Convert age to number before submitting
    onSubmit({
      ...student,
      age: Number(student.age)
    });

    setStudent({ name: "", email: "", age: "" });
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={student.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={student.email}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={student.age}
        onChange={handleChange}
      />
      <button type="submit">{selected ? "Update" : "Add"} Student</button>
    </form>
  );
}

export default StudentForm;