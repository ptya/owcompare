import counters from './data/counters';

export const getRandomPoints = () => {
  const points = { ...counters };
  Object.entries(counters).forEach(([key, value]) => {
    Object.entries(value).forEach(([k, v]) => {
      const num = Math.floor((Math.random() * 100) + 1);
      points[key][k] = num;
    });
  });
  console.log(points);
  return points;
};