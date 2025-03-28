import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useGetNewsDetail, useUpdateNews } from '../../../src/api/dashboard/news';
import { useSnackbar } from 'notistack';
import Button from '../../components/ui/button/Button';
import DropzoneComponent from '../../components/form/form-elements/DropZone';
const EditNewsPage = () => {
  const { id } = useParams();
  const { newsDetail } = useGetNewsDetail(id || '');
  const { updatenews } = useUpdateNews();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<string | File>('');
  const [uploadVideo, setUploadVideo] = useState<string | File>('');

  useEffect(() => {
    if (newsDetail?.data) {
      setTitle(newsDetail.data.title || '');
      setDescription(newsDetail.data.description || '');
      setCoverImage(newsDetail.data.coverImage || '');
      setUploadVideo(newsDetail.data.uploadVideo || '');
    }
  }, [newsDetail]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    if (coverImage && typeof coverImage !== 'string') {
      formData.append('coverImage', coverImage);
    }

    if (uploadVideo && typeof uploadVideo !== 'string') {
      formData.append('uploadVideo', uploadVideo);
    }

    const result = await updatenews(id || '', formData);

    if (result.success) {
      enqueueSnackbar('News updated successfully!', { variant: 'success' });
      navigate('/news');
    } else {
      enqueueSnackbar(result.message || 'Failed to update news.', { variant: 'error' });
    }
  };

  return (
    <div>
      <div className="back">
        <Link to={'/categories'} className='flex items-center gap-x-2 bg-gradient-to-r from-[#14ADD6] to-[#384295] bg-clip-text text-transparent'>
          <span className='text-[30px]'>{`<`}</span>
          <span>Back</span>
        </Link>
      </div>

      <div className="heading mt-10">
        <p className='font-semibold text-xl text-[#272525]'>Edit News</p>
      </div>

      <div className="form mt-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              className="w-full p-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
  <label className="block font-medium mb-1">Cover Image</label>
  {coverImage && typeof coverImage === 'string' && (
    <div className="flex justify-center mb-4">
      <img
        src={coverImage}
        alt="Current Cover"
        className="w-40 h-40 object-cover rounded shadow"
      />
    </div>
  )}
  <DropzoneComponent
    value={typeof coverImage === 'string' ? null : coverImage}
    onChange={(file) => {
      if (file) {
        setCoverImage(file);
      } else {
        setCoverImage('');
      }
    }}
  />
</div>

<div>
  <label className="justify-center font-medium mb-1">Upload Video</label>
  {uploadVideo && typeof uploadVideo === 'string' && (
    <div className="flex justify-center mb-4">
      <video
        controls
        className="w-60 h-40 object-cover rounded shadow"
      >
        <source src={uploadVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )}
  <DropzoneComponent
    value={typeof uploadVideo === 'string' ? null : uploadVideo}
    onChange={(file) => {
      if (file) {
        setUploadVideo(file);
      } else {
        setUploadVideo('');
      }
    }}
  />
</div>
<div className='col-span-12 text-center p-4'>
            <Button size="sm" variant="primary" type="submit">
              Update News
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNewsPage;
