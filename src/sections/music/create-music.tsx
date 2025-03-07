import * as React from 'react';
import { useState, FormEvent } from 'react';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';
import Button from '../../components/ui/button/Button';
import { useSnackbar } from 'notistack';
import MusicDropzoneComponent from '../../components/form/form-elements/MusicDropZone';
import { useCreateMusic } from '../../api/dashboard/music';

const CreateMusic = () => {
  const { enqueueSnackbar } = useSnackbar();

  // Form state that holds all inputs
  const [formData, setFormData] = useState({
    song_name: "",
    artist_name: "",
    music_file: null as File | null,
    price: "",
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

  const { createMusic, loading } = useCreateMusic(formData);

  // Handle video upload
  const handleAudioUpload = (file: File | null) => {
    console.log("File received in parent component:", file); // This should log the file when it is dropped
    setFormData((prevData) => ({
      ...prevData,
      music_file: file, // Update formData state with the selected music file
    }));
  };

  const handleMusicSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if all required fields are filled
    const requiredFields = [
      "song_name",
      "artist_name",
      "music_file",
      "price",
    ];

    const isFormValid = requiredFields.every((field) => formData[field as keyof typeof formData] !== "" && formData[field as keyof typeof formData] !== null);

    if (!isFormValid) {
      enqueueSnackbar("Please enter all the required fields", { variant: 'error' });
      return;
    }

    try {
      const result = await createMusic();
      if (result.success) {
        setFormData({
          song_name: "",
          price: "",
          music_file: null,
          artist_name: "",
        })
        enqueueSnackbar("Music Added Successfully", { variant: 'success' });
      } else {
        enqueueSnackbar("Error while adding music", { variant: 'error' });
        console.error("Error while adding music");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="heading">Add Music</div>
      <form onSubmit={handleMusicSubmit}>
        <div className="input-fields mt-5 grid grid-cols-12 gap-3">
          <div className="col-span-12">
            <Label htmlFor="song_name" required={true}>Music Title</Label>
            <Input
              type="text"
              id="song_name"
              name="song_name"
              placeholder="Enter the title of the music"
              value={formData.song_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-12">
            <Label htmlFor="artist_name" required={true}>Music Author</Label>
            <Input
              type="text"
              id="artist_name"
              name="artist_name"
              placeholder="Enter the author of the music"
              value={formData.artist_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-12">
            <Label htmlFor="price" required={true}>Music Price</Label>
            <Input
              type="text"
              id="price"
              name="price"
              placeholder="Price will be considered in USD"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-12">
            <Label htmlFor="music_file" required={true}>Upload Image</Label>
            <MusicDropzoneComponent
              onMusicUpload={(file) => handleAudioUpload(file)}
            />
          </div>

          <div className='col-span-12 text-center'>
            <Button size="sm" variant="primary">
              {loading ? "Adding Music..." : "Add Music"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMusic;