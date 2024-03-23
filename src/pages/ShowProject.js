import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/Backbutton';
import Spinner from '../components/Spinner';

const ShowProject = () => {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://project-management-backend-j0cz.onrender.com/projects/${id}`)
      .then((response) => {
        setProject(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-4xl font-semibold my-8'>Project Details</h1>
      {loading ? (
        <Spinner />
      ) : (
          <div className='flex flex-col border-2 border-green-500 rounded-lg p-4 '>
          <div className='my-4 '>
            <span className='text-2xl mr-4 text-gray-800 '>TITLE  :</span>
            <span className='text-2xl mr-4 text-gray-500 '>{project.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-2xl mr-4 text-gray-800'>MEMBERS  :</span>
            <span className='text-2xl mr-4 text-gray-600'>{project.members}</span>
          </div>
          <div className='my-4'>
            <span className='text-2xl mr-4 text-gray-800'>{(project.days>1)?"Days":"Day"} :</span>
            <span className='text-2xl mr-4 text-gray-600'>{project.days} {(project.days>1)?"Days":"Day"}</span>
          </div>
          <div className='my-4'>
            <span className='text-2xl mr-4 text-gray-600'>PROJECT ASSIGNED AT  :</span>
            <span className='text-xl mr-4 text-gray-500'>{new Date(project.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</span>
          </div>
          <div className='my-4'>
            <span className='text-2xl mr-4 text-gray-600'>LAST UPDATED AT   :</span>
            <span className='text-xl mr-4 text-gray-500'>{new Date(project.updatedAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowProject;
