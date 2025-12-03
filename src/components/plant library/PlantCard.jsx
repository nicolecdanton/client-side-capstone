
import { addToStash} from "../../services/stashService"
import "./Plant.css";

export const PlantCard = ({ plant, lightRequirements, plantingSeasons, currentUser, isInStash, refreshStash }) => {

  const lightType = lightRequirements.find(
    (light) => light.id === plant.light_requirement_id
  )?.type

  const plantingSeasonNames = plantingSeasons.find(
    (season) => season.id === plant.planting_season_id
  )?.type


  const handleAddToStash = () => {
      if (isInStash) return; 
      const stashItem = {
        userId: currentUser.id,  // snake_case to match your db.json
        plantId: plant.id
      }

     addToStash(stashItem).then(() => {
      if (refreshStash) refreshStash();
      })
  }

  return (
    <section className="plant-card">
      <header className="plant-card-info">{plant.plant_type_name}</header>
      <div>Variertal: {plant.varietal_name}</div>
      <div>Light: {lightType || "Unknown"}</div>
      <div>Planting Season: {plantingSeasonNames || "Unknown"}</div>

      {isInStash ? (
        <div className="in-stash-pill">In Stash</div>) : (
        <button className="add-to-stash-btn" onClick={handleAddToStash}>
          Add to Stash
        </button>
      )}
    </section>
  );
}