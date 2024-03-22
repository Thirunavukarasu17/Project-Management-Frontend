import React, { useState, useEffect } from 'react';
import BackButton from '../components/Backbutton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProject = () => {
  const [title, setTitle] = useState('');
  const [members, setMembers] = useState('');
  const [days, setDays] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`https://project-management-backend-j0cz.onrender.com/projects${id}`)
    .then((response) => {
        setMembers(response.data.members);
        setDays(response.data.days)
        setTitle(response.data.title)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened');
        console.log(error);
      });
  }, [id])
  
  const handleEditProject = () => {
    const data = {
      title,
      members,
      days,
    };
    setLoading(true);
    axios
      .put(`https://project-management-backend-j0cz.onrender.com/projects${id}`, data)
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
      <h1 className='text-4xl font-semibold my-8'>Edit Project</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>TITLE</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>MEMBERS</label>
          <input
            type='text'
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>DAYS</label>
          <input
            type='number'
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditProject}>
          Save
        </button>
      </div>
    </div>
  )
}

export default UpdateProject