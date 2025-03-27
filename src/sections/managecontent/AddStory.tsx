import React, { useState } from "react";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { createStory } from "../../api/dashboard/postApi";
import { useSnackbar } from 'notistack';

const AddStory = () => {
  const [formData, setFormData] = useState<{ title: string; media: File | null }>({
    title: "",
    media: null,
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Ensure file is File | null
    setFormData((prev) => ({ ...prev, media: file }));
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
     console.log(FormData)
    try {
      await createStory(storyData);
      enqueueSnackbar("Story added successfully!");
    } catch (error) {
      console.error("Error adding story:", error);
    }
  };

  return (
    <div className="card p-4 shadow-md bg-white rounded-lg">
      <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Add Story</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Title *</Label>
          <Input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Type title here!" />
        </div>

        <div>
          <Label>Select Story *</Label>
          <input
            type="file"
            name="media"
            onChange={handleFileChange}
            accept="image/*,video/*"
            className="border p-2 w-full"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddStory;
