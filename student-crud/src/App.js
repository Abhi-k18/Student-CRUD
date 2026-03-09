import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import { getStudents, addStudent, updateStudent, deleteStudent } from "./services/api";
import './styles.css';

function App() {

  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadStudents = async () => {
    setLoading(true);
    const res = await getStudents();
    setStudents(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSubmit = async (data) => {
    if (data.id) {
      await updateStudent(data.id, data);
    } else {
      await addStudent(data);
    }
    setSelected(null);
    loadStudents();
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    loadStudents();
  };

  return (
    <div className="container">
      <h2>Student Management</h2>

      <StudentForm onSubmit={handleSubmit} selected={selected} />

      {loading ? <p>Loading...</p> :
        <StudentList
          students={students}
          onEdit={setSelected}
          onDelete={handleDelete}
        />
      }
    </div>
  );
}

export default App;