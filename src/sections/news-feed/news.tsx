import { useEffect, useState } from 'react';
import BasicTableOne from '../../components/tables/BasicTables/BasicTableOne';
import { Trash2, Edit } from 'lucide-react';
import { deleter, endpoints } from '../../utils/axios-dashboard';
import { useSnackbar } from 'notistack';
import { useGetNews, useUpdateNews } from '../../api/dashboard/news';

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
  const { updatenews } = useUpdateNews();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<News | null>(null);

  const handleEditRow = (newsItem: News) => {
    setEditData(newsItem);
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!editData) return;
    try {
      const formData = new FormData();
      formData.append('title', editData.title);
      formData.append('description', editData.description);
      
      if (editData.coverImage && typeof editData.coverImage !== 'string') {
        formData.append('coverImage', editData.coverImage);
      }
      if (editData.uploadVideo && typeof editData.uploadVideo !== 'string') {
        formData.append('uploadVideo', editData.uploadVideo);
      }

      const result = await updatenews(editData.id, formData);
      if (result.success) {
        enqueueSnackbar('News updated successfully!', { variant: 'success' });
        mutateNews();
        setEditModalOpen(false);
      } else {
        enqueueSnackbar(result.message, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Failed to update news.', { variant: 'error' });
    }
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

      {editModalOpen && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit News</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4 sm:text-sm"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />
            <textarea
              className="w-full p-2 border rounded mb-4 sm:text-sm"
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            />
            <label className="block text-gray-700">Cover Image:</label>
            {editData.coverImage && typeof editData.coverImage === 'string' && (
              <img src={editData.coverImage} className="w-full h-32 object-cover mb-4" alt="Cover" />
            )}
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border rounded mb-4"
              onChange={(e) => setEditData({ ...editData, coverImage: e.target.files?.[0] || editData.coverImage })}
            />
            <label className="block text-gray-700">Upload Video:</label>
            <input
              type="file"
              accept="video/*"
              className="w-full p-2 border rounded mb-4"
              onChange={(e) => setEditData({ ...editData, uploadVideo: e.target.files?.[0] || editData.uploadVideo })}
            />
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
