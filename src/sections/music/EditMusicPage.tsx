import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useGetMusicDetail, useUpdateMusic } from '../../../src/api/dashboard/music';
import { useSnackbar } from 'notistack';
import Button from '../../components/ui/button/Button';
import DropzoneComponent from '../../components/form/form-elements/DropZone';

const EditMusicPage = () => {
  const { id } = useParams();
  const { musicDetail } = useGetMusicDetail(id || '');
  const { updateMusic } = useUpdateMusic();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [price, setPrice] = useState('');
  const [isActive, setIsActive] = useState('1');
  const [musicFile, setMusicFile] = useState<string | File>('');

  useEffect(() => {
    if (musicDetail?.data) {
      setSongName(musicDetail.data.song_name || '');
      setArtistName(musicDetail.data.artist_name || '');
      setPrice(musicDetail.data.price?.toString() || '');
      setIsActive(musicDetail.data.isActive || '1');
      setMusicFile(musicDetail.data.music_file || '');
    }
  }, [musicDetail]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('song_name', songName);
    formData.append('artist_name', artistName);
    formData.append('price', price);
    formData.append('isActive', isActive);

    if (musicFile && typeof musicFile !== 'string') {
      formData.append('music_file', musicFile);
    }

    const result = await updateMusic(id || '', formData);

    if (result.success) {
      enqueueSnackbar('Music updated successfully!', { variant: 'success' });
      navigate('/music');
    } else {
      enqueueSnackbar(result.message || 'Failed to update music.', { variant: 'error' });
    }
  };

  return (
    <div>
      <div className="back">
        <Link to={'/music'} className='flex items-center gap-x-2 bg-gradient-to-r from-[#14ADD6] to-[#384295] bg-clip-text text-transparent'>
          <span className='text-[30px]'>{`<`}</span>
          <span>Back</span>
        </Link>
      </div>

      <div className="heading mt-10">
        <p className='font-semibold text-xl text-[#272525]'>Edit Music</p>
      </div>

      <div className="form mt-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Song Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Artist Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Price</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Status</label>
            <select
              className="w-full p-2 border rounded"
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
              required
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Music File</label>
            {musicFile && typeof musicFile === 'string' && (
              <div className="flex justify-center mb-4">
                <audio controls className="w-full">
                  <source src={musicFile} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
            <DropzoneComponent
             accept="audio/*"
              value={typeof musicFile === 'string' ? null : musicFile}
              onChange={(file) => {
                if (file) {
                  setMusicFile(file);
                } else {
                  setMusicFile('');
                }
              }}
              
            />
          </div>

          <div className='col-span-12 text-center p-4'>
            <Button size="sm" variant="primary" type="submit">
              Update Music
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMusicPage;
