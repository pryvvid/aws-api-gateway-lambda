import { Client } from 'pg';
import { dbOptions } from '../db/dbOptions';

export const getProductsById = async (event) => {
  console.log(event);
  const { id } = event.pathParameters;
  console.log(id);
  if (!id) return {
    statusCode: 400,
    body: JSON.stringify({ message: "Bad request" }),
  }

  let client;
  
  try {
    client = new Client(dbOptions);
    await client.connect();
    const { rows: product } = await client.query(
      'select p.*, s.count from products p left join stocks s on p.id = s.product_id where p.id=$1', [id]
    );

    console.log(product);

    if (!product) return {
      statusCode: 404,
      body: JSON.stringify({ message: "Game not found" })
    }

    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  } finally {
    if (client) client.end();
  }
};
