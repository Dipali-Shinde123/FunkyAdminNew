import { useEffect, useState } from 'react';
import BasicTableOne from '../../components/tables/BasicTables/BasicTableOne';
import { useGetUsers } from '../../api/dashboard/user';
import { Trash2, Edit, Eye } from 'lucide-react';
import { deleter, endpoints, poster } from '../../utils/axios-dashboard';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

interface User {
  fullName: string;
  email: string;
  image_url: string;
  phone: string;
  type: string;
  id: string;
  status: string;
}

const Users = () => {
  const { users, usersLoading, mutate: mutateUsers } = useGetUsers();
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const handleEditRow = (user: any) => {
    navigate(`/user/edit/${user.id}`);
  };

  const handleViewProfile = (user: any) => {
    navigate(`/profile/${user.id}`);
  };

  const handleDeleteRow = async (id: string | number) => {
    try {
      const url = `${endpoints.users.delete}/${id}`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const response = await deleter(url, headers);
      if (response.status === 'success') {
        enqueueSnackbar('User deleted successfully!', { variant: 'success' });
        mutateUsers();
      } else {
        enqueueSnackbar(response.message || 'Failed to delete user.', { variant: 'error' });
      }
    } catch (err) {
      enqueueSnackbar('Network error while deleting user.', { variant: 'error' });
    }
  };

  const handleStatusUpdate = async (id: string | number, status: 'activate' | 'suspend' | 'block' | 'reward') => {
    try {
      setLoading(true);
      const url = `${endpoints.users.blockUnblock}/${id}`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const response = await poster(url, { status }, headers);

      if (response.status === 'success') {
        enqueueSnackbar(`User ${status}d successfully!`, { variant: 'success' });

        if (status === 'activate' || status === 'reward') {
          enqueueSnackbar('Superadmin notified for approval.', { variant: 'info' });
        }

        mutateUsers();
      } else {
        enqueueSnackbar(response.message || 'Failed to update status.', { variant: 'error' });
      }
    } catch (err) {
      enqueueSnackbar('Error updating user status.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users?.data?.filter((user: User) => {
    const matchSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchFilter = selectedFilter === 'all' ||
      (selectedFilter === 'creator' && user.type === 'Creator') ||
      (selectedFilter === 'advertiser' && user.type === 'Advertiser') ||
      (selectedFilter === 'suspended' && user.status === 'suspend') ||
      (selectedFilter === 'blocked' && user.status === 'block');

    return matchSearch && matchFilter;
  });

  useEffect(() => {
    if (filteredUsers) {
      const updatedTableData = filteredUsers.map((user: User) => [
        user.fullName,
        user.email,
        user.image_url,
        user.phone,
        user.type,
        (
          <div className="flex gap-2">
            <button onClick={() => handleEditRow(user)} className="text-blue-500"><Edit /></button>
            <button onClick={() => handleViewProfile(user)} className="text-green-500"><Eye /></button>
            <button onClick={() => handleDeleteRow(user.id)} className="text-red-500"><Trash2 /></button>
          </div>
        ),
        (
          <select
            disabled={loading}
            className="border px-2 py-1 rounded-md"
            onChange={(e) => handleStatusUpdate(user.id, e.target.value as any)}
            defaultValue=""
          >
            <option value="" disabled>Status</option>
            <option value="activate">Activate</option>
            <option value="suspend">Suspend</option>
            <option value="block">Block</option>
            <option value="reward">Reward</option>
          </select>
        )
      ]);
      setTableData(updatedTableData);
    }
  }, [filteredUsers, loading]);

  const tableHeadings = ['User', 'Email', 'Profile Picture', 'Phone', 'Role', 'Actions', 'Status'];

  if (usersLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or email"
          className="border px-4 py-2 rounded-md w-64"
        />
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="border px-4 py-2 rounded-md"
        >
          <option value="all">All</option>
          <option value="creator">Creators</option>
          <option value="advertiser">Advertisers</option>
          <option value="suspended">Suspended</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>
      <BasicTableOne
        tableData={tableData}
        tableHeadings={tableHeadings}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        searchColumns={['fullName', 'email']}
        showFilter={true}
      />
    </div>
  );
};

export default Users;
