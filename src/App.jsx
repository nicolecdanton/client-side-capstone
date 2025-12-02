import './App.css'
import { PlantList } from './components/plant library/PlantList'
import { NavBar } from './components/nav/NavBar'
import { Routes, Route, Outlet } from 'react-router-dom'

export const App = () => {

  return (
    <Routes>
      <Route 
        path="/" 
        element={ 
          <>
            <NavBar />
            <Outlet />
          </> } >
        <Route path="plant-library" element={ <PlantList/> } /> 
      </Route>
    </Routes>
)}
