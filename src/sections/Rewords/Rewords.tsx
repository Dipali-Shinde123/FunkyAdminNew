import { useState } from 'react';
import BasicTableOne from '../../components/tables/BasicTables/BasicTableOne';
import { Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const RewardsListing = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([
    {
      id: 1,
      amount: '100',
      reason: 'Referral Bonus',
      paymentDetails: 'Stripe - Paid',
      status: 'Approved',
      claimed: 'Yes',
      unsettled: 'No',
      superadminApproval: 'Pending',
      created_at: '2025-04-01',
    },
  ]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [selectedFilter, setSelectedFilter] = useState('');
  
  const handleEditRow = (reward: any) => {
    navigate(`/rewards/edit/${reward.id}`);
  };

  const handleDeleteRow = (id: any) => {
    if (window.confirm('Are you sure you want to delete this reward?')) {
      setTableData((prevData) => prevData.filter((reward) => reward.id !== id));
    }
  };

  const formattedTableData = tableData.map((reward) => [
    reward.amount,
    reward.reason,
    reward.paymentDetails,
    reward.status,
    reward.claimed,
    reward.unsettled,
    reward.superadminApproval,
    reward.created_at,
    <div className="flex gap-2" key={reward.id}>
      <button onClick={() => handleEditRow(reward)} className="text-blue-500">
        <Edit />
      </button>
      <button onClick={() => handleDeleteRow(reward.id)} className="text-red-500">
        <Trash2 />
      </button>
    </div>
  ]);

  return (
    <div>
      
      <BasicTableOne
        tableData={formattedTableData}
        tableHeadings={['Amount', 'Reason', 'Payment Details', 'Status', 'Claimed', 'Unsettled', 'Superadmin Approval', 'Created At', 'Action']}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        searchColumns={['amount', 'reason', 'paymentDetails']}
        showFilter={false}
      />
    </div>
  );
};

export default RewardsListing;
