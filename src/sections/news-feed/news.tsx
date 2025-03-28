import { useEffect, useState } from 'react';
import BasicTableOne from '../../components/tables/BasicTables/BasicTableOne';
import { Trash2, Edit } from 'lucide-react';
import { deleter, endpoints } from '../../utils/axios-dashboard';
import { useSnackbar } from 'notistack';
import { useGetNews } from '../../api/dashboard/news';
import { useNavigate } from 'react-router-dom'; // ✅ New

interface News {
  title: string;
  description: string;
  coverImage: string | File;
  uploadVideo: string | File;
  created_at: string;
  id: number;
}

const NewsPage = () => {
  const { news, newsLoading, mutate: mutateNews } = useGetNews();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate(); // ✅ New

  const [tableData, setTableData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleEditRow = (newsItem: News) => {
    navigate(`/news/edit-news/${newsItem.id}`); // ✅ Navigate to edit page
  };

  const handleDeleteRow = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      try {
        const url = `${endpoints.news.delete}/${id}`;
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        const response = await deleter(url, headers);

        if (response.status === 'success') {
          enqueueSnackbar('News Deleted successfully!', { variant: 'success' });
          mutateNews();
        } else {
          enqueueSnackbar(response.message || 'Failed to delete news.', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Failed to delete news.', { variant: 'error' });
      }
    }
  };

  useEffect(() => {
    if (news?.data) {
      const updatedTableData = news.data.map((newsItem: News) => [
        <div className="text-sm whitespace-normal break-words max-w-[200px] sm:max-w-[50px] md:max-w-[300px]">{newsItem.title}</div>,
        <div className="text-sm whitespace-normal break-words max-w-[250px] sm:max-w-[50px] md:max-w-[400px]">{newsItem.description}</div>,
        newsItem.coverImage ? <img src={typeof newsItem.coverImage === 'string' ? newsItem.coverImage : URL.createObjectURL(newsItem.coverImage)} className="w-20 h-20" alt="Cover" /> : 'No Image',
        newsItem.uploadVideo ? (
          <video controls className="w-20 h-20">
            <source src={typeof newsItem.uploadVideo === 'string' ? newsItem.uploadVideo : URL.createObjectURL(newsItem.uploadVideo)} type="video/mp4" />
          </video>
        ) : 'No Video',
        newsItem.created_at,
        <div className="flex gap-2" key={newsItem.id}>
          <button onClick={() => handleEditRow(newsItem)} className="text-blue-500">
            <Edit />
          </button>
          <button onClick={() => handleDeleteRow(newsItem.id)} className="text-red-500">
            <Trash2 />
          </button>
        </div>
      ]);
      setTableData(updatedTableData);
    }
  }, [news]);

  if (newsLoading) {
    return <p className="text-center text-gray-500">Loading news...</p>;
  }

  return (
    <div>
      <BasicTableOne
        tableData={tableData}
        tableHeadings={['Title', 'Description', 'Cover Image', 'Video', 'Created At', 'Action']}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        searchColumns={['title', 'description']}
        showFilter={false}
      />
    </div>
  );
};

export default NewsPage;
