import { Client } from "pg";
import { dbOptions } from "../db/dbOptions";

export const getProductsList = async (event) => {
  console.log(event);

  let client;

  try {
    client = new Client(dbOptions);
    await client.connect();
    const { rows: products } = await client.query(
      "select p.*, s.count from products p left join stocks s on p.id = s.product_id"
    );

    console.log(products);

    if (products.length === 0)
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Games not found" }),
      };

    return {
      statusCode: 200,
      body: JSON.stringify(products),
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
