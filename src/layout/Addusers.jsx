import React, { useState } from "react";

const AddUser = () => {
  const [formData, setFormData] = useState({ type: "", fullName: "", userName: "", email: "", password: "", phone: "", gender: "", location: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://namahsoftech.com/funky_app/api/admin/user-create", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("User added successfully!");
    } else {
      alert("Error adding user.");
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <select name="type" onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Creator">Creator</option>
          <option value="Advertiser">Advertiser</option>
          <option value="Kids">Kids</option>
        </select>
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
        <input type="text" name="userName" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
        <input type="text" name="gender" placeholder="Gender" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
