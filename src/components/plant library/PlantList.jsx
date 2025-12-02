import { useState, useEffect } from "react"
import { PlantCard } from "./PlantCard";
import { getAllGlobalPlants } from "../../services/globalPlantService";
import "./Plant.css"
import { getCustomPlantsForUser } from "../../services/customPlantService";
import { getAllLightRequirements } from "../../services/lightService";
import { getAllPlantingSeasons } from "../../services/plantingSeasonService";

export const PlantList = () => {
    const [allPlants, setAllPlants] = useState([])
    const [customPlants, setCustomPlants] = useState([])
    const [lightReqs, setLightReqs] = useState([]);
    const [allPlantingSeasons, setAllPlantingSeasons] = useState([]);


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
    getCustomPlantsForUser(1).then((customPlantsArray) => {
      //set custom plants state
      setCustomPlants(customPlantsArray)
    })
  }

  //Initial data load
  useEffect(() => {
    getAndSetPlants()
    getAndSetCustomPlants()
    getAllLightRequirements().then(setLightReqs);
    getAllPlantingSeasons().then(setAllPlantingSeasons);
     }, [])

  


  return (
  <div className="plants-container"> 
    <h2>Plant Library</h2>

    
    
    <article className="plants">
      {allPlants.map(plantObj => {
        return <PlantCard plant={plantObj} lightRequirements={lightReqs} plantingSeasons={allPlantingSeasons} key= {plantObj.id}/>
      })}
    </article>

    <h2>My Custom Plants</h2>
      <article className="plants"></article>
        {customPlants.map(customPlantObj => {
            return <PlantCard plant={customPlantObj} lightRequirements={lightReqs} plantingSeasons={allPlantingSeasons} key= {customPlantObj.id}/>
        })}
    </div>

  )
}