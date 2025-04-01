import { useState } from 'react';
import BasicTableOne from '../../components/tables/BasicTables/BasicTableOne';
import { Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdvertisementPage = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([
    {
      id: 1,
      title: 'Summer Sale Ad',
      description: 'Huge discounts on summer collection',
      brandLogo: 'https://via.placeholder.com/50',
      bannerImage: 'https://via.placeholder.com/100',
      startDate: '2025-06-01',
      endDate: '2025-06-30',
      status: 'Active',
      headcountLimit: 1000,
      taxRate: 15,
      created_at: '2025-04-01',
    },
  ]);

  const handleEditRow = (ad: any) => {
    navigate(`/advertisement/edit/${ad.id}`);
  };

  const handleDeleteRow = (id : any) => {
    if (window.confirm('Are you sure you want to delete this advertisement?')) {
      setTableData((prevData) => prevData.filter((ad) => ad.id !== id));
    }
  };

  const formattedTableData = tableData.map((ad) => [
    <div className="text-sm max-w-[200px]">{ad.title}</div>,
    <div className="text-sm max-w-[250px]">{ad.description}</div>,
    <img src={ad.brandLogo} className="w-12 h-12" alt="Brand Logo" />,
    <img src={ad.bannerImage} className="w-20 h-10" alt="Banner" />,
    ad.startDate,
    ad.endDate,
    ad.status,
    ad.headcountLimit,
    `${ad.taxRate}%`,
    ad.created_at,
    <div className="flex gap-2" key={ad.id}>
      <button onClick={() => handleEditRow(ad)} className="text-blue-500">
        <Edit />
      </button>
      <button onClick={() => handleDeleteRow(ad.id)} className="text-red-500">
        <Trash2 />
      </button>
    </div>
  ]);

  return (
    <div>
      <BasicTableOne
        tableData={formattedTableData}
        tableHeadings={['Title', 'Description', 'Brand Logo', 'Banner', 'Start Date', 'End Date', 'Status', 'Headcount', 'Tax Rate', 'Created At', 'Action']}
        searchQuery=""
        setSearchQuery={() => {}}
        selectedFilter=""
        setSelectedFilter={() => {}}
        searchColumns={['title', 'description']}
        showFilter={false}
      />
    </div>
  );
};

export default AdvertisementPage;
