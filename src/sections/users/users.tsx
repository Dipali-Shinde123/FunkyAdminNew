import { useEffect, useState } from 'react';
import BasicTableOne from '../../components/tables/BasicTables/BasicTableOne';
import { useGetUsers, useBlockUnblockUser } from '../../api/dashboard/user';
import { Trash2, Edit, Eye } from 'lucide-react';
import { deleter, endpoints } from '../../utils/axios-dashboard';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import Select from '../../components/form/Select';

interface User {
  fullName: string;
  email: string;
  image_url: string;
  phone: string;
  type: string;
  id: string;
  blockUnblock: string;
  location?: string;
}

const Users = () => {
  const { users, usersLoading, mutate: mutateUsers } = useGetUsers();
  const { blockUnblockUser } = useBlockUnblockUser();
  const [tableData, setTableData] = useState<any[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [userStatusMap, setUserStatusMap] = useState<Record<string, string>>({});

  const handleEditRow = (user: any) => navigate(`/users/edit-user/${user.id}`);
  const handleViewProfile = (user: any) => navigate(`/profile/${user.id}`);

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

  const handleStatusUpdate = async (
    id: string | number,
    status: 'block' | 'active' | 'suspend' | 'reward' | 'unblock'
  ) => {
    if (status === 'unblock') {
      status = 'active';
    }
  
    if (['block', 'suspend', 'reward'].includes(status)) {
      const reason = prompt(`Enter reason for ${status}:`);
      if (!reason) {
        enqueueSnackbar('Action cancelled. Reason required.', { variant: 'warning' });
        return;
      }
    }
  
    if (status === 'active' || status === 'reward') {
      enqueueSnackbar('Superadmin approval required. Notification sent.', { variant: 'info' });
      return;
    }
  
    setUserStatusMap(prev => ({
      ...prev,
      [id]: status,
    }));
  
    const response = await blockUnblockUser(String(id), status);
  
    if (response.success) {
      if (['suspend', 'block', 'reward'].includes(status)) {
        enqueueSnackbar(`Notification sent to user about being ${status}.`, { variant: 'info' });
      }
      mutateUsers();
    }
  };
  

  useEffect(() => {
    if (users?.data) {
      const map: Record<string, string> = {};
      users.data.forEach((user: any) => {
        map[user.id] = user.blockUnblock?.toLowerCase() || 'active';
      });
      setUserStatusMap(map);
    }
  }, [users]);

  useEffect(() => {
    if (users?.data) {
      const filtered = users.data.filter((user: User) => {
        const nameMatch = (user.fullName?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        const emailMatch = (user.email?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        const matchSearch = nameMatch || emailMatch;

        const userType = (user.type || '').toLowerCase();
        const userBlockStatus = (user.blockUnblock || '').toLowerCase();

        const matchFilter =
          selectedFilter === 'all' ||
          (selectedFilter === 'creator' && userType === 'creator') ||
          (selectedFilter === 'advertiser' && userType === 'advertiser') ||
          (selectedFilter === 'suspended' && userBlockStatus === 'suspend') ||
          (selectedFilter === 'block' && userBlockStatus === 'block') ||
          (selectedFilter === 'unblock' && userBlockStatus === 'unblock') ||
          (selectedFilter === 'active' && userBlockStatus === 'active') ||
          (selectedFilter === 'reward' && userBlockStatus === 'reward');

        return matchSearch && matchFilter;
      });

      const updatedTableData = filtered.map((user: User) => [
        user.fullName,
        user.email,
        user.image_url,
        user.phone,
        user.location || 'N/A',
        user.type,
        (
          <div className="flex gap-2">
            <button onClick={() => handleEditRow(user)} className="text-blue-500"><Edit /></button>
            <button onClick={() => handleViewProfile(user)} className="text-green-500"><Eye /></button>
            <button onClick={() => handleDeleteRow(user.id)} className="text-red-500"><Trash2 /></button>
          </div>
        ),
        (
          <Select
            label="Status"
            name={`status-${user.id}`}
            id={`status-${user.id}`}
            value={userStatusMap[user.id] || 'active'}
            onChange={(value) =>
              handleStatusUpdate(user.id, value as 'block' | 'active' | 'suspend' | 'reward')
            }
            options={[
              { label: 'Activate', value: 'active' },
              { label: 'Suspend', value: 'suspend' },
              { label: 'Block', value: 'block' },
              { label: 'Reward', value: 'reward' },
            ]}
          />
        )
      ]);
      setTableData(updatedTableData);
    }
  }, [users, searchQuery, selectedFilter]);

  const tableHeadings = ['User', 'Email', 'Profile Picture', 'Phone', 'Country', 'Role', 'Actions', 'Status'];

  if (usersLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
