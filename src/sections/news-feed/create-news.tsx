import * as React from 'react';
import { useState, FormEvent } from 'react';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';
import DropzoneComponent from '../../components/form/form-elements/DropZone';
import Button from '../../components/ui/button/Button';
import { useSnackbar } from 'notistack';
import { useCreateNews } from '../../api/dashboard/news';
import VideoDropzoneComponent from '../../components/form/form-elements/VideoDropZone';

const CreateNews = () => {
  const { enqueueSnackbar } = useSnackbar();

  // Form state that holds all inputs
  const [formData, setFormData] = useState({
    title: "",
    image: null as File | null,
    uploadVideo: null as File | null,
    coverImage: null as File | null,
    description: "",
  });

  // Handle changes for all form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Update form data for all fields
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { createNews, loading } = useCreateNews(formData);

  // Handle the image/video upload and set corresponding file
  const handleImageUpload = (imageType: 'image' | 'coverImage', file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      [imageType]: file, // Set the corresponding file in the formData
    }));
  };

  // Handle video upload
  const handleVideoUpload = (file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      uploadVideo: file, // Set video file in the formData
    }));
  };

  const handleNewsSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if all required fields are filled
    const requiredFields = [
      'title',
      'image',
      'uploadVideo',
      'coverImage',
      'description',
    ];

    const isFormValid = requiredFields.every((field) => formData[field as keyof typeof formData] !== "" && formData[field as keyof typeof formData] !== null);

    if (!isFormValid) {
      enqueueSnackbar("Please enter all the required fields", { variant: 'error' });
      return;
    }

    try {
      const result = await createNews();
      if (result.success) {
        setFormData({
          title: "",
          image: null,
          uploadVideo: null,
          coverImage: null,
          description: "",
        })
        enqueueSnackbar("News Added Successfully", { variant: 'success' });
      } else {
        enqueueSnackbar("Error while adding news", { variant: 'error' });
        console.error("Error while adding news");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="heading">Add News Feed</div>
      <form onSubmit={handleNewsSubmit}>
        <div className="input-fields mt-5 grid grid-cols-12 gap-3">
          <div className="col-span-12">
            <Label htmlFor="title" required={true}>Title of the Article</Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Enter the title of the article"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-12">
            <Label htmlFor="description" required={true}>Description</Label>
            <Input
              type="text"
              id="description"
              name="description"
              placeholder="Enter the description of the article"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-12">
            <Label htmlFor="image" required={true}>News Feed Image</Label>
            <DropzoneComponent
              onImageUpload={(file) => handleImageUpload('image', file)}
            />
          </div>

          <div className="col-span-12">
            <Label htmlFor="coverImage" required={true}>Cover Image</Label>
            <DropzoneComponent
              onImageUpload={(file) => handleImageUpload('coverImage', file)}
            />
          </div>

          <div className="col-span-12">
            <Label htmlFor="uploadVideo" required={true}>News Feed Video</Label>
            <VideoDropzoneComponent
              onVideoUpload={(file) => handleVideoUpload(file)}
            />
          </div>

          <div className='col-span-12 text-center'>
            <Button size="sm" variant="primary">
              {loading ? "Adding News..." : "Add News"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNews;