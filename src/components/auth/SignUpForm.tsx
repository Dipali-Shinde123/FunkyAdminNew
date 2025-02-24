import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";



export default function AddUser() {
  const [showPassword, setShowPassword] = useState(false);
 
  const [formData, setFormData] = useState({
    type: "Creator",
    fullName: "",
    userName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    location: "",
    parentEmail: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL25hbWFoc29mdGVjaC5jb20vZnVua3lfYXBwL2FwaS9hZG1pbi9sb2dpbiIsImlhdCI6MTc0MDM4MzgxMiwiZXhwIjoxNzQwMzg3NDEyLCJuYmYiOjE3NDAzODM4MTIsImp0aSI6IlRTdjNISmN5NnlwZXY3Z1kiLCJzdWIiOiIxIiwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.MCw4wm4arQQdBwMD-m7QwWISV0eXVpcH8vI0gBSCplo";
    axios.post(
      "https://namahsoftech.com/funky_app/api/admin/user-create",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      )
    .then((response) => {
      alert(response.data.message || "User added successfully!");
      setFormData({
        type: "Creator",
        fullName: "",
        userName: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        location: "",
        parentEmail: "",
      });
    })
    .catch((error) => {
     console.log(error)
     alert("Error adding user.");
    })
    .finally(() => {
      setLoading(false);
    });
  } 

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500">
          <ChevronLeftIcon className="size-5" /> Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm">Add User</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Label>User Type</Label>
            <select name="type" value={formData.type} onChange={handleChange} className=" w-full border-radius-5" >
              <option value="Creator">Creator</option>
              <option value="Advertiser">Advertiser</option>
              <option value="Kids">Kids</option>
            </select>
            <Label>Full Name</Label>
            <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter full name" />
            <Label>Username</Label>
            <Input name="userName" value={formData.userName} onChange={handleChange} placeholder="Enter username" />
            <Label>Email</Label>
            <Input name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
            <Label>Password</Label>
            <div className="relative">
              <Input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="Enter password" />
              <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
                {showPassword ? <EyeIcon className="size-5" /> : <EyeCloseIcon className="size-5" />}
              </span>
            </div>
            <Label>Phone</Label>
            <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
            <Label>Gender</Label>
            <Input name="gender" value={formData.gender} onChange={handleChange} placeholder="Enter gender" />
            <Label>Location</Label>
            <Input name="location" value={formData.location} onChange={handleChange} placeholder="Enter location" />
            {formData.type === "Kids" && (
              <>
                <Label>Parent's Email</Label>
                <Input name="parentEmail" value={formData.parentEmail} onChange={handleChange} placeholder="Enter parent's email" />
              </>
            )}
            <button type="submit" className="w-full px-4 py-3 text-white bg-brand-500" disabled={loading}>
              {loading ? "Adding..." : "Add User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
