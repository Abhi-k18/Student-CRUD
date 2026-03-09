import axios from "axios";

const API = "https://student-crud-h1mu.onrender.com/students";

export const getStudents = () => axios.get(API);
export const addStudent = (data) => axios.post(API, data);
export const updateStudent = (id, data) => axios.patch(`${API}/${id}`, data);
export const deleteStudent = (id) => axios.delete(`${API}/${id}`);