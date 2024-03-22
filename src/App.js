import React from 'react'
import { Route,Routes } from 'react-router-dom'
import CreateProject from './pages/CreateProject'
import DeleteProject from './pages/DeleteProject'
import UpdateProject from './pages/UpdateProject'
import Home from './pages/Home'
import ShowProject from './pages/ShowProject'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/projects/create' element={<CreateProject/>}/>
        <Route path='/projects/details/:id' element={<ShowProject/>}/>
        <Route path='/projects/update/:id' element={<UpdateProject/>}/>
        <Route path='/projects/delete/:id' element={<DeleteProject/>}/>
      </Routes>
    </div>
  )
}

export default App