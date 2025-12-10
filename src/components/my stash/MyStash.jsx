import { StashItem } from "./StashItem";
import { useEffect, useState } from "react";
import { getStashbyUserId } from "../../services/stashService";
import "./Stash.css"
import { AddToStashForm } from "./AddToStashForm";

export const MyStash = ({ currentUser }) => {
    const [stashItems, setStashItems] = useState([]);

    //a function that will support refreshing the stash. We'll need this when things are added, deleted, or updated (though Add action on Plant Library page, through delete button on StashItem card, or through custom plan form). We'll need to pass it as a prop to those components.
    const refreshTheStash = () => {
        getStashbyUserId(currentUser.id).then((data) => setStashItems(data));
    };

    //reload the stash IF the current user changes
    useEffect(() => {
        refreshTheStash();
        }, [currentUser.id]);

    return (
        <div>
            <h2>My Stash</h2>
            <p>This is where your stash items will be displayed.</p>
                <div className="stash-list">
                {stashItems.map((item) => (
                    <StashItem key={item.id} stashItem={item} //refreshTheStash function passed as prop
                    refreshTheStash={refreshTheStash} />
                ))}
                </div>
                <div>
                     <AddToStashForm refreshTheStash= //refreshTheStash function passed as prop
                     {refreshTheStash} currentUser={currentUser}/>
                </div>
        </div>
    )
}