import { useState, FormEvent } from 'react';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';
import Button from '../../components/ui/button/Button';
import { useSnackbar } from 'notistack';
import Select from '../../components/form/Select';


const AddRewardsForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    amount: '',
    reason: '',
    paymentDetails: '',
    status: 'Pending',
    username: '',
    superadminApproval: 'Pending',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string) => {
    if (typeof e === "string") {
      setFormData((prevData) => ({
        ...prevData,
        superadminApproval: e, 
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.amount || !formData.reason || !formData.paymentDetails || !formData.username) {
      enqueueSnackbar('Please fill in all required fields', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Reward Added Successfully! Waiting for Superadmin Approval.', { variant: 'success' });
    setFormData({ amount: '', reason: '', paymentDetails: '', status: 'Pending', username: '', superadminApproval: 'Pending' });
  };

  return (
    <div>
      <div className="heading pb-4">Add Reward</div>
      <form onSubmit={handleSubmit}>
        <div className="input-fields grid gap-3">
          <Label htmlFor="username" required>Username</Label>
          <Input type="text" id="username" name="username" placeholder="Enter Username" value={formData.username} onChange={handleInputChange} />
          
          <Label htmlFor="amount" required>Amount</Label>
          <Input type="number" id="amount" name="amount" placeholder="Enter amount" value={formData.amount} onChange={handleInputChange} />
          
          <Label htmlFor="reason" required>Reason</Label>
          <Input type="text" id="reason" name="reason" placeholder="Enter reason" value={formData.reason} onChange={handleInputChange} />
          
          <Label htmlFor="paymentDetails" required>Payment Details</Label>
          <Input type="text" id="paymentDetails" name="paymentDetails" placeholder="Enter payment details" value={formData.paymentDetails} onChange={handleInputChange} />
          
          <Label htmlFor="superadminApproval">Superadmin Approval</Label>
          <Select
             id="superadminApproval"
              name="superadminApproval"
            label="Superadmin Approval"  
               value={formData.superadminApproval}
             onChange={(value) => handleInputChange(value)}
           options={[
            { label: 'Pending', value: 'Pending' },
               { label: 'Approved', value: 'Approved' },
            ]}
          />
          {/* <Button type="submit" size="sm" variant="primary">Add Reward</Button> */}
        </div>
        <div className='col-span-12 text-center mt-7'>
                    <Button type='submit' size="sm" variant="primary">Add Reword</Button>
                  </div>
      </form>
    </div>
  );
};

export default AddRewardsForm;
