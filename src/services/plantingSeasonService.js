export const getAllPlantingSeasons = () => {
  return fetch(`http://localhost:3001/planting_seasons`)
    .then(res => res.json());
};