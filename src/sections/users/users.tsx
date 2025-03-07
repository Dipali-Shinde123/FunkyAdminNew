import { useEffect, useState } from 'react';
import BasicTableOne from '../../components/tables/BasicTables/BasicTableOne';
import { useGetUsers } from '../../api/dashboard/user';
import { Trash2 } from 'lucide-react';
import { deleter, endpoints, poster } from '../../utils/axios-dashboard';
import { useSnackbar } from 'notistack';

interface User {
  fullName: string;
  email: string;
  image_url: string;
  phone: string;
  type: string;
  id: string;
  blockUnblock: string;
}

const Users = () => {
  const { users, usersLoading, mutate: mutateUsers } = useGetUsers();
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // State for search query and filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  const handleDeleteRow = async (id: string | number) => {
    try {
      const url = `${endpoints.users.delete}/${id}`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };

      const response = await deleter(url, headers);

      if (response.status === 'success') {
        enqueueSnackbar('User Deleted successfully!', { variant: 'success' });
        mutateUsers(); // Refresh users after deletion
      } else if (response.status === 'error' && response.message) {
        enqueueSnackbar(response.message, { variant: 'error' });
        console.log(response.message);
      } else {
        enqueueSnackbar('An unexpected error occurred.', { variant: 'error' });
      }
    } catch (error) {
      console.error('Network error or unexpected failure:', error);
      enqueueSnackbar('Failed to delete user. Please try again.', { variant: 'error' });
    }
  };

  const handleBlockUnblock = async (id: string | number) => {
    try {
      setLoading(true);
      const url = `${endpoints.users.blockUnblock}/${id}`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const response = await poster(url, "", headers);

      if (response.status === 'success') {
        enqueueSnackbar('Status Updated successfully!', { variant: 'success' });
        mutateUsers(); // Refresh or update the user list after the update
      } else if (response.status === 'error' && response.message) {
        enqueueSnackbar(response.message, { variant: 'error' });
        console.log(response.message); // Log error message if available
      } else {
        enqueueSnackbar('An unexpected error occurred.', { variant: 'error' });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Failed to update the status. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (users?.data) {
      const updatedTableData = users?.data.map((user: User) => [
        user.fullName,
        user.email,
        user.image_url,
        user.phone,
        user.type,
        (
          <div className="flex gap-2">
            <button type="button" onClick={() => handleDeleteRow(user.id)} className="text-red-500 hover:text-red-700">
              <Trash2 />
            </button>
          </div>
        ),
        <button
          type="button"
          onClick={() => handleBlockUnblock(user.id)}
          className="bg-blue-600 text-white hover:bg-blue-700 w-16 h-8 rounded-md"
          disabled={loading}  // Disable the button while loading
        >
          {loading ? "Changing..." : user.blockUnblock}  {/* Show "Changing..." during loading */}
        </button>
      ]);
      setTableData(updatedTableData);
    }
  }, [users]);

  const tableHeadings = ['User', 'Email', 'Profile Picture', 'Phone', 'Role', 'Action', 'User Status'];

  // Show loading spinner if users are still loading
  if (usersLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BasicTableOne 
        tableData={tableData} 
        tableHeadings={tableHeadings} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        selectedFilter={selectedFilter} 
        setSelectedFilter={setSelectedFilter}
        searchColumns={['fullName', 'email']}  // Search across name and email columns
        showFilter={true}
      />
    </div>
  );
};

export default Users;