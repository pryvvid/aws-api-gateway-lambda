import { gameDB } from '../db/gameDB';

export const getProductsById = async (event) => {
  const { id } = event.pathParameters;
  if (!id) return {
    statusCode: 400,
    body: JSON.stringify({message: "Bad request"}),
  }
  
  const gameToFind = gameDB.find((game) => game.id === parseInt(id, 10));

  if (gameToFind === undefined) return {
    statusCode: 404,
    body: JSON.stringify({message: "Game not found"}),
  }

  return {
    statusCode: 200,
    body: JSON.stringify(gameToFind),
  };
};
