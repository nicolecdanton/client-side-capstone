import { Routes, Route, Outlet } from "react-router"
import { NavBar } from "../components/nav/NavBar"
import { PlantList } from "../components/plant library/PlantList"
import { Welcome } from "../components/welcome/Welcome"
import { MyStash } from "../components/stash/MyStash"


export const ApplicationViews = () => {
  return <>
  <Routes>
  <Route 
        path="/" 
        element={ 
          <>
            <NavBar />
            <Outlet />
          </> } >
        <Route index element={<Welcome />} />
        <Route path="plant-library" element={ <PlantList/> } /> 
        <Route path="my-stash" element={ <MyStash/> } />
      </Route>
    </Routes></>
}
