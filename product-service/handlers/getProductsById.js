import { gameDB } from '../db/gameDB';

export const getProductsById = async (event) => {
  const { id } = event.pathParameters;
  const gameToFind = gameDB.find((game) => game.id === parseInt(id, 10));

  if (gameToFind === undefined) return {
    statusCode: 404,
    body: JSON.stringify({message: "Game is not found"}),
  }

  return {
    statusCode: 200,
    body: JSON.stringify(gameToFind),
  };
};
