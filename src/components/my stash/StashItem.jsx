import { removeFromStash } from "../../services/stashService"
import "./Stash.css"
import { removeCustomPlant } from "../../services/customPlantService"

export const StashItem = ({ stashItem, refreshTheStash }) => {
    
    const handleDelete = () => {
            removeFromStash(stashItem.id).then(() => {
            refreshTheStash()})
            if (stashItem.plant.user_owner_id)
                removeCustomPlant(stashItem.plant.id).then(() => {
                refreshTheStash()});
    };

    return (
        <div className="stash-pill"
                style={{
                    background: stashItem.plant.color || 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)'
                }}>
            <h2 className="stash-header">{stashItem.plant.plant_type_name} </h2>
             <p className="stash-subheader">{stashItem.plant.varietal_name}</p>
              <button className="delete-stash-btn" onClick={handleDelete}> ✕</button>
        </div>
    )
}