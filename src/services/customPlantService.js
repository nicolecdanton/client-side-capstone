export const getCustomPlantsForUser = (userId) => {
  return fetch(`http://localhost:3001/plants?user_owner_id=${userId}`)
    .then(res => res.json());
};
