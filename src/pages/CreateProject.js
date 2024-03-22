import React, { useState } from 'react';
import BackButton from '../components/Backbutton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [members, setMembers] = useState('');
  const [days, setDays] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveProject = () => {
    const data = {
      title,
      members,
      days
    };
    setLoading(true);
    axios
      .post('https://project-management-backend-j0cz.onrender.com/projects', data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-4xl font-semibold my-8'>CREATE PROJECT</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-green-700 rounded-xl w-[600px] p-7 mx-auto'>
        <div className='my-4'>
          <label className='text-2xl mr-4 font-semibold text-gray-500'>PROJECT TITLE</label>
          <input
            id="myinput"
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-2xl  mr-4 font-semibold text-gray-500'>MEMBERS</label>
          <input
            id="myinput"
            type='text'
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-2xl mb-2 mr-4 font-semibold text-gray-500'>DAYS</label>
          <input
            id="myinput"
            type='number'
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-half '
          />
        </div>
        <button className='px-4 py-2 bg-sky-300 text-white font-semibold rounded-lg shadow-md hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50' 
        onClick={handleSaveProject}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateProject