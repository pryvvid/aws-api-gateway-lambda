import { gameDB } from '../db/gameDB';

export const getProductsList = async () => {
  if (!gameDB) return {
    statusCode: 404,
    body: JSON.stringify({message: "Games not found"})
  }

  const data = await gameDB;

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
