import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import Select from '../../components/form/Select'; // Adjust the path based on your structure
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';
import Button from '../../components/ui/button/Button';

const UserEdit = () => {
//   const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    userType: 'Creator',
    status: 'active',
    country: 'USA',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string, field: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    enqueueSnackbar('User updated successfully!', { variant: 'success' });
    navigate('/users');
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold center mb-4">Edit User</h1>
      <form onSubmit={handleSubmit}>
        <Label className="block mb-2">Name:</Label>
        <Input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          className="border p-2 w-full mb-4"
        />

        <Label className="block mb-2">Email:</Label>
        <Input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          className="border p-2 w-full mb-4"
        />

        <Label className="block mb-2">User Type:</Label>
        <Select
          label="User Type"
          name="userType"
          id="userType"
          value={userData.userType}
          onChange={(value) => handleSelectChange(value, 'userType')}
          options={[
            { label: 'Creator', value: 'Creator' },
            { label: 'Advertiser', value: 'Advertiser' },
            { label: 'Kids', value: 'Kids' },
          ]}
          className="mb-4"
        />

        <Label className="block mb-2">Status:</Label>
        <Select
          label="Status"
          name="status"
          id="status"
          value={userData.status}
          onChange={(value) => handleSelectChange(value, 'status')}
          options={[
            { label: 'Activate', value: 'active' },
            { label: 'Suspend', value: 'suspend' },
            { label: 'Block', value: 'block' },
          ]}
          className="mb-4"
        />

        <Label className="block mb-2">Country:</Label>
        <Input
          type="text"
          name="country"
          value={userData.country}
          onChange={handleInputChange}
          className="border p-2 w-full mb-4"
        />

        <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default UserEdit;
