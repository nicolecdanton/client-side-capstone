import "./Plant.css"

export const PlantCard = ({ plant, lightRequirements, plantingSeasons}) => {
   const lightType = lightRequirements.find((light) => 
    light.id === plant.light_requirement_id)?.type;

   const plantingSeasonNames = plantingSeasons.find((season) =>
    season.id === plant.planting_season_id)?.type;


  return (
            <section className="plant-card">
            <header className="plant-card-info">{plant.plant_type_name}</header>
                <div>Variertal: {plant.varietal_name}</div>
                <div>Light: {lightType || "Unknown"}</div>
                <div>Planting Season: {plantingSeasonNames || "Unknown"}</div>
          </section>
        )
}