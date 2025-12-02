export const getAllGlobalPlants = () => {
  return fetch("http://localhost:3001/plants")
    .then((res) => res.json())
    .then((plants) =>
      plants.filter(
        (plant) =>
          plant.user_owner_id === null
      )
    );
};