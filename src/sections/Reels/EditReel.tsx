import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Button from '../../components/ui/button/Button';
import DropzoneComponent from '../../components/form/form-elements/DropZone';

const EditReel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<string | File>('');
  const [video, setVideo] = useState<string | File>('');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    // Fetch reel details using id (Mock Data for now)
    const mockReel = {
      title: 'Amazing Travel Reel',
      description: 'Experience the best travel destinations!',
      thumbnail: 'https://via.placeholder.com/50',
      video: 'https://via.placeholder.com/100',
      status: 'Active',
    };

    setTitle(mockReel.title);
    setDescription(mockReel.description);
    setThumbnail(mockReel.thumbnail);
    setVideo(mockReel.video);
    setStatus(mockReel.status);
  }, [id]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    enqueueSnackbar('Reel updated successfully!', { variant: 'success' });
    navigate('/reels');
  };

  return (
    <div>
      <div className="back">
        <Link to={'/reels'} className='flex items-center gap-x-2 text-blue-500'>
          <span className='text-[30px]'>{`<`}</span>
          <span>Back</span>
        </Link>
      </div>
      
      <div className="heading mt-10">
        <p className='font-semibold text-xl text-[#272525]'>Edit Reel</p>
      </div>
      
      <div className="form mt-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Title</label>
            <input type="text" className="w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          
          <div>
            <label className="block font-medium">Description</label>
            <textarea className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Thumbnail</label>
            {thumbnail && typeof thumbnail === 'string' && (
              <img src={thumbnail} className="w-24 h-24 mb-2" alt="Thumbnail" />
            )}
           <DropzoneComponent
          accept="image/*"
         value={typeof thumbnail === 'string' ? null : thumbnail}
          onChange={(file) => setThumbnail(file || '')}
          />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Video</label>
            {video && typeof video === 'string' && (
              <a href={video} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Video</a>
            )}
            <DropzoneComponent
           accept="video/*"
          value={typeof video === 'string' ? null : video}
           onChange={(file) => setVideo(file || '')}
          />
          </div>
          
          <div>
            <label className="block font-medium">Status</label>
            <select className="w-full p-2 border rounded" value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          
          <div className='col-span-12 text-center p-4'>
            <Button size="sm" variant="primary" type="submit">Update Reel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReel;
