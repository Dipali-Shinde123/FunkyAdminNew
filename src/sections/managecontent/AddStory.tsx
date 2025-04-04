import React, { useState } from "react";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { createStory } from "../../api/dashboard/postApi";
import { useSnackbar } from 'notistack';
import Button from "../../components/ui/button/Button";
import DropzoneComponent from "../../components/form/form-elements/DropZone";

type StoryFormData = { title: string; media: File | null };

const AddStory = () => {
  const [formData, setFormData] = useState<StoryFormData>({
    title: "",
    media: null,
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File | null, fieldName: keyof StoryFormData) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.media) {
      enqueueSnackbar("Please select a story file!");
      return;
    }

    const storyData = new FormData();
    storyData.append("title", formData.title);
    storyData.append("story_photo[]", formData.media);

    try {
      await createStory(storyData);
      enqueueSnackbar("Story added successfully!");
    } catch (error) {
      console.error("Error adding story:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Add Story</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Title *</Label>
          <Input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Type title here!" />
        </div>

        <div>
          <Label>Select Story *</Label>
          <DropzoneComponent 
            accept="image/*,video/*" 
            value={formData.media} 
            onChange={(file) => handleFileChange(file, "media")} 
          />
        </div>
        
        <div className='col-span-12 text-center'>
          <Button type='submit' size="sm" variant="primary">Add Effect</Button>
        </div>
      </form>
    </div>
  );
};

export default AddStory;
