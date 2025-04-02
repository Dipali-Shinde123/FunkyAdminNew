import { useState } from 'react';
import BasicTableOne from '../../components/tables/BasicTables/BasicTableOne';
import { Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const ReelsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); 
    const [selectedFilter, setSelectedFilter] = useState('');
  const [tableData, setTableData] = useState([
    {
      id: 1,
      title: 'Amazing Travel Reel',
      description: 'Experience the best travel destinations!',
      thumbnail: 'https://via.placeholder.com/50',
      video: 'https://via.placeholder.com/100',
      status: 'Active',
      created_at: '2025-04-01',
    },
  ]);
  const {enqueueSnackbar} = useSnackbar();

  const handleEditRow = (reel : any) => {
    navigate(`/reels/edit/${reel.id}`);
  };

  const handleDeleteRow = (id : any) => {
    if (enqueueSnackbar('Are you sure you want to delete this reel?')) {
      setTableData((prevData) => prevData.filter((reel) => reel.id !== id));
    }
  };

  const formattedTableData = tableData.map((reel) => [
    <div className="text-sm max-w-[200px]">{reel.title}</div>,
    <div className="text-sm max-w-[250px]">{reel.description}</div>,
    <img src={reel.thumbnail} className="w-12 h-12" alt="Thumbnail" />,
    <a href={reel.video} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Video</a>,
    reel.status,
    reel.created_at,
    <div className="flex gap-2" key={reel.id}>
      <button onClick={() => handleEditRow(reel)} className="text-blue-500">
        <Edit />
      </button>
      <button onClick={() => handleDeleteRow(reel.id)} className="text-red-500">
        <Trash2 />
      </button>
    </div>
  ]);

  return (
    <div>
      <BasicTableOne
        tableData={formattedTableData}
        tableHeadings={['Title', 'Description', 'Thumbnail', 'Video', 'Status', 'Created At', 'Action']}
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

export default ReelsPage;
