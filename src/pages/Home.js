import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://project-management-backend-j0cz.onrender.com/projects')
      .then((response) => {
        setProjects(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'></div>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold my-8'>Project List</h1>
        <Link to='/projects/create'>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Project
          </button>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="min-w-full text-center text-sm font-light">
          <thead className='border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800'>
            <tr>
              <th scope="col" className=" p-3 border text-xl border-slate-600 rounded-md "> PROJECT NO </th>
              <th scope="col" className=" p-3 border text-xl border-slate-600 rounded-md "> PROJECT TITLE </th>
              <th scope="col" className=" p-3 border text-xl border-slate-600 rounded-md ">
                MEMBERS NAME 
              </th>
              <th className='border border-slate-600 text-xl rounded-md max-md:hidden'>
                PROJECT DURATION IN DAYS  
              </th>
              <th className='border border-slate-600 text-xl rounded-md max-md:hidden'>
                PROJECT CREATED AT  
              </th>
              <th className='border border-slate-600 text-xl rounded-md'>OPERATIONS</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project._id} className='h-8'>
                <td className='border text-base border-slate-500 rounded-md text-center font-semibold'>
                  {index + 1}
                </td>
                <td className='border text-base border-slate-500 rounded-md text-center font-semibold' >
                  {project.title}
                </td>
                <td className='border text-base border-slate-500 rounded-md text-center font-semibold'>
                  {project.members}
                </td>
                <td className='border text-base border-slate-500 rounded-md font-semibold text-center max-w-xs max-md:hidden whitespace-nowrap overflow-hidden overflow-ellipsis'>
                 {project.days} {(project.days>1)?"Days":"Day"}
                </td>
                <td className='border text-base font-semibold border-slate-500 rounded-md text-center max-md:hidden'>
                {new Date(project.updatedAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex flex-col p-3 md:flex-row justify-center gap-y-2 md:gap-x-4'>
                    <Link to={`/projects/details/${project._id}`} className='w-full md:w-auto'>
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto">
                        PROJECT DETAILS
                      </button>
                    </Link>
                    <Link to={`/projects/update/${project._id}`} className='w-full md:w-auto'>
                      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto">
                        EDIT PROJECT
                      </button>
                    </Link>
                    <Link to={`/projects/delete/${project._id}`} className='w-full md:w-auto'>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded w-full md:w-auto">
                        DELETE
                      </button>
                    </Link>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
