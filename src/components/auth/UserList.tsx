import React, { useEffect, useState } from "react";

interface User {
  id: number;
  fullName: string;
  type: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://namahsoftech.com/funky_app/api/admin/user/list", {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data.users || [])) 
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <ul className="bg-white p-4 rounded-lg shadow-md">
        {users.map((user: User) => (
          <li 
            key={user.id} 
            className="p-2 border-b border-gray-300 last:border-none text-lg"
          >
            <span className="text-red-500 font-bold">ID:</span> {user.id} {" "}
            <span className="text-red-500 font-bold">Full Name:</span> {user.fullName} {" "}
            <span className="text-red-500 font-bold">Type:</span> {user.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
