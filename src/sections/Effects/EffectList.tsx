import { useState } from 'react';
import BasicTableOne from '../../components/tables/BasicTables/BasicTableOne';
import { Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
interface Effect {
    id: number
}

const EffectsListing = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [effectsData, setEffectsData] = useState([
    {
      id: 1,
      name: 'Cool Sticker',
      type: 'Sticker',
      visibility: 'Creator',
      location: 'Photos',
      uploaded_at: '2025-04-02',
    },
  ]);

  const handleEdit = (effectItem: Effect) => {
    navigate(`/Effect/edit-effect/${effectItem.id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this effect?')) {
      setEffectsData((prev) => prev.filter((effectItem) => effectItem.id !== id));
      enqueueSnackbar('Effect deleted successfully', { variant: 'success' });
    }
  };
  

  const formattedTableData = effectsData.map((effect) => [
    effect.name,
    effect.type,
    effect.visibility,
    effect.location,
    effect.uploaded_at,
    <div className="flex gap-2" key={effect.id}>
      <button onClick={() => handleEdit(effect)} className="text-blue-500">
        <Edit />
      </button>
      <button onClick={() => handleDelete(effect.id)} className="text-red-500">
        <Trash2 />
      </button>
    </div>,
  ]);

  return (
    <div>
      <BasicTableOne
        tableData={formattedTableData}
        tableHeadings={['Name', 'Type', 'Visibility', 'Location', 'Uploaded At', 'Actions']}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        searchColumns={['name', 'type']}
        showFilter={true}
      />
    </div>
  );
};

export default EffectsListing;
