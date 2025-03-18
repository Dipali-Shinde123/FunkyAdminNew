import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useRouter } from '../../routes/hooks';
import { useParams } from 'react-router-dom';
import { useGetCMSDetail, useUpdateCMS } from '../../api/dashboard/cms';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';
import DropzoneComponent from '../../components/form/form-elements/DropZone';
import RichTextEditorComponent from '../../components/form/form-elements/RichTextEditorComponent';
import Select from '../../components/form/Select';
import Button from '../../components/ui/button/Button';

interface formData {
    title: string,
    subTitle: string,
    description: string,
    image: string,
    position: string,
}

const EditCMS = () => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const { id } = useParams();
    // const { categoryDetail, categoryDetailLoading, categoryDetailError } = useGetCategoryDetail(id);
    const { cmsDetail, cmsDetailLoading, cmsDetailError } = useGetCMSDetail(id || '');

    const [formData, setFormData] = useState<formData>({
        title: '',
        subTitle: '',
        description: '',
        image: '',
        position: '',
    });

    const positionOptions = [
        { value: "Left", label: "Left" },
        { value: "Right", label: "Right" },
    ];

    // Fetch the category details and populate the form data
    useEffect(() => {
        if (cmsDetail && cmsDetail.data) {
            setFormData({
                title: cmsDetail.data.title,
                subTitle: cmsDetail.data.subTitle,
                description: cmsDetail.data.description,
                position: cmsDetail.data.position,
                image: cmsDetail.data.image,
            });
        }
    }, [cmsDetail]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const newFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        if (value) {
            newFormData.append(key, value);
        }
    });

    const { updateCMS, loading, error } = useUpdateCMS(id || '', formData);

    const handleImageUpload = (imageType: 'image' | 'coverImage', file: File | null) => {
        setFormData((prevData) => ({
            ...prevData,
            [imageType]: file, // Update the image field in formData
        }));
    };


    const handleEditorChange = (value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            description: value, // Update formData.description with the new editor value
        }));
    };

    const handleSelectChange = (value: string, name: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCMSUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.subTitle || !formData.description || !formData.image) {
            enqueueSnackbar('Please fill out all the required fields.', { variant: 'error' });
            return;
        }
        try {
            const result = await updateCMS();

            if (result.success) {
                enqueueSnackbar('CMS edited successfully!', { variant: 'success' });
                router.push('/cms');
            } else {
                console.error("Error updating category:", result.message);
                enqueueSnackbar(result.message || 'Failed to update category.', { variant: 'error' });
            }
        } catch (err) {
            console.error(err);
            enqueueSnackbar('An unexpected error occurred.', { variant: 'error' });
        }
    };

    if (cmsDetailLoading) {
        return <div>Loading CMS data...</div>;
    }

    if (cmsDetailError) {
        return <div>Error fetching cms details. Please try again.</div>;
    }

    return (
        <div>
            <div className="back">
                <Link to={'/categories'} className='flex items-center gap-x-2 bg-gradient-to-r from-[#14ADD6] to-[#384295] bg-clip-text text-transparent'>
                    <span className='text-[30px]'>{`<`}</span>
                    <span>Back</span>
                </Link>
            </div>
            <div className="heading mt-10">
                <p className='font-semibold text-xl text-[#272525]'>Edit CMS</p>
            </div>
            <div className="form mt-8">
                <form onSubmit={handleCMSUpdate}>
                    <div className="input-fields mt-5 grid grid-cols-12 gap-3">
                        <div className="col-span-12">
                            <Label htmlFor="title" required={true}>Title</Label>
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
                            <Label htmlFor="sub-title" required={true}>Sub Title</Label>
                            <Input
                                type="text"
                                id="sub-title"
                                name="subTitle"
                                placeholder="Enter the sub title of the article"
                                value={formData.subTitle}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="col-span-12">
                            <Label htmlFor="description" required={true}>Description</Label>
                            <RichTextEditorComponent
                                initialData={formData.description} // Make sure this is synced with formData.description
                                onChange={handleEditorChange}
                            />
                        </div>

                        <div className="col-span-12">
                            <Label htmlFor="image" required={true}>Upload Image</Label>
                            <DropzoneComponent
                                value={formData.image || null}
                                onImageUpload={(file) => handleImageUpload('image', file)}
                            />
                        </div>

                        <div className="col-span-12">
                            <Label required={true}>Select Position</Label>
                            <Select
                                options={positionOptions}
                                placeholder="Select an option"
                                value={formData.position} // Controlled value from formData
                                onChange={(value) => handleSelectChange(value, 'position')}  // Handle change properly
                                className="dark:bg-dark-900"
                            />


                        </div>

                        <div className='col-span-12 text-center'>
                            <Button size="sm" variant="primary">
                                {loading ? "Updating CMS..." : "Update CMS"}
                            </Button>
                        </div>
                    </div>
                </form>

                {error && (
                    <div className="col-span-12 text-red-500 mt-2 text-center">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditCMS;