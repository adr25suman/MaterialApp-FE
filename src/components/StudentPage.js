import React from "react";
import { useNavigate } from "react-router-dom";
import Materialst from "./Materialst";

function StudentPage({ email }) {
  const subjectData = [
    { subject: "Math", teacher: "Teacher A" },
    { subject: "Science", teacher: "Teacher B" },
    { subject: "History", teacher: "Teacher C" },
    { subject: "English", teacher: "Teacher D" },
    { subject: "Art", teacher: "Teacher E" },
  ];
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    navigate("/");
  };

  const navigatetoMaterials = (teacher) => {
    navigate(`/materialsstudent?teacher=${encodeURIComponent(teacher)}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="border rounded-lg p-4"
        style={{ width: "600px", height: "auto" }}
      >
        <h2 className="mb-4 text-center">Welcome to Student Page</h2>

        <p className="text-center">You are logged in successfully.</p>

        {/* Your Exact Table */}
        <table>
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Teacher Name</th>
              <th>Button</th>
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

        {/* Logout Button */}
        <div className="text-center mt-4">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
