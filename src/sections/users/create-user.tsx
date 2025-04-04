import * as React from 'react';
import { useState, FormEvent,useEffect } from 'react';
import Label from '../../components/form/Label';
import Select from '../../components/form/Select';
import Input from '../../components/form/input/InputField';
import { EyeCloseIcon, EyeIcon } from "../../icons";
import DropzoneComponent from '../../components/form/form-elements/DropZone';
import Button from '../../components/ui/button/Button';
import { useCreateUsers } from '../../api/dashboard/user';
import { useSnackbar } from 'notistack';
import { fetchCountries} from "../../api/dashboard/postApi";
 
interface Country {
  id: number;
  name: string;
}
const CreateUser = () => {
  const { enqueueSnackbar } = useSnackbar();
   const [countries, setCountries] = useState<Country[]>([]);

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    gender: "",
    referral_code: "",
    countryCode: 91,
    parent_email: "",
    type: "",
    image: null as File | null,
  });

  const [error, setError] = useState({
    email: false,
    phone: false,
    parent_email: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const { createUser, loading } = useCreateUsers();

   useEffect(() => {
      const loadData = async () => {
        try {
          const [countriesData] = await Promise.all([
            fetchCountries(),
            
          ]);
          setCountries(countriesData);
         
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      loadData();
    }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "email" || name === "parent_email") {
      const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      setError((prev) => ({ ...prev, [name]: !isValidEmail }));
    }

    if (name === "phone") {
      const isValidPhone = /^\d{10}$/.test(value);
      setError((prev) => ({ ...prev, phone: !isValidPhone }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  

const handleSelectChange = (option: { label: string; value: string } | string, name: string) => {
  const value = typeof option === "string" ? option : option?.value;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleImageUpload = (file: File | null) => {
  setFormData((prev) => ({ ...prev, image: file }));
};


  const handleUserSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields = [
      formData.type !== "Kids" && "fullName",
      "userName",
      "email",
      "phone",
      "location",
      "password",
      formData.type !== "Kids" && "gender",
      "type",
      formData.type === "Kids" && "parent_email",
      formData.type !== "Kids" && "referral_code",
    ].filter(Boolean);
    console.log("Required Fields:", requiredFields);
    console.log("Form Data:", formData);


    const isFormValid = requiredFields.every(
      (field) => formData[field as keyof typeof formData] !== ""
    );

    if (!isFormValid) {
      enqueueSnackbar("Please enter all the required fields", { variant: "error" });
      return;
    }

    if (error.email || error.phone || error.parent_email) {
      enqueueSnackbar("Please correct the errors before submitting.", { variant: "error" });
      return;
    }

    try {
      const result = await createUser(formData);

      const responseFormat = {
        status: result.success,
        message: result.success ? "User added successfully" : "User creation failed",
        data: result.data || null,
        

      };
      window.location.reload();

      console.log("Create User Successfully:", responseFormat);

      if (result.success) {
        setFormData({
          fullName: "",
          userName: "",
          email: "",
          phone: "",
          location: "",
          password: "",
          gender: "",
          referral_code: "",
          countryCode: 91,
          parent_email: "",
          type: "",
          image: null,
        });
        enqueueSnackbar("User Added Successfully", { variant: "success" });
      } else {
        enqueueSnackbar("Error while adding user", { variant: "error" });
      }
    } catch (err) {
      console.error("Error:", err);
      const errorResponse = {
        status: false,
        message: "Server error occurred",
        data: null,
      };
      console.log("Postman Style Error Response:", errorResponse);
      enqueueSnackbar("An unexpected error occurred", { variant: "error" });
    }
  };

  return (
    <div>
      <div className="heading">Add a User</div>
      <form className="sm:4 md:6 lg:12" onSubmit={handleUserSubmit}>
        <div className="input-fields mt-5 grid grid-cols-12 gap-3 ">
       
          <div className="col-span-12">
            <Label required={true}>Select Type</Label>
          <Select
  label="User Type"
  id='user'
  name='user'
  value={formData.type} 
  options={[
    { label: "Creator", value: "Creator" },
    { label: "Advertiser", value: "Advertiser" },
    { label: "Kids", value: "Kids" },
  ]}
  placeholder="Select type"
  onChange={(value) => handleSelectChange(value ,"type")}
  className="mb-4"
 />

          </div>

         
          {formData.type !== "Kids" && (
            <div className="col-span-12">
              <Label htmlFor="fullName" required={true}>Full Name</Label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="John Sams"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
          )}

          {/* Username */}
          <div className="col-span-12 dark:text-gray-300 dark:bg-black-800">
            <Label  required={true}>User Name (Unique)</Label>
            <Input
              type="text"
              id="userName"
              name="userName"
              placeholder="john_sams"
              value={formData.userName}
              onChange={handleInputChange}
            />
          </div>

          {/* Email */}
          <div className="col-span-12 ">
            <Label required={true}>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              error={error.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              hint={error.email ? "This is an invalid email address." : ""}
            />
          </div>

          {/* Phone */}
          <div className="col-span-12">
            <Label htmlFor="phone" required={true}>Phone</Label>
            <Input
              type="number"
              id="phone"
              name="phone"
              placeholder="1234567890"
              value={formData.phone}
              onChange={handleInputChange}
              hint={error.phone ? "Phone number should be exactly 10 digits." : ""}
            />
          </div>

          {/* Location */}
          <div className="col-span-12">
            <Label required={true}>Location (Country)</Label>
            <Select
            id='country'
            name='country'
  label="Country"
  value={formData.location} // assuming `location` field is used for country
  options={countries.map((c) => ({ value: c.name, label: c.name }))}
  placeholder="Select Country"
  onChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
  className="mb-4"
/>

          </div>

          {/* Password */}
          <div className="col-span-12">
            <Label required={true}>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </button>
            </div>
          </div>

          {/* Gender */}
          {formData.type !== "Kids" && (
            <div className="col-span-12">
              <Label required={true}>Gender</Label>
              <Select
              id='type'
              name='type'
  label="Gender"
  value={formData.gender}
  options={[
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ]}
  placeholder="Select gender"
  onChange={(value) => handleSelectChange( value , "gender")}
  className="mb-4"
/>

            </div>
          )}

          {/* Parent Email */}
          {formData.type === "Kids" && (
            <div className="col-span-12">
              <Label required={true}>Parent Email</Label>
              <Input
                type="email"
                name="parent_email"
                value={formData.parent_email}
                error={error.parent_email}
                onChange={handleInputChange}
                placeholder="Enter parent's email"
                hint={error.parent_email ? "Invalid parent email address." : ""}
              />
            </div>
          )}

          {/* Referral Code */}
          {formData.type !== "Kids" && (
            <div className="col-span-12">
              <Label htmlFor="referral_code" required={true}>Referral Code</Label>
              <Input
                type="text"
                name="referral_code"
                placeholder="Enter referral code"
                value={formData.referral_code}
                onChange={handleInputChange}
              />
            </div>
          )}

          {/* Profile Image Upload */}
          <div className="col-span-12">
            <Label>Upload Image</Label>
            <DropzoneComponent
  value={formData.image} // ya formData.profilePhoto, jo bhi tum use kar rahi ho
  onChange={handleImageUpload}
/>

          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;