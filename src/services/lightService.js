export const getAllLightRequirements = () => {
  return fetch("http://localhost:3001/light_requirements")
    .then(res => res.json());
}