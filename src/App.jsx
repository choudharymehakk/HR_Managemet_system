import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import heroImg from "./assets/illustartor.png";

const API = "https://hrms-lite-backend-h1w7.onrender.com"; // change after backend deploy

export default function App() {
  // ---------------- STATES ----------------
  const [activeTab, setActiveTab] = useState("employees");

  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const [attendance, setAttendance] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  const [attendanceEmpId, setAttendanceEmpId] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // ---------------- FUNCTIONS ----------------
  const fetchEmployees = async () => {
    const res = await axios.get(`${API}/employees/`);
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async () => {
    await axios.post(`${API}/employees/`, form);
    setForm({
      employee_id: "",
      full_name: "",
      email: "",
      department: "",
    });
    fetchEmployees();
  };

  const markAttendance = async () => {
    await axios.post(`${API}/attendance/`, attendance);
    alert("Attendance marked successfully");
  };

  const fetchAttendance = async () => {
    if (!attendanceEmpId) {
      alert("Enter Employee ID");
      return;
    }
    const res = await axios.get(`${API}/attendance/${attendanceEmpId}`);
    setAttendanceRecords(res.data);
  };

  // ---------------- UI ----------------
  return (
    <div className="app">
      {/* HERO */}
      <header className="hero fade-in">
        <div>
          <h1>HRMS Lite</h1>
          <p>Internal HR tool to manage employees and attendance</p>
        </div>
        <img src={heroImg} alt="HR Illustration" />
      </header>

      {/* TABS */}
      <nav className="tabs">
        <button
          className={activeTab === "employees" ? "tab active" : "tab"}
          onClick={() => setActiveTab("employees")}
        >
          Employees
        </button>

        <button
          className={activeTab === "attendance" ? "tab active" : "tab"}
          onClick={() => setActiveTab("attendance")}
        >
          Mark Attendance
        </button>

        <button
          className={activeTab === "view" ? "tab active" : "tab"}
          onClick={() => setActiveTab("view")}
        >
          View Attendance
        </button>
      </nav>

      {/* EMPLOYEES TAB */}
      {activeTab === "employees" && (
        <>
          <section className="card slide-up">
            <h2>Add Employee</h2>
            <div className="form-grid">
              <input
                placeholder="Employee ID"
                value={form.employee_id}
                onChange={e =>
                  setForm({ ...form, employee_id: e.target.value })
                }
              />
              <input
                placeholder="Full Name"
                value={form.full_name}
                onChange={e =>
                  setForm({ ...form, full_name: e.target.value })
                }
              />
              <input
                placeholder="Email"
                value={form.email}
                onChange={e =>
                  setForm({ ...form, email: e.target.value })
                }
              />
              <input
                placeholder="Department"
                value={form.department}
                onChange={e =>
                  setForm({ ...form, department: e.target.value })
                }
              />
            </div>
            <button className="primary" onClick={addEmployee}>
              Save Employee
            </button>
          </section>

          <section className="card slide-up">
            <h2>Employees</h2>
            {employees.length === 0 ? (
              <p className="muted">No employees added yet</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Department</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp.id}>
                      <td>{emp.employee_id}</td>
                      <td>{emp.full_name}</td>
                      <td>{emp.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}

      {/* MARK ATTENDANCE TAB */}
      {activeTab === "attendance" && (
        <section className="card slide-up">
          <h2>Mark Attendance</h2>
          <div className="form-grid">
            <input
              placeholder="Employee ID"
              onChange={e =>
                setAttendance({
                  ...attendance,
                  employee_id: e.target.value,
                })
              }
            />
            <input
              type="date"
              onChange={e =>
                setAttendance({ ...attendance, date: e.target.value })
              }
            />
            <select
              onChange={e =>
                setAttendance({ ...attendance, status: e.target.value })
              }
            >
              <option>Present</option>
              <option>Absent</option>
            </select>
          </div>
          <button className="secondary" onClick={markAttendance}>
            Submit Attendance
          </button>
        </section>
      )}

      {/* VIEW ATTENDANCE TAB */}
      {activeTab === "view" && (
        <section className="card slide-up">
          <h2>View Attendance Records</h2>

          <div className="form-grid">
            <input
              placeholder="Employee ID"
              onChange={e => setAttendanceEmpId(e.target.value)}
            />
          </div>

          <button className="secondary" onClick={fetchAttendance}>
            View Attendance
          </button>

          {attendanceRecords.length === 0 ? (
            <p className="muted" style={{ marginTop: "12px" }}>
              No attendance records found
            </p>
          ) : (
            <table style={{ marginTop: "15px" }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((rec, idx) => (
                  <tr key={idx}>
                    <td>{rec.date}</td>
                    <td>{rec.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}
    </div>
  );
}

