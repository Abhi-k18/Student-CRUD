import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import { getStudents, addStudent, updateStudent, deleteStudent } from "./services/api";

function App() {

  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (data.id) {
        await updateStudent(data.id, data);
      } else {
        await addStudent(data);
      }
      setSelected(null);
      loadStudents();
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      loadStudents();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h2>Student Management</h2>

      <StudentForm onSubmit={handleSubmit} selected={selected}/>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <StudentList
          students={students}
          onEdit={setSelected}
          onDelete={handleDelete}
        />
      )}

    </div>
  );
}

export default App;