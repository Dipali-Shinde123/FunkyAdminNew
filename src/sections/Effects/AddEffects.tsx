import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import DropzoneComponent from '../../components/form/form-elements/DropZone';
import Select from '../../components/form/Select';
import Button from '../../components/ui/button/Button';
import Input from '../../components/form/input/InputField';
import Label from '../../components/form/Label';

const AddEffect = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Effects',
    visibility: 'Creator',
    location: 'LIVE',
    file: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = (file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      file,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.file) {
      enqueueSnackbar('Please upload a file!', { variant: 'warning' });
      return;
    }
    enqueueSnackbar('Effect added successfully!', { variant: 'success' });
    navigate('/Effect/effect-list');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Label htmlFor="name" required>Effect Name</Label>
        <Input type="text" id="name" name="name" placeholder="Enter Effect Name" value={formData.name} onChange={handleInputChange} />

        <Label htmlFor="category">Category</Label>
        <Select
        label='Category'
          id="category"
          name="category"
          value={formData.category}
          onChange={(value) => handleSelectChange("category", value)}
          options={[
            { label: 'Effects', value: 'Effects' },
            { label: 'Stickers', value: 'Stickers' },
            { label: 'Emoji', value: 'Emoji' },
            { label: 'Filters', value: 'Filters' },
          ]}
        />

        <Label htmlFor="visibility">Visibility</Label>
        <Select
        label='Visibility'
          id="visibility"
          name="visibility"
          value={formData.visibility}
          onChange={(value) => handleSelectChange("visibility", value)}
          options={[
            { label: 'Creator', value: 'Creator' },
            { label: 'Advertiser', value: 'Advertiser' },
            { label: 'Both', value: 'Both' },
            { label: 'None', value: 'None' },
          ]}
        />

        <Label htmlFor="location">Location</Label>
        <Select
        label='Location'
          id="location"
          name="location"
          value={formData.location}
          onChange={(value) => handleSelectChange("location", value)}
          options={[
            { label: 'LIVE', value: 'LIVE' },
            { label: 'Photos', value: 'Photos' },
            { label: 'Chronicles', value: 'Chronicles' },
            { label: 'Videos', value: 'Videos' },
            { label: 'All', value: 'All' },
          ]}
        />

        <Label>Upload Effect File</Label>
        <DropzoneComponent value={formData.file} onChange={handleFileUpload} />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddEffect;
