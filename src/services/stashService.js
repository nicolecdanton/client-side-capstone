export const getStashbyUserId = (userId) => {
    return fetch(`http://localhost:3001/seed_stash?_expand=plant&userId=${userId}`)
    .then((res) => res.json())
}


export const addToStash = (stashItem) => {
    return fetch("http://localhost:3001/seed_stash", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(stashItem),
    }).then((res) => res.json())
}


export const removeFromStash = (stashItemId) => {
    return fetch(`http://localhost:3001/seed_stash/${stashItemId}`, {
        method: "DELETE",
    })
}

