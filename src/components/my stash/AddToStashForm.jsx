import { useEffect, useState } from "react";
import { getAllLightRequirements } from "../../services/lightService";
import { getAllPlantingSeasons } from "../../services/plantingSeasonService";
import { addCustomPlant, updateCustomPlant } from "../../services/customPlantService";
import { addPlantToStash } from "../../services/stashService";
import "./Stash.css";

const COLOR_OPTIONS = [
  "#FF4B4B", // bright red
  "#FF8A80", // soft coral
  "#FFA726", // orange
  "#FDD835", // yellow
  "#81C784", // light green
  "#2E7D32", // deep green
  "#26C6DA", // teal
  "#5C6BC0", // indigo
  "#AB47BC", // purple
  "#EC407A"  // pink
];

export const AddToStashForm = ({ currentUser, refreshTheStash, existingPlant, onClose }) => {
  const isEditMode = !!existingPlant;

  // form state stuff - initialize with existing plant data if in edit mode, or empty if adding totally new
  const [plantTypeName, setPlantTypeName] = useState(existingPlant?.plant_type_name || "");
  const [varietalName, setVarietalName] = useState(existingPlant?.varietal_name || "");
  const [lightRequirementId, setLightRequirementId] = useState(existingPlant?.light_requirement_id?.toString() || "");
  const [plantingSeasonId, setPlantingSeasonId] = useState(existingPlant?.planting_season_id?.toString() || "");
  const [color, setColor] = useState(existingPlant?.color || COLOR_OPTIONS[0]);

  const [lightRequirements, setLightRequirements] = useState([]);
  const [plantingSeasons, setPlantingSeasons] = useState([]);


  // Load dropdown options
  useEffect(() => {
    getAllLightRequirements().then(setLightRequirements);
    getAllPlantingSeasons().then(setPlantingSeasons);
  }, []);


  
  //  Create a custom plant, owned by this user
  const createPlantForCurrentUser = () => {
        const newPlant = {
            user_owner_id: currentUser.id,
            plant_type_name: plantTypeName,
            varietal_name: varietalName,
            light_requirement_id: parseInt(lightRequirementId),
            planting_season_id: parseInt(plantingSeasonId),
            color: color
        };

         return addCustomPlant(newPlant); 
  };

  
  //  Add created plant to users stash
  const addPlantToStashForCurrentUser = (plantId) => {
    const stashItem = {
      userId: currentUser.id,
      plantId: plantId
    };

    return addPlantToStash(stashItem);
  };

  
  //  Reset form (to be used on click of submitting form)
  const resetForm = () => {
    setPlantTypeName("");
    setVarietalName("");
    setLightRequirementId("");
    setPlantingSeasonId("");
    setColor(COLOR_OPTIONS[0]);
  };


  //  When i submit the form, stuff has to happen: either create new plant and add to stash, or update existing plant. 
  const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditMode) {
            // Update existing plant
            const updatedPlant = {
                user_owner_id: currentUser.id,
                plant_type_name: plantTypeName,
                varietal_name: varietalName,
                light_requirement_id: parseInt(lightRequirementId),
                planting_season_id: parseInt(plantingSeasonId),
                color: color
            };

            updateCustomPlant(existingPlant.id, updatedPlant)
                .then(() => {
                    refreshTheStash()
                    if (onClose) onClose()
                })
        } else {
            // Create new plant and add to stash
            createPlantForCurrentUser()
                .then((createdPlant) => {
                return addPlantToStashForCurrentUser(createdPlant.id);
                })
                .then(() => {
                resetForm()
                refreshTheStash()
                })
        }
        }


  return (
    <form className="stash-form" onSubmit={handleSubmit}>
      <h3>{isEditMode ? "Edit Plant" : "Add Custom Plant to Stash"}</h3>

      <label>
        Plant Name
        <input
          type="text"
          value={plantTypeName}
          onChange={(e) => setPlantTypeName(e.target.value)}
          required
        />
      </label>

      <label>
        Varietal Name
        <input
          type="text"
          value={varietalName}
          onChange={(e) => setVarietalName(e.target.value)}
          required
        />
      </label>

      <label>
        Light Requirement
        <select
          value={lightRequirementId}
          onChange={(e) => setLightRequirementId(e.target.value)}
          required
        >
          <option value="">Select...</option>
          {lightRequirements.map((lr) => (
            <option key={lr.id} value={lr.id}>
              {lr.type}
            </option>
          ))}
        </select>
      </label>

      <label>
        Planting Season
        <select
          value={plantingSeasonId}
          onChange={(e) => setPlantingSeasonId(e.target.value)}
          required
        >
          <option value="">Select...</option>
          {plantingSeasons.map((ps) => (
            <option key={ps.id} value={ps.id}>
              {ps.type}
            </option>
          ))}
        </select>
      </label>

      <div className="color-picker-label">Color</div>
      <div className="color-grid">
        {COLOR_OPTIONS.map((c) => (
          <button
            key={c}
            type="button"
            className={`color-swatch ${color === c ? "selected" : ""}`}
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>

      <button type="submit" className="stash-submit-btn">
        {isEditMode ? "Update Plant" : "Add to Stash"}
      </button>
    </form>
  )
}
