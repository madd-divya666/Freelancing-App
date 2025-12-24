import React, { useEffect, useState } from "react";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  // ---------------- FETCH USERS ----------------
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/auth/users");

      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">All Users</h3>

      {users.length === 0 ? (
        <p className="text-muted text-center">No users found</p>
      ) : (
        <div className="row g-4">
          {users.map((user) => (
            <div className="col-md-6 col-lg-4" key={user._id}>
              <div className="card shadow-sm border-0 rounded-4 h-100">
                <div className="card-body">
                  <h6 className="fw-bold mb-2">{user.username}</h6>

                  <p className="mb-1">
                    <b>Email:</b> {user.email}
                  </p>

                  <p className="mb-1">
                    <b>User ID:</b>{" "}
                    <small className="text-muted">{user._id}</small>
                  </p>

                  <span
                    className={`badge mt-2 ${
                      user.usertype === "admin"
                        ? "bg-dark"
                        : user.usertype === "client"
                        ? "bg-primary"
                        : "bg-success"
                    }`}
                  >
                    {user.usertype}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
