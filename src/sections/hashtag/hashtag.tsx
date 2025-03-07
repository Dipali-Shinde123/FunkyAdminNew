import { useEffect, useState } from 'react';
import BasicTableOne from '../../components/tables/BasicTables/BasicTableOne';
import { Trash2 } from 'lucide-react';
import { deleter, endpoints } from '../../utils/axios-dashboard';
import { useSnackbar } from 'notistack';
import { useGetHashtag } from '../../api/dashboard/hashtag';

interface Post {
  tagLine: string;
  description: string;
  address: string;
  postImage: string | null;
  coverImage: string | null;
  commentCount: number | null;
  shareCount: number | null;
  likes: number | null;
  viewsCount: number | null;
}

interface Hashtag {
  id: number;
  tagName: string;
  post: Post; // Nested post object
  user: {
    fullName: string;
  };
  created_at: string;
}

const HashtagPage = () => {
  const { hashtag, hashtagLoading } = useGetHashtag();
  const [tableData, setTableData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [selectedFilter, setSelectedFilter] = useState(''); // Filter by selected category or type (if needed)
  const { enqueueSnackbar } = useSnackbar();

  // Handle deletion of a hashtag item
  const handleDeleteRow = async (id: string | number) => {
    try {
      const url = `${endpoints.hashtag.delete}/${id}`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };

      const response = await deleter(url, headers);

      if (response.status === 'success') {
        enqueueSnackbar('Hashtag deleted successfully!', { variant: 'success' });
        // Refresh the hashtags list after deletion
      } else if (response.status === 'error' && response.message) {
        enqueueSnackbar(response.message, { variant: 'error' });
      } else {
        enqueueSnackbar('An unexpected error occurred.', { variant: 'error' });
      }
    } catch (error) {
      console.error('Network error or unexpected failure:', error);
      enqueueSnackbar('Failed to delete hashtag. Please try again.', { variant: 'error' });
    }
  };
console.log(hashtag)
  useEffect(() => {
    if (hashtag?.data) {
      const updatedTableData = hashtag.data.map((hashtagItem: Hashtag) => [
        hashtagItem.user.fullName, // User Name
        hashtagItem.tagName, // Tag Name
        hashtagItem.post.tagLine, // Tag Line
        hashtagItem.post.description, // Description
        hashtagItem.post.address, // Address
        hashtagItem.post.coverImage ? (
          <img src={hashtagItem.post.coverImage} alt="Cover" className="w-20 h-20 object-cover" />
        ) : (
          'No Image'
        ), // Cover Image
        hashtagItem.post.postImage ? (
          <img src={hashtagItem.post.postImage} alt="Post" className="w-20 h-20 object-cover" />
        ) : (
          'No Image'
        ), // Post Image
        hashtagItem.post.commentCount, // Comment Count
        hashtagItem.post.shareCount, // Share Count
        hashtagItem.post.likes, // Likes
        hashtagItem.post.viewsCount, // View Count
        (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleDeleteRow(hashtagItem.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 />
            </button>
          </div>
        ), // Action (View and Delete)
        hashtagItem.created_at, // Created Date
      ]);
      setTableData(updatedTableData);
    }
  }, [hashtag]);

  const tableHeadings = [
    'User Name',
    'Tag Name',
    'Tag Line',
    'Description',
    'Address',
    'Cover Image',
    'Post Image',
    'Comment Count',
    'Share Count',
    'Likes',
    'View Count',
    'Action',
    'Created Date',
  ];

  // Show loading spinner if hashtag data is still loading
  if (hashtagLoading) {
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
        searchColumns={['tagName', 'tagLine', 'description']} // Search in tagName, tagLine, and description columns
        showFilter={false}
      />
    </div>
  );
};

export default HashtagPage;