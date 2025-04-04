import { useState,FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/button/Button';
import DropzoneComponent from '../../components/form/form-elements/DropZone';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';


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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input type='text' className='w-full p-2 border rounded' value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <Label className='block font-medium'>Type</Label>
          <select className='w-full p-2 border rounded' value={type} onChange={(e) => setType(e.target.value)}>
            <option value='Live Event'>Live Event</option>
            <option value='Movie'>Movie</option>
            <option value='User Event'>User Event</option>
          </select>
        </div>
        <div>
          <Label className='block font-medium'>Ticket Price</Label>
          <Input type='number' className='w-full p-2 border rounded' value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} required />
        </div>
        <div>
          <Label className='block font-medium'>Event Date</Label>
          <Input type='date' className='w-full p-2 border rounded' value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor=''>Cover Image</Label>
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
