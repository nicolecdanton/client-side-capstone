
import { addPlantToStash } from "../../services/stashService"
import "./Plant.css"

export const PlantCard = ({ plant, lightRequirements, plantingSeasons, currentUser, isInStash, refreshStash }) => {

  const lightType = lightRequirements.find(
    (light) => light.id === plant.light_requirement_id
  )?.type

  const plantingSeasonNames = plantingSeasons.find(
    (season) => season.id === plant.planting_season_id
  )?.type

  //When the Add to Stash button is clicked on a Plant, we need to ensure it gets added to database and the stash refreshes
  const handleAddToStash = () => {
      if (isInStash) return; 
      const stashItem = {
        userId: currentUser.id, 
        plantId: plant.id
      }

     addPlantToStash(stashItem).then(() => {
      refreshStash()
      })
  }

  return (
    <section
      className="plant-card"
      style={{ '--plant-color': plant.color || '#2d6a4f' }}
    >
      <header className="plant-card-info">{plant.plant_type_name}</header>
      <div>Varietal: {plant.varietal_name}</div>
      <div>Light: {lightType || "Unknown"}</div>
      <div>Planting Season: {plantingSeasonNames || "Unknown"}</div>

      {isInStash ? (
        <div className="in-stash-pill">In Stash</div>) : (
        <button className="add-to-stash-btn" onClick={handleAddToStash}>
          Add to Stash
        </button>
      )}
    </section>
  )
}