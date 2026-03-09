import { useState, useEffect } from "react";

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
      alert("All fields required");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(student.email)) {
      alert("Invalid email");
      return;
    }

    onSubmit({
      ...student,
      age: Number(student.age)
    });

    setStudent({ name: "", email: "", age: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={student.name}
        onChange={handleChange}
      />

      <input
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

      <button type="submit">Save</button>
    </form>
  );
}

export default StudentForm;