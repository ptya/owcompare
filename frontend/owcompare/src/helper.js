import counters from './data/counters';

export const getRandomPoints = () => {
  const points = { ...counters };
  Object.entries(counters).forEach(([key, value]) => {
    Object.entries(value).forEach(([k, v]) => {
      const num = Math.floor((Math.random() * 100) + 1);
      points[key][k] = num;
    });
  });
  return points;
};

export const capitalize = (str) => (
  str.charAt(0).toUpperCase() + str.substr(1)
)