import { useState, useEffect,FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/ui/button/Button';
import DropzoneComponent from '../../components/form/form-elements/DropZone';
import { Link } from 'react-router-dom';

const EditPPV = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Live Event');
  const [ticketPrice, setTicketPrice] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [coverImage, setCoverImage] = useState<string | File>('');

  useEffect(() => {
    const fetchPPVDetails = async () => {
      const mockData = {
        id: 1,
        title: 'Sample PPV Event',
        type: 'Live Event',
        ticketPrice: '15',
        eventDate: '2025-04-15',
        coverImage: '',
      };
      setTitle(mockData.title);
      setType(mockData.type);
      setTicketPrice(mockData.ticketPrice);
      setEventDate(mockData.eventDate);
      setCoverImage(mockData.coverImage);
    };
    fetchPPVDetails();
  }, [id]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log({ title, type, ticketPrice, eventDate, coverImage });
    navigate('/PPV');
  };

  return (
    <div>
       <Link to={'/PPV'} className='flex items-center gap-x-2 bg-gradient-to-r from-[#14ADD6] to-[#384295] bg-clip-text text-transparent'>
                <span className='text-[30px]'>{`<`}</span>
                <span>Back</span>
              </Link>
              <div className="heading mt-10">
        <p className='font-semibold text-xl text-[#272525]'>Edit PPV</p>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block font-medium'>Title</label>
          <input type='text' className='w-full p-2 border rounded' value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className='block font-medium'>Type</label>
          <select className='w-full p-2 border rounded' value={type} onChange={(e) => setType(e.target.value)}>
            <option value='Live Event'>Live Event</option>
            <option value='Movie'>Movie</option>
            <option value='User Event'>User Event</option>
          </select>
        </div>
        <div>
          <label className='block font-medium'>Ticket Price</label>
          <input type='number' className='w-full p-2 border rounded' value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} required />
        </div>
        <div>
          <label className='block font-medium'>Event Date</label>
          <input type='date' className='w-full p-2 border rounded' value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
        </div>
        <div>
          <label className='block font-medium'>Cover Image</label>
          <DropzoneComponent accept='image/*' value={typeof coverImage === 'string' ? null : coverImage} onChange={(file) => setCoverImage(file || '')} />
        </div>
        <div className='text-center'>
          <Button size='sm' variant='primary' type='submit'>
            Update PPV
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPPV;
