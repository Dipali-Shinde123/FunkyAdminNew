import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const EffectControl = () => {
//   const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [effectData, setEffectData] = useState({
    name: 'Cool Sticker',
    type: 'Sticker',
    visibility: 'Creator',
    location: 'Photos',
  });

  const handleInputChange = (e: any) => {
    setEffectData({ ...effectData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    enqueueSnackbar('Effect updated successfully!', { variant: 'success' })
    navigate('/Effect/effect-list')
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Edit Effect</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          name="name"
          value={effectData.name}
          onChange={handleInputChange}
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-2">Type:</label>
        <select
          name="type"
          value={effectData.type}
          onChange={handleInputChange}
          className="border p-2 w-full mb-4"
        >
          <option value="Effect">Effect</option>
          <option value="Sticker">Sticker</option>
          <option value="Emoji">Emoji</option>
          <option value="Filter">Filter</option>
        </select>

        <label className="block mb-2">Visibility:</label>
        <select
          name="visibility"
          value={effectData.visibility}
          onChange={handleInputChange}
          className="border p-2 w-full mb-4"
        >
          <option value="Creator">Creator</option>
          <option value="Advertiser">Advertiser</option>
          <option value="Both">Both</option>
          <option value="None">None</option>
        </select>

        <label className="block mb-2">Location:</label>
        <select
          name="location"
          value={effectData.location}
          onChange={handleInputChange}
          className="border p-2 w-full mb-4"
        >
          <option value="LIVE">LIVE</option>
          <option value="Photos">Photos</option>
          <option value="Chronicles">Chronicles</option>
          <option value="Videos">Videos</option>
          <option value="All">All</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EffectControl;
