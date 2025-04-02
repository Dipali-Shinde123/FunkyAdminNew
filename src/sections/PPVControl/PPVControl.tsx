import { useState } from 'react';
import BasicTableOne from '../../components/tables/BasicTables/BasicTableOne';
import { Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface PPV {
  id: number;
  title: string;
  type: string;
  ticketPrice: string;
  status: string;
  eventDate: string;

}
const PPVListing = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([
    {
      id: 1,
      title: 'Live Concert',
      type: 'Live Event',
      ticketPrice: '$20',
      status: 'Published',
      eventDate: '2025-04-15',
    },
  ]);

  const handleEditRow = (ppvItem: PPV) => {
    navigate(`/PPV/Edit-ppv/${ppvItem.id}`);
  };

  const handleDeleteRow = (id : any) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setTableData((prevData) => prevData.filter((ppv) => ppv.id !== id));
    }
  };

  const formattedTableData = tableData.map((ppv) => [
    ppv.title,
    ppv.type,
    ppv.ticketPrice,
    ppv.status,
    ppv.eventDate,
    <div className="flex gap-2" key={ppv.id}>
      <button onClick={() => handleEditRow(ppv)} className="text-blue-500">
        <Edit />
      </button>
      <button onClick={() => handleDeleteRow(ppv.id)} className="text-red-500">
        <Trash2 />
      </button>
    </div>
  ]);

  return (
    <div>
      <BasicTableOne
        tableData={formattedTableData}
        tableHeadings={['Title', 'Type', 'Ticket Price', 'Status', 'Event Date', 'Action']}
        searchQuery=""
        setSearchQuery={() => {}}
        selectedFilter=""
        setSelectedFilter={() => {}}
        searchColumns={['title', 'type']}
        showFilter={true}
      />
    </div>
  );
};

export default PPVListing;
