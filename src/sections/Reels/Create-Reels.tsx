import * as React from 'react';
import { useState, FormEvent } from 'react';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';
import DropzoneComponent from '../../components/form/form-elements/DropZone';
import Button from '../../components/ui/button/Button';
import { useSnackbar } from 'notistack';

const AddReel = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isActive, setIsActive] = useState('1');

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null as File | null,
    video: null as File | null,
    startDate: "",
    endDate: "",
    status: "Active"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = (fileType: 'thumbnail' | 'video', file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      [fileType]: file,
    }));
  };

  const handleReelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requiredFields = ['title', 'description', 'thumbnail', 'video', 'startDate', 'endDate'];
    const isFormValid = requiredFields.every((field) => formData[field as keyof typeof formData] !== "" && formData[field as keyof typeof formData] !== null);
    
    if (!isFormValid) {
      enqueueSnackbar("Please fill in all required fields", { variant: 'error' });
      return;
    }
    
    enqueueSnackbar("Reel Created Successfully!", { variant: 'success' });
    setFormData({
      title: "",
      description: "",
      thumbnail: null,
      video: null,
      startDate: "",
      endDate: "",
      status: "Active"
    });
  };

  return (
    <div>
      <div className="heading">Add Reel</div>
      <form onSubmit={handleReelSubmit}>
        <div className="input-fields mt-5 grid grid-cols-12 gap-3">
          <div className="col-span-12">
            <Label htmlFor="title" required={true}>Reel Title</Label>
            <Input type="text" id="title" name="title" placeholder="Enter reel title" value={formData.title} onChange={handleInputChange} />
          </div>

          <div className="col-span-12">
            <Label htmlFor="description" required={true}>Description</Label>
            <Input type="text" id="description" name="description" placeholder="Enter description" value={formData.description} onChange={handleInputChange} />
          </div>

          <div className="col-span-12">
            <Label htmlFor="thumbnail" required={true}>Thumbnail</Label>
            <DropzoneComponent 
              value={formData.thumbnail} 
              onChange={(file) => handleFileUpload('thumbnail', file)} 
            />
          </div>

          <div className="col-span-12">
            <Label htmlFor="video" required={true}>Reel Video</Label>
            <DropzoneComponent 
              value={formData.video}
              onChange={(file) => handleFileUpload('video', file)}
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

          <div className='col-span-12 text-center'>
            <Button type='submit' size="sm" variant="primary">Add Reel</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddReel;
