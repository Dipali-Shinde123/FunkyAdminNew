import { useState,FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/button/Button';
import DropzoneComponent from '../../components/form/form-elements/DropZone';

const AddPPV = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Live Event');
  const [ticketPrice, setTicketPrice] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [coverImage, setCoverImage] = useState<string | File>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log({ title, type, ticketPrice, eventDate, coverImage });
    navigate('/ppv');
  };

  return (
    <div>
      <div className='heading pb-4 item-center'>Add PPV Event</div>
      <form onSubmit={handleSubmit}>
        <div className="input-fields grid gap-4">
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
            Add PPV
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPPV;
