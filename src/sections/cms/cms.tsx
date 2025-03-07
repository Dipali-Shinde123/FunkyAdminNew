import { useEffect, useState } from 'react';
import BasicTableOne from '../../components/tables/BasicTables/BasicTableOne';
import { Trash2, EyeIcon } from 'lucide-react';
import { deleter, endpoints } from '../../utils/axios-dashboard';
import { useSnackbar } from 'notistack';
import { useGetNews } from '../../api/dashboard/news';

interface News {
  title: string;
  description: string;
  coverImage: string;
  image: string;
  uploadVideo: string;
  created_at: string;
  id: number;
  user: {
    id: number;
    fullName: string;
    userName: string;
  };
}

const CMSPage = () => {
  const { news, newsLoading, mutate: mutateNews } = useGetNews();
  const [tableData, setTableData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [selectedFilter, setSelectedFilter] = useState(''); // Filter by selected category or type (if needed)
  const { enqueueSnackbar } = useSnackbar();

  // Handle deletion of a news item
  const handleDeleteRow = async (id: string | number) => {
    try {
      const url = `${endpoints.news.delete}/${id}`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };

      const response = await deleter(url, headers);

      if (response.status === 'success') {
        enqueueSnackbar('News Deleted successfully!', { variant: 'success' });
        mutateNews(); // Refresh the news list after deletion
      } else if (response.status === 'error' && response.message) {
        enqueueSnackbar(response.message, { variant: 'error' });
      } else {
        enqueueSnackbar('An unexpected error occurred.', { variant: 'error' });
      }
    } catch (error) {
      console.error('Network error or unexpected failure:', error);
      enqueueSnackbar('Failed to delete news. Please try again.', { variant: 'error' });
    }
  };

  useEffect(() => {
    if (news?.data) {
      const updatedTableData = news.data.map((newsItem: News) => [
        newsItem.title,
        newsItem.description,
        newsItem.coverImage ? (
          <img src={newsItem.coverImage} alt="Cover" className="w-20 h-20 object-cover" />
        ) : (
          'No Image'
        ),
        newsItem.uploadVideo ? (
          <video controls className="w-20 h-20 object-cover">
            <source src={newsItem.uploadVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          'No Video'
        ),
        newsItem.created_at,
        (
          <div className="flex gap-2">
            <button type="button" className="text-primary hover:text-blue-900">
              <EyeIcon />
            </button>
            <button
              type="button"
              onClick={() => handleDeleteRow(newsItem.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 />
            </button>
          </div>
        ),
      ]);
      setTableData(updatedTableData);
    }
  }, [news]);

  const tableHeadings = ['Title', 'Description', 'Cover Image', 'Video', 'Created At', 'Action'];

  // Show loading spinner if news data is still loading
  if (newsLoading) {
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
        searchColumns={['title']} // Search in title and description columns
        showFilter={false}
      />
    </div>
  );
};

export default CMSPage;