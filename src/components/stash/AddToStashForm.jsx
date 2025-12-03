import { useEffect, useState } from "react";
import { getAllLightRequirements } from "../../services/lightService";
import { getAllPlantingSeasons } from "../../services/plantingSeasonService";
import { addCustomPlant } from "../../services/customPlantService";
import { addToStash } from "../../services/stashService";
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

export const AddToStashForm = ({ currentUser, refreshTheStash }) => {
  // form state
  const [plantTypeName, setPlantTypeName] = useState("");
  const [varietalName, setVarietalName] = useState("");
  const [lightRequirementId, setLightRequirementId] = useState("");
  const [plantingSeasonId, setPlantingSeasonId] = useState("");
  const [color, setColor] = useState(COLOR_OPTIONS[0]);

  const [lightRequirements, setLightRequirements] = useState([]);
  const [plantingSeasons, setPlantingSeasons] = useState([]);


  // Load dropdown options
  useEffect(() => {
    getAllLightRequirements().then(setLightRequirements);
    getAllPlantingSeasons().then(setPlantingSeasons);
  }, []);


  
  //  Create a plant for this user
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

  
  //  Add created plant to seed stash
  const addPlantToStashForCurrentUser = (plantId) => {
    const stashItem = {
      userId: currentUser.id,
      plantId: plantId
    };

    return addToStash(stashItem);
  };

  
  //  Reset form
  const resetForm = () => {
    setPlantTypeName("");
    setVarietalName("");
    setLightRequirementId("");
    setPlantingSeasonId("");
    setColor(COLOR_OPTIONS[0]);
  };


  //  MAIN SUBMIT HANDLER
  const handleSubmit = async (e) => {
        e.preventDefault();

        createPlantForCurrentUser()
            .then((createdPlant) => {
            return addPlantToStashForCurrentUser(createdPlant.id);
            })
            .then(() => {
            resetForm();
            refreshTheStash();
            });
        };


  return (
    <form className="stash-form" onSubmit={handleSubmit}>
      <h3>Add Custom Plant to Stash</h3>

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
        Add to Stash
      </button>
    </form>
  );
};
