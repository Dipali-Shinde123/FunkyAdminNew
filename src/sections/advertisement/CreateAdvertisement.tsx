import * as React from 'react';
import { useState, FormEvent } from 'react';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';
import DropzoneComponent from '../../components/form/form-elements/DropZone';
import Button from '../../components/ui/button/Button';
import { useSnackbar } from 'notistack';


const CreateAdvertisement = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isActive, setIsActive] = useState('1');

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brandLogo: null as File | null,
    bannerImage: null as File | null,
    startDate: "",
    endDate: "",
    status: "Active",
    headcountLimit: "",
    taxRate: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (imageType: 'brandLogo' | 'bannerImage', file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      [imageType]: file,
    }));
  };

  const handleAdSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requiredFields = ['title', 'description', 'brandLogo', 'bannerImage', 'startDate', 'endDate', 'taxRate'];
    const isFormValid = requiredFields.every((field) => formData[field as keyof typeof formData] !== "" && formData[field as keyof typeof formData] !== null);
    
    if (!isFormValid) {
      enqueueSnackbar("Please fill in all required fields", { variant: 'error' });
      return;
    }
    
    enqueueSnackbar("Advertisement Created Successfully!", { variant: 'success' });
    setFormData({
      title: "",
      description: "",
      brandLogo: null,
      bannerImage: null,
      startDate: "",
      endDate: "",
      status: "Active",
      headcountLimit: "",
      taxRate: ""
    });
  };

  return (
    <div>
      <div className="heading">Add Advertisement</div>
      <form onSubmit={handleAdSubmit}>
        <div className="input-fields mt-5 grid grid-cols-12 gap-3">
          <div className="col-span-12">
            <Label htmlFor="title" required={true}>Advertisement Title</Label>
            <Input type="text" id="title" name="title" placeholder="Enter advertisement title" value={formData.title} onChange={handleInputChange} />
          </div>

          <div className="col-span-12">
            <Label htmlFor="description" required={true}>Description</Label>
            <Input type="text" id="description" name="description" placeholder="Enter description" value={formData.description} onChange={handleInputChange} />
          </div>

          <div className="col-span-12">
            <Label htmlFor="brandLogo" required={true}>Brand Logo</Label>
            <DropzoneComponent 
  value={formData.brandLogo} 
  onChange={(file) => handleImageUpload('brandLogo', file)} 
  
/>
</div>

          <div className="col-span-12">
            <Label htmlFor="bannerImage" required={true}>Banner Image</Label>
            <DropzoneComponent 
            value={formData.bannerImage}
            onChange={(file)=> handleImageUpload('bannerImage' , file)}
            />
          </div>

          <div className="col-span-6">
            <Label htmlFor="startDate" required={true}>Start Date</Label>
            <Input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleInputChange} />
          </div>

          <div className="col-span-6">
            <Label htmlFor="endDate" required={true}>End Date</Label>
            <Input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleInputChange} />
          </div>

          <div className="col-span-6">
            <Label htmlFor="status">Status</Label>
            <select
              className="w-full p-2 border rounded"
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
              required
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          <div className="col-span-6">
            <Label htmlFor="taxRate" required={true}>Tax Rate (%)</Label>
            <Input type="number" id="taxRate" name="taxRate" placeholder="Enter tax rate" value={formData.taxRate} onChange={handleInputChange} />
          </div>

          <div className="col-span-6">
            <Label htmlFor="headcountLimit">Headcount Limit</Label>
            <Input type="number" id="headcountLimit" name="headcountLimit" placeholder="Enter headcount limit" value={formData.headcountLimit} onChange={handleInputChange} />
          </div>

          <div className='col-span-12 text-center'>
            <Button type='submit' size="sm" variant="primary">Add Advertisement</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAdvertisement;
