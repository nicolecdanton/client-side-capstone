export const getCustomPlantsForUser = (userId) => {
  return fetch(`http://localhost:3001/plants?user_owner_id=${userId}`)
    .then(res => res.json());
};


export const addCustomPlant = (plant) => {
  return fetch("http://localhost:3001/plants", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plant),
  }).then((res) => res.json());
};


export const updateCustomPlant = (plantId, plant) => {
  return fetch(`http://localhost:3001/plants/${plantId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plant),
  }).then((res) => res.json());
};


export const removeCustomPlant = (plantId) => {
  return fetch(`http://localhost:3001/plants/${plantId}`, {
    method: "DELETE",
  });
};