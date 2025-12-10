import { useState } from "react"
import "./Plant.css"
import { CustomPlantEditModal } from "./CustomPlantEditModal"
import { AddToStashForm } from "../my stash/AddToStashForm"

export const CustomPlantCard = ({ plant, lightRequirements, plantingSeasons, currentUser, refreshTheStash }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const lightType = lightRequirements.find(
    (light) => light.id === plant.light_requirement_id
  )?.type

  const plantingSeasonNames = plantingSeasons.find(
    (season) => season.id === plant.planting_season_id
  )?.type

  const handleEditClick = () => {
    setIsEditModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsEditModalOpen(false)
  }

  return (
    <>
      <section
        className="plant-card"
        style={{ '--plant-color': plant.color || '#2d6a4f' }}
      >
        <header className="plant-card-info">{plant.plant_type_name}</header>
        <div>Varietal: {plant.varietal_name}</div>
        <div>Light: {lightType || "Unknown"}</div>
        <div>Planting Season: {plantingSeasonNames || "Unknown"}</div>

        <div className="in-stash-pill">In Stash</div>

        <button className="edit-button" onClick={handleEditClick}>
          Edit
        </button>
      </section>

      <CustomPlantEditModal isOpen={isEditModalOpen} onClose={handleCloseModal}>
        <AddToStashForm
          currentUser={currentUser}
          refreshTheStash={refreshTheStash}
          existingPlant={plant}
          onClose={handleCloseModal}
        />
      </CustomPlantEditModal>
    </>
  )
}