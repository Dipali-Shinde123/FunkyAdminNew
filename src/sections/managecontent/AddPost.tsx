import React, { useState, useEffect } from "react";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Input from "../../components/form/input/InputField";
import { fetchCountries, fetchUsers, createPost } from "../../api/dashboard/postApi";
import { useSnackbar } from "notistack";
import Button from "../../components/ui/button/Button";
import DropzoneComponent from "../../components/form/form-elements/DropZone";





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

  const handleFileChange = (file: File | null, field: keyof FormData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
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
    <div className="w-full h-full ">
      <h2 className="text-2xl  text-gray-800 text-center mb-4">Add Post</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
      <Label>Select User</Label>
<Select
id="user"
name="user"
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
<Label>Tagpeople</Label>
<Select
id="tag"
name="tag"
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
<Label>Select Country</Label>
       <Select
        id="country"
        name="country"
       label="Country"
       value={formData.address} // assuming `location` field is used for country
       options={countries.map((c) => ({ value: c.name, label: c.name }))}
      placeholder="Select Country"
      onChange={(value) => setFormData((prev) => ({ ...prev, address: value }))}
  
/>
 <Label>Description</Label>
        <Input type="text" name="description" value={formData.description} onChange={handleChange} />

        <Label>Upload Media</Label>
        <DropzoneComponent accept="image/*,video/*" value={formData.media} onChange={(file:any) => handleFileChange(file, "media")} />
      

        <Label>Cover Image</Label>
        <DropzoneComponent accept="image/*" value={formData.coverImage} onChange={(file : any) => handleFileChange(file, "coverImage")} />

        <div className="grid grid-cols-3 gap-4">
          <Label className="flex items-center space-x-2">
            <input type="checkbox" name="enableDownload" checked={formData.enableDownload} onChange={handleChange}  className="form-checkbox h-5 w-5 text-blue-600"/>
            <span>Enable Download</span>
          </Label>

          <Label className="flex items-center space-x-2">
            <input type="checkbox" name="enableComment" checked={formData.enableComment} onChange={handleChange}  className="form-checkbox h-5 w-5 text-blue-600"/>
            <span>Enable Comment</span>
          </Label>

          <Label className="flex items-center space-x-2">
            <input type="checkbox" name="allowAds" checked={formData.allowAds} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600"/>
            <span>Allow Ads</span>
          </Label>
        </div>
   <div className="text-center">
   <Button size='sm' variant='primary' type="submit" >
          Add Post
        </Button>
   </div>
        
      </form>
    </div>
  );
};

export default AddPost;