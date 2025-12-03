import { StashItem } from "./StashItem";
import { useEffect, useState } from "react";
import { getStashbyUserId } from "../../services/stashService";
import "./Stash.css"
import { AddToStashForm } from "./AddToStashForm";

export const MyStash = ({ currentUser }) => {
    const [stashItems, setStashItems] = useState([]);

    const refreshTheStash = () => {
        getStashbyUserId(currentUser.id).then((data) => setStashItems(data));
    };

    useEffect(() => {
        refreshTheStash();
        }, [currentUser.id]);

    return (
        <div>
            <h2>My Stash</h2>
            <p>This is where your stash items will be displayed.</p>
                <div className="stash-list">
                {stashItems.map((item) => (
                    <StashItem key={item.id} stashItem={item} refreshTheStash={refreshTheStash} />
                ))}
                </div>
                <div>
                     <AddToStashForm refreshTheStash={refreshTheStash} currentUser={currentUser}/>
                </div>
        </div>
    )
}