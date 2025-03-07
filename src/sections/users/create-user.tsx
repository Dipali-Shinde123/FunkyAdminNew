import * as React from 'react';
import { useState, FormEvent } from 'react';
import Label from '../../components/form/Label';
import Select from '../../components/form/Select';
import Input from '../../components/form/input/InputField';
import { EyeCloseIcon, EyeIcon } from "../../icons";
import DropzoneComponent from '../../components/form/form-elements/DropZone';
import Button from '../../components/ui/button/Button';
import { useCreateUsers } from '../../api/dashboard/user';
import { useSnackbar } from 'notistack';

interface FormData {
  fullName: string;
  userName: string;
  email: string;
  phone: string;
  location: string;
  password: string;
  gender: string;
  referral_code: string;
  countryCode: number;
  parent_email: string;
  type: string;
  image: File | null;
}


const userOptions = [
  { value: "Creator", label: "Creator" },
  { value: "Advertiser", label: "Advertiser" },
  { value: "Kids", label: "Kids" },
];

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "transgender", label: "Transgender" },
];

const countryOptions = [
  { value: "india", label: "India" },
];

const CreateUser = () => {
  const { enqueueSnackbar } = useSnackbar();

  // Form state that holds all inputs
  const [formData, setFormData] = useState<FormData>({
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
    image: null, // For the file upload
  });

  const [error, setError] = useState({
    email: false,
    phone: false,
    parent_email: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  // Handle changes for all form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // If the field is 'email', validate it
    if (name === 'email') {
      const isValidEmail =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      setError((prevErrors) => ({
        ...prevErrors,
        email: !isValidEmail, // Set email error state
      }));
    }

    if (name === 'parent_email') {
      const isValidEmail =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      setError((prevErrors) => ({
        ...prevErrors,
        parent_email: !isValidEmail, // Set email error state
      }));
    }

    // If the field is 'phone', validate that it has exactly 10 digits
    if (name === 'phone') {
      const isValidPhone = /^\d{10}$/.test(value); // Checks if the phone number has exactly 10 digits
      setError((prevErrors) => ({
        ...prevErrors,
        phone: !isValidPhone, // Set phone error state
      }));
    }

    // Update form data for all fields
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { createUser, loading } = useCreateUsers(formData);

  const handleImageUpload = (image: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      image, // Update the image in the formData state
    }));
  };

  const handleUserSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)
    // Check if all required fields are filled
    const requiredFields = [
      formData.type != 'kids' && 'fullName',
      'userName',
      'email',
      'phone',
      'location',
      'password',
      formData.type != 'kids' && 'gender',
      'type',
      formData.type == 'kids' && 'parent_email'
    ];

    const isFormValid = requiredFields.every((field) => formData[field as keyof typeof formData] !== "");

    if (!isFormValid) {
      enqueueSnackbar("Please enter all the required fields", { variant: 'error' });
      return;
    }

    // If there are any errors in the fields, prevent form submission
    if (error.email || error.phone) {
      enqueueSnackbar("Please correct the errors before submitting.", { variant: 'error' });
      return;
    }

    try {
      const result = await createUser();
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
        })
        enqueueSnackbar("User Added Successfully", { variant: 'success' });
      } else {
        enqueueSnackbar("Error while adding user", { variant: 'error' });
        console.error("Error while adding user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="heading">Add a User</div>
      <form onSubmit={handleUserSubmit}>
        <div className="input-fields mt-5 grid grid-cols-12 gap-3">
          <div className="col-span-12">
            <Label required={true}>Select Type</Label>
            <Select
              options={userOptions}
              placeholder="Select an option"
              onChange={(value) => handleSelectChange(value, 'type')}
              className="dark:bg-dark-900"
            />
          </div>

          {
            formData.type === "Kids" ? ''
              :
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
          }

          <div className="col-span-12">
            <Label htmlFor="userName" required={true}>User Name (Unique)</Label>
            <Input
              type="text"
              id="userName"
              name="userName"
              placeholder="John Sams"
              value={formData.userName}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-12">
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

          <div className="col-span-12">
            <Label htmlFor="phone" required={true}>Phone</Label>
            <Input
              type="number"
              id="phone"
              name="phone"
              placeholder="+911234567891"
              value={formData.phone}
              onChange={handleInputChange}
              hint={error.phone ? "Phone number should be exactly 10 digits." : ""}
            />
          </div>

          <div className="col-span-12">
            <Label required={true}>Location (Country)</Label>
            <Select
              options={countryOptions}
              placeholder="Select Country"
              onChange={(value) => handleSelectChange(value, 'location')}
              className="dark:bg-dark-900"
            />
          </div>

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

          {
            formData.type === "Kids" ? ''
              :
              <div className="col-span-12">
                <Label required={true}>Gender</Label>
                <Select
                  options={genderOptions}
                  placeholder="Select Gender"
                  onChange={(value) => handleSelectChange(value, 'gender')}
                  className="dark:bg-dark-900"
                />
              </div>
          }
          {
            formData.type === "Kids" ?
              <div className="col-span-12">
                <Label required={true}>Parent Email</Label>
                <Input
                  type="email"
                  name="parent_email"
                  value={formData.parent_email}
                  error={error.parent_email}
                  onChange={handleInputChange}
                  placeholder="Enter your parent email"
                  hint={error.parent_email ? "This is an invalid email address." : ""}
                />
              </div> : ""
          }

          {
            formData.type === "Kids" ? "" :
              <div className="col-span-12">
                <Label htmlFor="referral_code">Referral Code (Optional)</Label>
                <Input
                  type="text"
                  id="referral_code"
                  name="referral_code"
                  placeholder="Type your referral code here!"
                  value={formData.referral_code}
                  onChange={handleInputChange}
                />
              </div>
          }

          <div className="col-span-12">
            <DropzoneComponent onImageUpload={handleImageUpload} />
          </div>

          <div className='col-span-12 text-center'>
            <Button size="sm" variant="primary">
              {loading ? "Adding User..." : "Add User"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;