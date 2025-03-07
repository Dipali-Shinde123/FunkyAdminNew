import { useEffect, useState } from 'react';
import BasicTableOne from '../../components/tables/BasicTables/BasicTableOne';
import { Trash2 } from 'lucide-react';
import { deleter, endpoints } from '../../utils/axios-dashboard';
import { useSnackbar } from 'notistack';
import { useGetMusic } from '../../api/dashboard/music';

interface Music {
  id: number;
  song_name: string;
  artist_name: string;
  music_file: string;
  created_at: string;
  price: number;
  isActive: string;
}

const MusicPage = () => {
  const { music, musicLoading, mutate: mutateMusic } = useGetMusic();
  const [tableData, setTableData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [selectedFilter, setSelectedFilter] = useState(''); // Filter by selected category or type (if needed)
  const { enqueueSnackbar } = useSnackbar();

  // Handle deletion of a music item
  const handleDeleteRow = async (id: string | number) => {
    try {
      const url = `${endpoints.music.delete}/${id}`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };

      const response = await deleter(url, headers);

      if (response.status === 'success') {
        enqueueSnackbar('Music Deleted successfully!', { variant: 'success' });
        mutateMusic(); // Refresh the music list after deletion
      } else if (response.status === 'error' && response.message) {
        enqueueSnackbar(response.message, { variant: 'error' });
      } else {
        enqueueSnackbar('An unexpected error occurred.', { variant: 'error' });
      }
    } catch (error) {
      console.error('Network error or unexpected failure:', error);
      enqueueSnackbar('Failed to delete music. Please try again.', { variant: 'error' });
    }
  };

  useEffect(() => {
    if (music?.data) {
      const updatedTableData = music.data.map((musicItem: Music) => [
        musicItem.song_name,
        musicItem.artist_name,
        musicItem.price,
        musicItem.isActive === "1" ? "Active" : "Inactive",
        musicItem.created_at,
        (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleDeleteRow(musicItem.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 />
            </button>
          </div>
        ),
        // Music Preview: Add an audio player for the music file
        <audio controls className="w-20 h-20 object-cover">
          <source src={musicItem.music_file} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      ]);
      setTableData(updatedTableData);
    }
  }, [music]);

  const tableHeadings = ['Song Name', 'Artist Name', 'Price', 'Status', 'Created At', 'Action', 'Music File Preview'];

  // Show loading spinner if music data is still loading
  if (musicLoading) {
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
        searchColumns={['song_name', 'artist_name']} // Search in song_name and artist_name columns
        showFilter={false}
      />
    </div>
  );
};

export default MusicPage;