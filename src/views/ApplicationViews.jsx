import { Routes, Route, Outlet } from "react-router"
import { NavBar } from "../components/nav/NavBar"
import { PlantLibrary } from "../components/plant library/PlantLibrary"
import { Welcome } from "../components/welcome/Welcome"
import { MyStash } from "../components/my stash/MyStash"
import { GardenPlanner } from "../components/planner/GardenPlanner"
import { useEffect, useState } from "react"


export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localGardenUser = localStorage.getItem("garden_user")
    const gardenUserObject =JSON.parse(localGardenUser)

    setCurrentUser(gardenUserObject)
  }, [])


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
        <Route path="plant-library" element={ <PlantLibrary currentUser={currentUser}/> } />
        <Route path="my-stash" element={ <MyStash currentUser={currentUser}/> } />
        <Route path="planner" element={ <GardenPlanner currentUser={currentUser}/> } />
      </Route>
    </Routes></>
}
