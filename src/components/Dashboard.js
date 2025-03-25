// WelcomeDashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"; // Import CSS file

function Dashboard({ email }) {
  const subjectData = [
    { subject: "Math", teacher: "Teacher A" },
    { subject: "Science", teacher: "Teacher B" },
    { subject: "History", teacher: "Teacher C" },
    { subject: "English", teacher: "Teacher D" },
    { subject: "Art", teacher: "Teacher E" },
  ];
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions here (e.g., clear session, remove authentication token)
    // After logout, redirect to the login page
    navigate("/");
  };

  const navigatetoMaterials = (teacher) => {
    navigate(`/materialsteacher?teacher=${encodeURIComponent(teacher)}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="border rounded-lg p-4"
        style={{ width: "500px", height: "400px" }}
      >
        <h1>Teacher Page</h1>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            {subjectData.map((item, index) => (
              <tr key={index}>
                <td>{item.subject}</td>
                <td>{item.teacher}</td>
                <button onClick={() => navigatetoMaterials(item.teacher)}>
                  教材を見ます
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
