import React, { useState, useEffect } from "react";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Input from "../../components/form/input/InputField";
import { fetchCountries, fetchUsers, createPost } from "../../api/dashboard/postApi";
import { useSnackbar } from "notistack";

interface Country {
  id: number;
  name: string;
}

interface User {
  id: number;
  username: string;
}

interface FormData {
  userId: string;
  mediaType: string;
  media: File | null;
  coverImage: File | null;
  postImage: File | null;
  description: string;
  tagPeople: { value: string; label: string }[];
  address: string;
  enableDownload: boolean;
  enableComment: boolean;
  allowAds: boolean;
  isVideo: string;
}

const AddPost: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<FormData>({
    userId: "",
    mediaType: "",
    media: null,
    coverImage: null,
    postImage: null,
    description: "",
    tagPeople: [],
    address: "",
    enableDownload: true,
    enableComment: true,
    allowAds: true,
    isVideo: "false",
  });
  const{ enqueueSnackbar} = useSnackbar()

  useEffect(() => {
    const loadData = async () => {
      try {
        const [countriesData, usersData] = await Promise.all([
          fetchCountries(),
          fetchUsers(),
        ]);
        setCountries(countriesData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.media) {
      enqueueSnackbar("Please select an image or video to upload!");
      return;
    }

    const isVideo = formData.media.type.startsWith("video");

    const formDataToSend = new FormData();
    formDataToSend.append("userId", formData.userId);
    formDataToSend.append("tagLine", formData.tagPeople.map(user => user.label).join(","));
    formDataToSend.append("address", formData.address);
    formDataToSend.append("isVideo", isVideo ? "true" : "false");
    formDataToSend.append("description", formData.description);
    formDataToSend.append("enableDownload", String(formData.enableDownload));
    formDataToSend.append("enableComment", String(formData.enableComment));
    formDataToSend.append("allowAds", String(formData.allowAds));

    if (formData.coverImage) {
      formDataToSend.append("coverImage", formData.coverImage);
    }

    if (isVideo) {
      formDataToSend.append("uploadVideo", formData.media);
    } else {
      formDataToSend.append("postImage", formData.media);
    }

    try {
      const response = await createPost(formDataToSend);
      console.log("API Response:", response);
      enqueueSnackbar("Post Created Successfully!");
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Add Post</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
      
<Select
label="Select User"
  value={formData.userId || ""} // Add the current selected value from your form state
  options={users.map((u) => ({ value: String(u.id), label: u.username }))}
  placeholder="Select User"
  onChange={(value) =>
    setFormData((prev) => ({
      ...prev,
      userId: value,
    }))
  }
/>


       
        
<Select
label="Tagpeople"
  value={formData.tagPeople?.[0]?.value || ""} // Add this line to provide the current selected value
  options={users.map((u) => ({ value: String(u.id), label: u.username }))}
  placeholder="Tag People"
  onChange={(value) =>
    setFormData((prev) => ({
      ...prev,
      tagPeople: [
        {
          value,
          label: users.find((u) => u.id === Number(value))?.username || "",
        },
      ],
    }))
  }
/>


       
        <Select
       label="Country"
       value={formData.address} // assuming `location` field is used for country
       options={countries.map((c) => ({ value: c.name, label: c.name }))}
      placeholder="Select Country"
      onChange={(value) => setFormData((prev) => ({ ...prev, address: value }))}
  
/>


        <Label>Description</Label>
        <Input type="text" name="description" value={formData.description} onChange={handleChange} />

        <Label>Upload Media</Label>
        <input type="file" name="media" accept="image/*,video/*" onChange={handleFileChange} />

        <Label>Cover Image</Label>
        <input type="file" name="coverImage" accept="image/*" onChange={handleFileChange} />

        <div className="flex flex-col space-y-3">
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="enableDownload" checked={formData.enableDownload} onChange={handleChange} />
            <span>Enable Download</span>
          </label>

          <label className="flex items-center space-x-2">
            <input type="checkbox" name="enableComment" checked={formData.enableComment} onChange={handleChange} />
            <span>Enable Comment</span>
          </label>

          <label className="flex items-center space-x-2">
            <input type="checkbox" name="allowAds" checked={formData.allowAds} onChange={handleChange} />
            <span>Allow Ads</span>
          </label>
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPost;