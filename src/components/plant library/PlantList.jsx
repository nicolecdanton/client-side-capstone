import { useState, useEffect } from "react"
import { PlantCard } from "./PlantCard";
import { getAllGlobalPlants } from "../../services/globalPlantService";
import "./Plant.css"
import { getCustomPlantsForUser } from "../../services/customPlantService";
import { getAllLightRequirements } from "../../services/lightService";
import { getAllPlantingSeasons } from "../../services/plantingSeasonService";
import { getStashbyUserId } from "../../services/stashService";

export const PlantList = ( { currentUser } ) => {
    const [allPlants, setAllPlants] = useState([])
    const [customPlants, setCustomPlants] = useState([])
    const [lightReqs, setLightReqs] = useState([]);
    const [allPlantingSeasons, setAllPlantingSeasons] = useState([]);
    const [stashItems, setStashItems] = useState([]);



    //Plant Library fetch and set
  const getAndSetPlants = () => {
    getAllGlobalPlants().then((plantsArray) => {
    setAllPlants(plantsArray)
    console.log("Plants set")
      })
  }


    //Custom Plant Library fetch and set
  const getAndSetCustomPlants = () => {
      //get custom plants function
      getCustomPlantsForUser(currentUser.id).then((customPlantsArray) => {
      //set custom plants state
      setCustomPlants(customPlantsArray)
    })
  }

  //Initial data load
  useEffect(() => {
    getAndSetPlants()
    getAllLightRequirements().then(setLightReqs);
    getAllPlantingSeasons().then(setAllPlantingSeasons);
     }, [])

  //Load custom plants when currentUser is available
  useEffect(() => {
      getAndSetCustomPlants()
  }, [])

  


const refreshStash = () => {
  getStashbyUserId(currentUser.id).then(setStashItems);
};

useEffect(() => {
  if (currentUser?.id) {
    refreshStash();
  }
}, [currentUser?.id]);


const plantIdsInStash = new Set(stashItems.map((s) => s.plantId));




return (
  <div className="plants-container"> 
    <h2>Plant Library</h2>

    
    
    <article className="plants">
      {allPlants.map(plantObj => {
        return <PlantCard 
                  plant={plantObj} 
                  lightRequirements={lightReqs} 
                  plantingSeasons={allPlantingSeasons} 
                  key= {plantObj.id} 
                  currentUser={currentUser}
                  isInStash={plantIdsInStash.has(plantObj.id)}
                  refreshStash={refreshStash}/>
      })}
    </article>

    <h2>My Custom Plants</h2>
      <article className="plants"></article>
        {customPlants.map(customPlantObj => {
            return <PlantCard 
                      plant={customPlantObj} 
                      lightRequirements={lightReqs} 
                      plantingSeasons={allPlantingSeasons} 
                      key= {customPlantObj.id}
                      currentUser={currentUser}
                      />
        })}
    </div>

  )
}